import api from "./api.js";
import schema from "./schema.js";
import datasets from "./datasets.js";

class Library {
  name = "";
  loading = false;
  data = [];
  radio_data = [];
  async load() {
    this.loading = true;
    this.data = this.setup_data(await api.load_library());
    this.radio_data = await api.load_radios();
    this.queue_data = await api.load_queue();
    this.loading = false;
  }

  setup_data(data) {
    return data;
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
  station_name(url) {
    let found = this.radio_data.find((el) => el.file == url);
    console.log("station_name", url, found);
    return found.title;
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
