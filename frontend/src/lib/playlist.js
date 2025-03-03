class playlist {
  data;

  static from_api(rec) {
    let t = new playlist();
    t.data = rec;
    return t;
  }

  get title() {
    return this.data.playlist;
  }
}

export default playlist;
