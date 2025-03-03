class playlist {
  data;

  static from_api(rec) {
    let t = new playlist();
    t.data = rec;
    return t;
  }

  get title() {
    return this.data.name;
  }

  get file() {
    return this.data.name;
  }

  get is_playlist() {
    return true;
  }
  get artwork_file() {
    return this.data?.cover || "-";
  }
}

export default playlist;
