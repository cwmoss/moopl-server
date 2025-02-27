import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";

// console.log("bootstrap import", cssvars);

export default class Radiolist extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
    active_menu: {},
  };

  async connectedCallback() {
    super.connectedCallback();
    this.data = library.radios();
    //this.data = library.search("touch");
    console.log("filtered:", this.data);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    //document.removeEventListener("app.queue", this);
    //document.removeEventListener("app.current", this);
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
    library.api.play_now(track.file);
  }
  on_click(ev) {
    console.log("clicked on", ev.target.closest("li").id);
    this.active_menu = ev.target.closest("li").id;
  }
  /*

  https://simonewebdesign.it/pure-css-onclick-context-menu/
https://github.com/simonewebdesign/simonewebdesign/blob/main/source/_includes/scss/2019-05-13-pure-css-onclick-context-menu.scss
https://github.com/api-client/context-menu/blob/main/demo/basic.js
https://github.com/jsuites/jsuites/blob/master/src/plugins/contextmenu.js
https://dev.to/andreygermanov/simple-way-to-add-custom-context-menus-to-web-pages-10lc
https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app
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
    if (this.active_menu != it.file) return "";
    return html`<nav class="menu">
      <ul>
        <li>
        <button @click=${() => this.play_now(it)}>play</button></span>
        </li>
      </ul>
    </nav>`;
  }
  render() {
    if (!this.data) return "";
    console.log("+++ render radios", this.data);
    // if (!this.data) return "";

    return html`<h1>${this.data.length} stations</h1>
      <ul @click=${this.on_click}>
        ${this.data.map((el) => {
          return this.render_item(el);
        })}
      </ul>`;
  }
}

window.customElements.define("mo-radiolist", Radiolist);
