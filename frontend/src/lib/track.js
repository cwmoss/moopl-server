/*

"file", "title", "artist", "albumartist", 
"album", "track", "disc", "year", 
"genre", "duration", "format", "modified_at"
"artwork_file"
*/

class track {
  data;

  static from_api(rec) {
    let t = new track();
    t.data = rec;
    return t;
  }

  get is_radio() {
    return false;
  }

  get file() {
    return this.data[0] ? this.data[0] : "";
  }
  get artwork_file() {
    return this.data[12] ? this.data[12] : "";
  }
  get title() {
    let title = this.data[1];
    if (!title || title == "Unknown Title") {
      // console.log("trim title", title, el["file"]);
      title = this.file.split("\\").pop().split("/").pop();
      title = title.substring(0, title.lastIndexOf(".")) || title;
    }
    return title;
  }
  get artist() {
    let artist = this.data[2];
    // if (!artist.length) artist = this.data[3];
    // else artist = artist.join(", ");
    if (!artist) artist = this.data[3];
    return artist;
  }
}

export default track;
