import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";

// console.log("bootstrap import", cssvars);

export default class Radiolist extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
  };

  async connectedCallback() {
    super.connectedCallback();
    this.data = library.radios();
    //this.data = library.search("touch");
    console.log("filtered:", this.data);
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
        // margin-bottom: 0.5rem;
      }
      .artist {
        display: block;
      }
      strong {
        font-weight: 900;
      }
    `,
  ];
  search(e) {
    console.log("search", e);
  }
  play_now(track) {
    console.log("playnow0", track);
    library.api.play_now(track.file);
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
    */

    return html`<li>
      <img
        loading="lazy"
        src=${library.api.artwork_radio(el.title)}
        alt=${"Logo of " + el.title}
      />
      <strong>${el.title}</strong
      ><!--span class="artist"
        >${el.artist}
        <button @click=${() => this.play_now(el)}>play</button></span
      -->
    </li>`;
  }
  render() {
    if (!this.data) return "";
    console.log("+++ render radios", this.data);
    // if (!this.data) return "";

    return html`${this.data.length} stations
      <input type="search" @input=${this.search} />
      <ul>
        ${this.data.map((el) => {
          return this.render_item(el);
        })}
      </ul>`;
  }
}

window.customElements.define("mo-radiolist", Radiolist);
