import {
  LitElement,
  css,
  html,
  nothing,
  svg,
} from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";
import Switch from "../../form-elements/pi-switch.js";

export default class BluetoothConfig extends LitElement {
  static properties = {
    flat: { type: Boolean },
    big: {},
  };

  restart() {
    // api.post("/admin/mpd_restart");
  }
  render() {
    return html`<pi-switch
      ?flat=${this.flat}
      big="${this.big || nothing}"
      @click=${this.restart}
    ></pi-switch>`;
  }
}

window.customElements.define("bluetooth-config", BluetoothConfig);
