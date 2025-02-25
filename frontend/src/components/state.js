import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";
import Sortable from "../../vendor/sortable.complete.esm.js";
// console.log("bootstrap import", cssvars);

export default class State extends LitElement {
  static properties = {
    keys: { type: Array },
    update_db: {},
  };
  static styles = [
    // cssvars,
    css`
      div {
        animation-name: bounce;
        animation-duration: 3s;
        animation-iteration-count: infinite;
      }
      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-10px);
        }
        50% {
          transform: translateY(5px);
        }
        70% {
          transform: translateY(-7px);
        }
        80% {
          transform: translateY(2px);
        }
        90% {
          transform: translateY(-3px);
        }
        100% {
          transform: translateY(0);
        }
      }
    `,
  ];
  constructor() {
    super();
    // this.update_db = true;
    document.addEventListener("moo.sse", this);
  }

  handleEvent(e) {
    console.log("from state component", e.detail);
    if (e.detail.updating_db) {
      this.update_db = true;
    } else {
      this.update_db = false;
    }
  }

  render() {
    return html`<div>${this.update_db ? "scanning tracks" : ""}</div>`;
  }
}

window.customElements.define("mo-state", State);
