import { LitElement, css, html } from "../../vendor/lit-core.min.js";

//import PageElement from "../lib/page_element.js";

export default class Playlists extends LitElement {
  get title() {
    return "Playlists";
  }
  set_route(r) {
    console.log("++ set route", r);
  }
  editor_create() {
    console.log("create");
  }
  render() {
    return html`<mo-playlist-editor create></mo-playlist-editor>
      <mo-playlists grid></mo-playlists>`;
  }
}

window.customElements.define("playlists-page", Playlists);
