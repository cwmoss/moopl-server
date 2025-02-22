import { LitElement, css, html } from "../../vendor/lit-core.min.js";

export default class LED extends LitElement {
  static properties = {
    title: {},
  };

  static styles = [
    // cssvars,
    css`
      :host {
        --size: 0.5rem;
      }
      span {
        display: inline-block;
        background: rgb(58, 181, 100);
        border-radius: 50%;
        width: var(--size);
        height: var(--size);
      }
    `,
  ];

  render() {
    //    if (!this.data) return "";
    return html`<span title=${this.title}></span>`;
  }
}

window.customElements.define("pi-led", LED);
