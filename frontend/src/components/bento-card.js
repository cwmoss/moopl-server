import { LitElement, css, html } from "../../vendor/lit-core.min.js";

//import cssvars from "./variables.css.js";
// console.log("bootstrap import", cssvars);
// https://www.youtube.com/watch?v=h4dHvo09cG4
// https://github.com/kevin-powell/bento-grid-frontend-mentor-challenge-tutorial/blob/main/style-FINISHED.css

export default class BentoCard extends LitElement {
  static properties = {
    title: {},
    url: {},
    api: {},
    data: { type: Object },
    placeholder: {},
    surface: {},
    foreground: {},
    content: { type: Array },
  };

  static styles = [
    // cssvars,
    css`
      :host {
        height: 100%;
        overflow: hidden;
        // padding: 1.25rem !important;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
          0 2px 10px 0 rgba(0, 0, 0, 0.1);
        // box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.8);
        border-radius: 15px;
        overflow: hidden;
        padding: 0.5rem;
      }
      * {
        box-sizing: border-box;
      }
      article {
        padding: 1rem;
        background: var(--surface);
        color: var(--foreground, "black");
        height: 100%;
        display: grid;
        // flex-direction: column;
        // position: relative;
        // z-index: 10;
      }
      article > * {
        /* background: var(--surface); */
        align-content: var(--v-align, start);
        align-items: var(--v-align, start);
        justify-items: var(--h-align, start);
        text-align: var(--h-align, start);
      }
      :host([imagetop]) ::slotted(img) {
        order: -1;
      }
      header {
        border-radius: 10px 10px 0 0;
        // margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1rem;
        /* border-bottom: 1px solid var(--surface-10); */
      }
      ::slotted(h2) {
        font-size: 1.5rem;
        line-height: 1.25;
        font-weight: 900;
        display: inline-block;

        margin: 0;
      }
      article h2 {
        font-size: 1.5rem;
      }
      img {
        width: 80%;
      }
      main {
        border-radius: 0 0 10px 10px;
      }
      footer {
        font-size: 0.75rem;
        padding: 0.5rem;
        margin-top: auto;
        background-color: #fafafa;
        height: 3rem;
        border-radius: 0 0 10px 10px;
        /* border-bottom: 2px solid black; */
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.set_chrome();
    console.log("== slots+++", this.querySelectorAll(":scope > *"));
    this.content = this.querySelectorAll(":scope > *");
    // this.content = this.shadowRoot.querySelector("slot").assignedNodes();
  }

  set_chrome() {
    if (this.surface) {
      this.style.setProperty("--surface", `var(--${this.surface}`);
    }
    if (this.foreground) {
      this.style.setProperty("--foreground", `var(--${this.foreground}`);
    }
    if (this.getAttribute("h-align")) {
      this.style.setProperty("--h-align", this.getAttribute("h-align"));
    }
  }
  render() {
    return html`<article>${this.content}</article>`;
  }
  xxrender() {
    return html`<article>
      <header>
        <h1>
          <slot name="header">${this.title}</slot>
        </h1>
      </header>
      <main>
        <slot></slot>
      </main>
      <slot name="image"></slot>
      <!-- footer><slot name="footer"></slot></footer -->
    </article>`;
  }
}

window.customElements.define("bento-card", BentoCard);
