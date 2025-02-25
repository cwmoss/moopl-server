import { setup } from "./composed-offset-position.js";

let loaded = false;

let load_dependencies = () => {
  loaded = true;
  add_script("floating-ui.core.js");
  add_script("floating-ui.dom.js");
  add_script("floating-ui.utils.dom.js", setup);
};

let add_script = (src, onload) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = false;
  if (onload) script.onload = onload;
  script.src = import.meta.url + "/../" + src;
  document.head.appendChild(script);
};

console.log(import.meta);
if (!loaded && !window.FloatingUIDOM) load_dependencies();

export default loaded;
