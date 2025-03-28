import {
  LitElement,
  css,
  html,
  nothing,
  svg,
} from "../../../vendor/lit-core.min.js";
import api from "../../lib/api.js";
import Switch from "../../form-elements/pi-switch.js";

export default class DefaultImage extends LitElement {
  static properties = {
    flat: { type: Boolean },
    type: {},
    big: {},
  };

  static styles = [
    css`
      img {
        width: 200px;
      }
    `,
  ];
  restart() {
    // api.post("/admin/mpd_restart");
  }
  render() {
    let artwork =
      this.type == "radio"
        ? api.artwork_radio("non existent radio station")
        : api.artwork({ artwork_file: "-" });
    return html`<img src=${artwork} alt="default image" />`;
  }
}

window.customElements.define("default-image", DefaultImage);
