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
    return html`<pi-btn @click=${this.editor_create}>+ create</pi-btn>
      <mo-playlists grid></mo-playlists>`;
  }
}

window.customElements.define("playlists-page", Playlists);
