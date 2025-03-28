import {
  LitElement,
  css,
  html,
  nothing,
  svg,
} from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";

export default class MpdRestart extends LitElement {
  static properties = {
    flat: { type: Boolean },
    big: {},
  };

  restart() {
    api.post("/admin/mpd_restart");
  }
  render() {
    return html`<pi-btn
      ?flat=${this.flat}
      big="${this.big || nothing}"
      @click=${this.restart}
      ><slot>Restart</slot></pi-btn
    >`;
  }
}

window.customElements.define("mpd-restart", MpdRestart);
