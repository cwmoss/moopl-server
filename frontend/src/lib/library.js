import api from "./api.js";
import schema from "./schema.js";
import datasets from "./datasets.js";
import playlist from "./playlist.js";
import playlist_item from "./playlist_item.js";
import track from "./track.js";
import radio from "./radio.js";

class Library {
  name = "";
  loading = false;
  data = [];
  radio_data = [];
  queue_data = [];
  playlists_data = [];
  current_song = {};

  async load() {
    this.loading = true;
    this.data = (await api.load_library()).map((el) => track.from_api(el));
    this.radio_data = (await api.load_radios()).map((el) => radio.from_api(el));
    this.queue_data = (await api.load_queue()).map((el) =>
      playlist_item.from_api(el)
    );
    this.playlists_data = (await api.load_playlists()).map((el) =>
      playlist.from_api(el)
    );
    this.loading = false;
  }

  async load_status() {
    let data = await api.status();
    this.receive_status_update(data);
  }

  receive_status_update_sse(sse) {
    let data = api.decode_sse_status(sse);
    this.receive_status_update(data);
  }
  receive_status_update(data) {
    if (data.current_song) {
      data.current_song = this.current_song = playlist_item.from_api(
        data.current_song
      );
      this.emit("app.current", this.current_song);
    }
    this.emit("moo.sse", data);
    if (data.queue) {
      this.queue_data = data.queue.map((el) => playlist_item.from_api(el));
      this.emit("app.queue", this.queue_data);
    }
  }
  emit(event, data) {
    const evt = new CustomEvent(event, {
      bubbles: true,
      detail: data,
    });
    document.dispatchEvent(evt);
  }

  search_tracks(term) {
    term = term.toLowerCase();
    return this.data.filter((o) =>
      Object.keys(o).some((k) => {
        let val = typeof o[k] === "string" ? o[k] : o[k].join(" ");
        // console.log("test", val);
        return val.toLowerCase().includes(term);
      })
    );
  }
  tracks() {
    return this.data;
  }
  radios() {
    return this.radio_data;
  }
  playlists() {
    return this.playlists_data;
  }
  station_name(url) {
    let found = this.radio_data.find((el) => el.file == url);
    console.log("station_name", url, found);
    return found?.title || "";
  }
  queue() {
    return this.queue_data;
  }
  schema() {
    return schema;
  }

  datasets() {
    return datasets.datasets;
  }

  get api() {
    return api;
  }
}

export default new Library();
