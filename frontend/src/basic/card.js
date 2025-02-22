import { LitElement, css, html } from "../../vendor/lit-core.min.js";

//import cssvars from "./variables.css.js";
// console.log("bootstrap import", cssvars);

export default class Card extends LitElement {
  static properties = {
    title: {},
    url: {},
    api: {},
    data: { type: Object },
    placeholder: {},
  };

  static styles = [
    // cssvars,
    css`
      :host {
        height: 100%;
        overflow: hidden;
        padding: 1.25rem !important;
      }
      * {
        box-sizing: border-box;
      }
      json-viewer {
        --background-color: white;
      }
      article {
        background: var(--surface);
        height: 100%;
        display: flex;
        flex-direction: column;
        // position: relative;
        // z-index: 10;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
          0 5px 10px 0 rgba(0, 0, 0, 0.1);
        // box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.8);
        border-radius: 15px;
        overflow: hidden;
        padding: 0.5rem;
      }
      article > * {
        padding: 1rem;
        background: var(--surface);
      }
      header {
        border-radius: 10px 10px 0 0;
        // margin-top: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--surface-10);
      }
      header h1 {
        font-size: 1.375rem;
        line-height: 1.25;
        font-weight: 900;
        display: inline-block;

        margin: 0;
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

  render() {
    return html`<article>
      <header>
        <h1>
          <slot name="header">${this.title}</slot>
        </h1>
      </header>
      <main><slot></slot></main>
      <!-- footer><slot name="footer"></slot></footer -->
    </article>`;
  }
}

window.customElements.define("pi-card", Card);
