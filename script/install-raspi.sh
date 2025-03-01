#!/bin/bash

# download and run this script
# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/cwmoss/moopl-server/HEAD/script/install-raspi.sh)"

INSTALL_PATH=/var/moopl
BIN_INSTALL_PREFIX=/usr/local

REPO=https://github.com/cwmoss/moopl-server/archive/main.zip
FRANKEN_BIN=https://github.com/cwmoss/moopl-server/releases/download/v20250211/franken.zip

abort() {
  printf "%s\n" "$@" >&2
  exit 1
}

# Fail fast with a concise message when not using bash
# Single brackets are needed here for POSIX compatibility
# shellcheck disable=SC2292
if [ -z "${BASH_VERSION:-}" ]
then
  abort "Bash is required to interpret this script."
fi

# Check if script is run with force-interactive mode in CI
if [[ -n "${CI-}" && -n "${INTERACTIVE-}" ]]
then
  abort "Cannot run force-interactive mode in CI."
fi

# Check if both `INTERACTIVE` and `NONINTERACTIVE` are set
# Always use single-quoted strings with `exp` expressions
# shellcheck disable=SC2016
if [[ -n "${INTERACTIVE-}" && -n "${NONINTERACTIVE-}" ]]
then
  abort 'Both `$INTERACTIVE` and `$NONINTERACTIVE` are set. Please unset at least one variable and try again.'
fi

# Check if script is run in POSIX mode
if [[ -n "${POSIXLY_CORRECT+1}" ]]
then
  abort 'Bash must not run in POSIX mode. Please unset POSIXLY_CORRECT and try again.'
fi

# string formatters
if [[ -t 1 ]]
then
  tty_escape() { printf "\033[%sm" "$1"; }
else
  tty_escape() { :; }
fi
tty_mkbold() { tty_escape "1;$1"; }
tty_underline="$(tty_escape "4;39")"
tty_blue="$(tty_mkbold 34)"
tty_red="$(tty_mkbold 31)"
tty_bold="$(tty_mkbold 39)"
tty_reset="$(tty_escape 0)"

shell_join() {
  local arg
  printf "%s" "$1"
  shift
  for arg in "$@"
  do
    printf " "
    printf "%s" "${arg// /\ }"
  done
}

chomp() {
  printf "%s" "${1/"$'\n'"/}"
}

ohai() {
  printf "${tty_blue}==>${tty_bold} %s${tty_reset}\n" "$(shell_join "$@")"
}

warn() {
  printf "${tty_red}Warning${tty_reset}: %s\n" "$(chomp "$1")" >&2
}

execute() {
  if ! "$@"
  then
    abort "$(printf "Failed during: %s" "$(shell_join "$@")")"
  fi
}
unset HAVE_SUDO_ACCESS # unset this from the environment

have_sudo_access() {
  if [[ ! -x "/usr/bin/sudo" ]]
  then
    return 1
  fi

  local -a SUDO=("/usr/bin/sudo")
  if [[ -n "${SUDO_ASKPASS-}" ]]
  then
    SUDO+=("-A")
  elif [[ -n "${NONINTERACTIVE-}" ]]
  then
    SUDO+=("-n")
  fi

  if [[ -z "${HAVE_SUDO_ACCESS-}" ]]
  then
    if [[ -n "${NONINTERACTIVE-}" ]]
    then
      "${SUDO[@]}" -l mkdir &>/dev/null
    else
      "${SUDO[@]}" -v && "${SUDO[@]}" -l mkdir &>/dev/null
    fi
    HAVE_SUDO_ACCESS="$?"
  fi

  if [[ -n "${HOMEBREW_ON_MACOS-}" ]] && [[ "${HAVE_SUDO_ACCESS}" -ne 0 ]]
  then
    abort "Need sudo access on macOS (e.g. the user ${USER} needs to be an Administrator)!"
  fi

  return "${HAVE_SUDO_ACCESS}"
}


execute_sudo() {
  local -a args=("$@")
  if [[ "${EUID:-${UID}}" != "0" ]] && have_sudo_access
  then
    if [[ -n "${SUDO_ASKPASS-}" ]]
    then
      args=("-A" "${args[@]}")
    fi
    ohai "/usr/bin/sudo" "${args[@]}"
    execute "/usr/bin/sudo" "${args[@]}"
  else
    ohai "${args[@]}"
    execute "${args[@]}"
  fi
}
getc() {
  local save_state
  save_state="$(/bin/stty -g)"
  /bin/stty raw -echo
  IFS='' read -r -n 1 -d '' "$@"
  /bin/stty "${save_state}"
}
wait_for_user() {
  local c
  echo
  echo "Press ${tty_bold}RETURN${tty_reset}/${tty_bold}ENTER${tty_reset} to continue or any other key to abort:"
  getc c
  # we test for \r and \n because some stuff does \r instead
  if ! [[ "${c}" == $'\r' || "${c}" == $'\n' ]]
  then
    exit 1
  fi
}

is_command () {
  command -v "$1" >/dev/null 2>&1;
}

http_get() {
  url=$1

  if is_command curl; then
    cmd='curl --fail -sSL'
  elif is_command wget; then
    cmd='wget -qO -'
  else
    print_error "unable to find wget or curl. please install and try again."
    exit 1
  fi

  $cmd "$url"
}

http_download() {
  dest=$1
  srcURL=$2

  if is_command curl; then
    cmd='curl -L --progress-bar'
    destflag='-o'
  elif is_command wget; then
    cmd='wget -q --show-progress'
    destflag='-O'
  else
    print_error "unable to find wget or curl. please install and try again."
    exit 1
  fi

  $cmd $destflag "$dest" "$srcURL"
}

ohai "This script will install moopl in $INSTALL_PATH"
echo "it will install dependencies: libvips libvips-dev libzip-dev libonig-dev libnss3-tools composer"
echo "it will download frankenphp and install it in $BIN_INSTALL_PREFIX"
wait_for_user

execute_sudo "apt" "install" "libvips" "libvips-dev" "libonig-dev" "composer" "libnss3-tools" "libzip-dev"

ohai "Download $REPO and extract to $INSTALL_PATH"
(
    http_download main.zip $REPO
    execute_sudo "mkdir" $INSTALL_PATH
    execute_sudo "chown" "$USER:" $INSTALL_PATH
    execute "unzip" "main.zip"
    execute "rsync" "-avz" "--delete" "--exclude='var/'" "moopl-server-main/" "$INSTALL_PATH/"
) || exit 1

ohai "Download frankenphp and extract to $BIN_INSTALL_PREFIX"
(
    http_download franken.zip $FRANKEN_BIN
    execute "unzip" "franken.zip"
    execute_sudo "cp" "-r" release/local/bin/* "$BIN_INSTALL_PREFIX/bin/"
    execute_sudo "cp" "-r" release/local/lib/* "$BIN_INSTALL_PREFIX/lib/"
    execute_sudo "cp" "-r" release/local/etc/* "$BIN_INSTALL_PREFIX/etc/"
    execute_sudo "cp" "$BIN_INSTALL_PREFIX/etc/php.ini-production" "$BIN_INSTALL_PREFIX/etc/php.ini"
    execute_sudo "ldconfig"
    execute_sudo "setcap" "cap_net_bind_service=+ep" "$(which frankenphp)"
) || exit 1

ohai "Adding service unit file to /etc/systemd/system/caddy.service"
(
    execute_sudo "cp" "raspi/caddy.service" "/etc/systemd/system/"
) || exit 1


ohai "Cleanup"
(
  execute "rm" "main.zip"
  execute "rm" "franken.zip"
  execute "rm" "-rf" "release"
  execute "rm" "-rf" "moopl-server-main"
) || exit 1

echo "You can now change into $INSTALL_PATH and setup/ run the server:"
echo " cd $INSTALL_PATH"
echo " make raspi-setup"
echo " make switch-to-app"

ohai "Have fun!"

# TODO
# decide on user
# sudo cp raspi/caddy.service /etc/systemd/system/
# sudo systemctl daemon-reload