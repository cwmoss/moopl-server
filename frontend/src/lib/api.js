import { toast_alert } from "../basic/toast.js";
/*

GET /command/music-library.php?cmd=load_library&_=123 HTTP/1.1
GET /command/music-library.php?cmd=load_library HTTP/1.1
*/
console.log("++ api", import.meta);

let dev =
  window.location.hostname == "localhost" ||
  window.location.hostname == "127.0.0.1";

class Api {
  loading = false;

  constructor() {
    // this.endpoint = `http://localhost:3636/api`;
    this.endpoint = dev ? `//localhost/api` : `/api`;
    this.images_endpoint = dev ? `//localhost/$images` : `/$images`;
    // this.documentStore = useDocumentStore();
  }

  realtime_url(topic) {
    let u = dev
      ? "https://localhost/.well-known/mercure"
      : "http://" + window.location.host + "/.well-known/mercure";
    const url = new URL(u);
    url.searchParams.append("topic", topic);
    return url;
  }

  artwork_radio(name) {
    return this.asset_url("/image/radio", { name: name });
  }

  // http://hypertrap.fritz.box/$images/tracks/__th__fdc4a7d41d177316e83b1329370aa783dfd76c75.jpg
  artwork(item) {
    if (item.is_radio) {
      return this.artwork_radio(item.title);
    }
    let hash = item.artwork_file;
    if (hash) {
      if (hash == "-") hash = "__default.jpg";
      console.log("$$$ hash", hash);
      return `${this.images_endpoint}/tracks/__th__${hash}.jpg`;
    }
    return this.asset_url("/image/artwork", {
      name: item.file,
      hash: "",
    });
  }

  xxxartwork(name, file) {
    return this.asset_url("/image/artwork", {
      name: name,
      hash: file ? file : "",
    });
  }

  asset_url(path, opts) {
    let params = new URLSearchParams("");
    for (let prop in opts) {
      params.append(prop, opts[prop]);
    }
    return `${this.endpoint}${path}?${params.toString()}`;
  }

  assetUrl(image, opts) {
    let params = new URLSearchParams("");
    for (let prop in opts) {
      params.append(prop, opts[prop]);
    }
    return `${this.endpoint}${image.url}?${params.toString()}`;
  }

  // start server php session (alt)
  async login() {
    await fetch(`${this.endpoint}/`, { credentials: "include" });
  }

  // http://hypertrap.local/engine-mpd.php?state=unknown&_=1736626421306
  async status() {
    let data = await this.get(`/status`);
    return data;
  }

  decode_sse_status(e) {
    let data = JSON.parse(e.data);
    return data;
  }
  async play_now(file) {
    console.log("playnow", file);
    let res = await this.post(`/player/play_now`, { file: file });
    return res;
  }
  async play_id(id) {
    console.log("playnow id from queue", id);
    let res = await this.post(`/player/play_id`, { id });
    return res;
  }
  async delete_from_queue(id) {
    let res = await this.post(`/queue/remove`, { id });
    return res;
  }
  // /command/music-library.php?cmd=load_library&_=123
  async load_library() {
    let res = await this.get(`/tracks`);
    return res;
  }
  async load_radios() {
    let res = await this.get(`/radios`);
    return res;
  }
  async load_queue() {
    let res = await this.get(`/queue`);
    return res;
    // return res.map((e) => playlist_item.from_api(e));
  }
  async volume(vol) {
    return await this.post(`/player/volume`, { volume: vol });
  }
  async seek(pos) {
    return await this.post(`/player/seek`, { position: pos });
  }
  async play(current_status) {
    if (current_status == "stop")
      return await this.post(`/player/start_playing`);
    return await this.post(`/player/play`);
  }
  async pause() {
    return await this.post(`/player/pause`);
  }
  async next() {
    return await this.post(`/player/next`);
  }
  async prev() {
    return await this.post(`/player/prev`);
  }

  async image(id) {
    return this.query(`q(_id=="${id}" && _type="sh.image")`).then(
      (resp) => resp.result[0]
    );
  }

  async file(id) {
    return this.query(`q(_id=="${id}" && _type="sh.file")`).then(
      (resp) => resp.result[0]
    );
  }

  async asset(id) {
    return this.query(
      `q(_id=="${id}" || assetId=="${id}" && _type in ["sh.image", "sh.file"])`
    ).then((resp) => resp.result[0]);
  }

  upload_image_url() {
    return `${this.endpoint}/assets/images/`;
  }

  async uploadImage(image) {
    return fetch(`${this.endpoint}/assets/images/?filename=${image.name}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: image,
    }).then((resp) => resp.json());
  }

  async uploadFile(file) {
    return fetch(`${this.endpoint}/assets/files/?filename=${file.name}`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: file,
    }).then((resp) => resp.json());
  }

  handle_error(e) {
    console.log("$$ e", e.message);
    // alert("fehler");
    toast_alert(e.message);
    return [];
  }

  async get(path) {
    return fetch(`${this.endpoint}${path}`, { credentials: "include" })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        else return data;
      })
      .catch((e) => this.handle_error(e));
  }

  async post(path, data) {
    console.log("POST data", JSON.stringify(data));
    return fetch(`${this.endpoint}${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        else return data;
      })
      .catch((e) => this.handle_error(e));
  }

  async query(query, options) {
    if (options) {
      if (options.limit) {
        if (options.offset) {
          query += `limit(${options.limit} ${options.offset})`;
        } else {
          if (options.page) {
            let offset = (options.page - 1) * options.limit;
            query += `limit(${options.limit} ${offset})`;
          } else {
            query += `limit(${options.limit})`;
          }
        }
      }
      if (options.preview) {
        query += "preview()";
      }
      if (options.count) {
        query += "count()";
      }
      if (options.pageinfo) {
        query += "pageinfo()";
      }
      if (options.order) {
        query += `order(${options.order.by} ${
          options.order.desc ? "desc" : "asc"
        })`;
      }
    }
    return this.get(`/data/query/?query=${encodeURIComponent(query)}`);
  }
}

let apiobject = new Api();
// await apiobject.login();

export default apiobject;
