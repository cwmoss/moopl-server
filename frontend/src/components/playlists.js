import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";

// console.log("bootstrap import", cssvars);

export default class Playlists extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
    active_menu: {},
    active_item: {},
  };

  async connectedCallback() {
    super.connectedCallback();
    this.data = library.playlists_data;
    //this.data = library.search("touch");
    console.log("filtered:", this.data);
    document.addEventListener("app.playlists", this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("app.playlists", this);
  }
  handleEvent(ev) {
    if (ev.type == "app.playlists") this.data = library.playlists_data;
  }
  static styles = [
    // cssvars,
    css`
      :host {
        --grid-size: var(--mo-grid-size, 170px);
      }

      :host {
        display: block;
        --border-color: #ccc;
      }
      :host([grid]) ul {
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(auto-fit, var(--grid-size));
      }
      :host([grid]) li {
        width: var(--grid-size);
        // height: var(--grid-size);
      }
      img {
        width: 100%;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        position: relative;
        z-index: 0;
        // margin-bottom: 0.5rem;
      }
      .artist {
        display: block;
      }
      strong {
        font-weight: 900;
      }
      nav {
        position: absolute;
        top: 0;
        left: 0;
        background: white;
        border-radius: 4px;
        border: 1px solid #dedede;
      }
    `,
  ];
  search(e) {
    console.log("search", e);
  }
  play_now(track) {
    console.log("playnow0", track);
    // library.api.play_now(track.file);
  }
  on_click(ev) {
    console.log("clicked on", ev.target.closest("li").id);
    // this.active_menu = ev.target.closest("li").id;
  }
  edit(item) {
    console.log("edit ITEM", item, {
      id: item.data.name,
      title: item.data.name,
      ...item.data,
    });
    this.active_item = {
      id: item.data.name,
      title: item.data.name,
      ...item.data,
    };
  }
  edit_finished() {
    console.log("edit FIN");
    this.active_item = null;
  }
  render_item(el) {
    return html`<li id="${el.file}">
      <img
        loading="lazy"
        src=${library.api.artwork(el)}
        alt=${"Logo of " + el.title}
      />
      <strong title=${el.file}>${el.title}</strong
      ><!--span class="artist"
        >${el.artist}
        <button @click=${() => this.play_now(el)}>play</button></span
      -->
      ${this.render_menu(el)}
    </li>`;
  }
  render_menu(it) {
    // if (this.active_menu != it.file) return "";
    return html`<nav class="menu">
      <ul>
        <li>
        <button @click=${() => this.play_now(it)}>play</button></span>
        </li>
        <li>
        <pi-btn @click=${() => this.edit(it)}>edit</pi-btn></span>
        </li>
      </ul>
    </nav>`;
  }
  render_editor() {
    if (!this.active_item) return "";
    return html`<mo-playlist-editor
      edit
      @pi-closed=${this.edit_finished}
      .data=${this.active_item}
    ></mo-playlist-editor>`;
  }
  render() {
    if (!this.data) return "";
    console.log("+++ render playlists", this.data);
    // if (!this.data) return "";

    return html` ${this.render_editor()}
      <h1>${this.data.length} playlists</h1>
      <ul @click=${this.on_click}>
        ${this.data.map((el) => {
          return this.render_item(el);
        })}
      </ul>`;
  }
}

window.customElements.define("mo-playlists", Playlists);
