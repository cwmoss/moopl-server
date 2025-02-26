import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";

// console.log("bootstrap import", cssvars);

export default class Tracklist extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
  };

  async connectedCallback() {
    super.connectedCallback();
    this.data = await library.tracks();
    document.addEventListener("search", this);
    // this.addEventListener("error", (e) => this.image_loaderror(e), true);
    //this.data = library.search("touch");
    console.log("filtered:", this.data);
  }
  static styles = [
    // cssvars,
    css`
      :host {
        display: block;
        --border-color: #ccc;
        --image-size: 57px;
      }
      strong {
        font-weight: 900;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        display: flex;
        gap: 0.5rem;
        background: var(--surface);
        margin-bottom: 0.2rem;
        width: 410px;
      }
      header {
        line-height: 0;
        flex-shrink: 0;
        width: var(--image-size);
        height: var(--image-size);
      }
      img {
        width: var(--image-size);
        height: var(--image-size);
      }
      main {
        flex-grow: 1;
        overflow: hidden;
        white-space: nowrap;
      }
      strong,
      .artist {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      footer {
        flex-shrink: 0;
        width: 36px;
        align-self: end;
        padding: 4px;
      }
    `,
  ];

  actions = [
    {
      name: "playnow",
      title: "Play now",
    },
    {
      name: "playnext",
      title: "Play next",
    },
    {
      name: "queue",
      title: "Add to Queue",
    },
  ];
  handleEvent(ev) {
    console.log("tracklist ev", ev);
    if (ev.type == "search") {
      this.data = library.search_tracks(ev.detail.term);
    }
  }

  image_loaderror(ev) {
    console.log("$$$ load error", ev.target);
    ev.target.remove();
  }
  search(e) {
    console.log("search", e);
  }
  play_now(track) {
    console.log("playnow0", track);
    library.api.play_now(track.file);
  }

  context_menu(ev) {
    console.log("clicked on", ev.target);
    if (ev.target.tagName != "PI-BTN") return;
    let element = ev.target.closest("li");
    if (element) {
      let button = element.querySelector("pi-btn");
      let menu = this.shadowRoot.querySelector("pi-menu");
      console.log("menu:", menu, ev);
      menu.trigger = button;
      menu.show();
    }
  }
  do_action(e) {
    console.log("action:", e);
  }
  /*
  ${this.data.map((el) => {
        return html`<dt>${el[this.keys[0]]}</dt>
          <dd>${el[this.keys[1]]}</dd>`;
      })}
          */
  render_item(el) {
    // console.log("item", el);
    /*
    let artist = el["artist"];
    if (!artist.length) artist = el["album artist"];
    else artist = artist.join(", ");
    let title = el["title"];
    if (!title || title == "Unknown Title") {
      // console.log("trim title", title, el["file"]);
      title = el["file"].split("\\").pop().split("/").pop();
      title = title.substring(0, title.lastIndexOf(".")) || title;
    }
      <button @click=${() => this.play_now(el)}>play</button>

      alt=${"Artwork for track " + el.title}

    */

    return html`<li data-track=${el.file}>
      <header>
        <img
          loading="lazy"
          src=${library.api.artwork(el.file, el.artwork_file)}
          @error=${this.image_loaderror}
        />
      </header>
      <main>
        <strong title=${el.title}>${el.title}</strong
        ><span class="artist" title=${el.artist}>${el.artist}</span>
      </main>

      <footer><pi-btn flat icon="dotsv"></pi-btn></footer>
    </li>`;
  }
  render() {
    if (!this.data) return "";
    console.log("+++ render tracks", this.data);
    // if (!this.data) return "";

    return html`${this.data.length} tracks
      <pi-menu .items=${this.actions} @click=${this.do_action}></pi-menu>
      <ul @click=${this.context_menu}>
        ${this.data.map((el) => {
          return this.render_item(el);
        })}
      </ul>`;
  }
}

// <input type="search" @input=${this.search} />
window.customElements.define("mo-tracklist", Tracklist);
