import { LitElement, css, html, svg } from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";

export default class MpdIndex extends LitElement {
  static properties = {
    flat: { type: Boolean },
    index_disabled: { type: Boolean },
  };

  async index() {
    this.index_disabled = true;
    await api.post("/admin/index");
    this.index_disabled = false;
  }

  scan() {
    api.post("/admin/scan");
  }

  render() {
    return html`<pi-btn @click=${this.scan}>Scan</pi-btn>
      <pi-btn ?disabled=${this.index_disabled} @click=${this.index}
        >Index</pi-btn
      >`;
  }
}

window.customElements.define("mpd-index", MpdIndex);
