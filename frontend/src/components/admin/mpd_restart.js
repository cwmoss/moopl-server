import { LitElement, css, html, svg } from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";

export default class MpdRestart extends LitElement {
  static properties = {};

  restart() {
    api.post("/admin/mpd_restart");
  }
  render() {
    return html`<pi-btn @click=${this.restart}>Restart</pi-btn>`;
  }
}

window.customElements.define("mpd-restart", MpdRestart);
