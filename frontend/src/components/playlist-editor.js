import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
import api from "../lib/api.js";

// console.log("bootstrap import", cssvars);
let formschema = `
doc:
  playlist:
    fields:
      name: 
        type: string
        title: Titel
        validation:
            - required
      genre:
        type: string
        title: Genre
        
      cover:
        type: imageupload
        title: Cover
        options:
          upload_url: ${api.endpoint}/upload/playlistcover
`;
export default class PlaylistEditor extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Object },
    create: { type: Boolean },
    edit: { type: Boolean },
    active_menu: {},
  };

  async connectedCallback() {
    super.connectedCallback();
    // this.data = library.playlists();
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
    `,
  ];
  get title() {
    return this.create ? "Create Playlist" : "Edit " + this.data.title;
  }
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

  save(ev) {
    console.log("save PL", ev.detail);
    // library.api.post("/playlist/create", { input: ev.detail });
    this.shadowRoot.querySelector("pi-dialog").close_dialog();
  }
  render() {
    // if (!this.data) return "";
    console.log("+++ render radios", this.data);
    // if (!this.data) return "";

    return html`<pi-dialog
      title=${this.title}
      .nobutton=${!this.create}
      ?open=${this.edit}
    >
      ${this.create ? html`<pi-btn slot="button">Create</pi-btn>` : ""}
      <pi-form-builder
        @pi-submit=${this.save}
        .value=${this.data}
        document_type="playlist"
        .yaml_schema=${formschema}
      ></pi-form-builder>
    </pi-dialog>`;
  }
}

window.customElements.define("mo-playlist-editor", PlaylistEditor);
