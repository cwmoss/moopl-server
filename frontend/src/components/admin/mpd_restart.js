import { LitElement, css, html, svg } from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";

export default class MpdRestart extends LitElement {
  static properties = {
    flat: { type: Boolean },
  };

  restart() {
    api.post("/admin/mpd_restart");
  }
  render() {
    return html`<pi-btn ?flat=${this.flat} @click=${this.restart}
      ><slot>Restart</slot></pi-btn
    >`;
  }
}

window.customElements.define("mpd-restart", MpdRestart);
