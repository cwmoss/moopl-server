/*

{"file":"http://streams.fluxfm.de/studio56/mp3-320/audio/",
    "title":"Big Thief - Shark Smile","name":"FluxFM - Livestream","pos":34,"id":35}

{ file: "Amazon MP3/Friendly Fires/Friendly Fires/11 - Kiss Of Life.mp3", "last-modified": "2011-10-11T10:02:46Z", format: "44100:24:2", … }
album: "Friendly Fires"
albumartist: "Friendly Fires"
artist: "Friendly Fires"
composer: "Edward Macfarlane"
date: 2009
disc: 1
duration: 250.383
file: "Amazon MP3/Friendly Fires/Friendly Fires/11 - Kiss Of Life.mp3"
format: "44100:24:2"
genre: "Alternative Rock"
id: 1
"last-modified": "2011-10-11T10:02:46Z"
pos: 0
time: 250
title: "Kiss Of Life"
track: 11
*/

class playlist_item {
  data;

  static from_api(rec) {
    let t = new playlist_item();
    t.data = rec;
    return t;
  }

  get is_radio() {
    return this.file.includes("://");
  }
  get file() {
    return this.data.file;
  }
  get id() {
    return this.data.id;
  }
  get pos() {
    return this.data.pos;
  }
  get artwork_file() {
    return this.data[12] ? this.data[12] : "";
  }
  get title() {
    return this.data.title;
    let title = this.data[1];
    if (!title || title == "Unknown Title") {
      // console.log("trim title", title, el["file"]);
      title = this.file.split("\\").pop().split("/").pop();
      title = title.substring(0, title.lastIndexOf(".")) || title;
    }
    return title;
  }
  get artist() {
    if (this.is_radio) return this.data.name;
    let artist = this.data.artist;
    // if (!artist.length) artist = this.data[3];
    // else artist = artist.join(", ");
    if (!artist) artist = this.data.albumartist;
    return artist;
  }
}

export default playlist_item;
