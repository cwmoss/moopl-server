import { LitElement, css, html, svg } from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";

export default class MpdIndex extends LitElement {
  static properties = {
    flat: { type: Boolean },
  };

  index() {
    api.post("/admin/index");
  }
  render() {
    return html`<pi-btn ?flat=${this.flat} @click=${this.index}
      ><slot>Index</slot></pi-btn
    >`;
  }
}

window.customElements.define("mpd-index", MpdIndex);
