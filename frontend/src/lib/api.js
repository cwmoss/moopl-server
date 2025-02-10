import datasets from "./datasets.js";
import schema from "./schema.js";
import track from "./track.js";
import radio from "./radio.js";
import { toast_alert } from "../basic/toast.js";
/*

GET /command/music-library.php?cmd=load_library&_=123 HTTP/1.1
GET /command/music-library.php?cmd=load_library HTTP/1.1
*/
console.log("++ api", import.meta);

class Api {
  loading = false;

  constructor() {
    // this.endpoint = `http://localhost:3636/api`;
    this.endpoint = `//localhost/api`;
    this.datasets = [];
    // this.documentStore = useDocumentStore();
  }

  realtime_url(topic) {
    const url = new URL("https://localhost/.well-known/mercure");
    url.searchParams.append("topic", topic);
    return url;
  }

  artwork_radio(name) {
    return this.asset_url("/image/radio", { name: name });
  }

  artwork(name, file) {
    return this.asset_url("/image/artwork", { name: name, hash: file });
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
    let res = await this.get(`/status`);
    return res;
  }

  async play_now(file) {
    console.log("playnow", file);
    let res = await this.post(`/player/play_now`, { file: file });
    return res;
  }

  // /command/music-library.php?cmd=load_library&_=123
  async load_library() {
    let res = await this.get(`/tracks`);
    return res.map((e) => track.from_api(e));
  }
  async load_radios() {
    let res = await this.get(`/radios`);
    // console.log("api:radios", res);
    res = res.map((e) => radio.from_api(e));
    // console.log("api:radios2", res);
    return res;
  }
  async load_queue() {
    let res = await this.get(`/queue`);
    return res.map((e) => track.from_api(e));
  }
  async volume(vol) {
    return await this.post(`/player/volume`, { volume: vol });
  }
  async seek(pos) {
    return await this.post(`/player/seek`, { position: pos });
  }
  async play() {
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

  // ref can be a reference or asset or ID
  imageurl_from_ref(ref, opts = {}) {
    console.log("$ api-imageurl", ref);
    if (!ref) return "";
    if (typeof ref === "object") ref = ref?._ref ?? ref._id ?? null;
    console.log("$ api-imageurl ++ parts", ref);
    if (!ref) return "";
    let parts = ref.split("-");
    parts.shift();
    let suffix = parts.pop();
    console.log("$ api-imageurl ++ parts", ref, parts);
    let size = "size=300x300&mode=fit";
    if (opts.preview) {
      size = "size=50x50&mode=fit";
    }
    return `${this.endpoint}/images/${datasets.current}/${parts.join(
      "-"
    )}.${suffix}?${size}`;
  }

  upload_image_url() {
    return `${this.endpoint}/assets/images/${datasets.current}/`;
  }

  async uploadImage(image) {
    return fetch(
      `${this.endpoint}/assets/images/${datasets.current}/?filename=${image.name}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: image,
      }
    ).then((resp) => resp.json());
  }

  async uploadFile(file) {
    return fetch(
      `${this.endpoint}/assets/files/${datasets.current}/?filename=${file.name}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: file,
      }
    ).then((resp) => resp.json());
  }

  async document_preview(documentId) {
    return this.document(documentId, true);
  }
  async document(documentId, preview) {
    return this.get(
      `/data/doc/${datasets.current}/${documentId}${
        preview ? "?preview=1" : ""
      }`
    )
      .then(({ documents }) => (documents ? documents[0] : null))
      .then((doc) => {
        console.log("received DOC", doc);
        return doc;
      }); //this.documentStore.setDocument(doc)
  }

  async checkSlug(slug, type, docid) {
    let query = `_type=="${type}"&&slug.current=="${slug}"`;
    if (docid) {
      query += `&&_id!="${docid}"`;
    }
    let docs = await this.documentQuery(query);
    if (docs.length) return false;
    return true;
  }

  async documents(documentType, options) {
    if (!options) options = {};
    if (!options.order) {
      options.order = {
        by: "_updatedAt",
        desc: true,
      };
    }
    return this.documentQuery(`_type=="${documentType}"`, options);
  }

  async documentQuery(query, options) {
    return this.query(`*(${query})`, options).then(
      (resp) => resp.result
      // resp.result.map((doc) => this.documentStore.document(doc))
    );
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
    return this.get(
      `/data/query/${datasets.current}?query=${encodeURIComponent(query)}`
    );
  }
}

let apiobject = new Api();
await apiobject.login();

export default apiobject;
