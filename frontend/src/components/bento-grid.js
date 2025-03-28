import { LitElement, css, html } from "../../vendor/lit-core.min.js";

//import cssvars from "./variables.css.js";
// console.log("bootstrap import", cssvars);

export default class BentoGrid extends LitElement {
  static styles = [
    // cssvars,
    css`
      :host {
        margin: 1rem;
        display: grid;
        /* grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); */

        max-inline-size: 1200px;
        margin-inline: auto;

        /* grid-auto-flow: column; */

        grid-template-areas:
          "one"
          "two"
          "three"
          "four"
          "five";
        gap: 1rem;

        @media (min-width: 600px) {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          grid-template-areas:
            "one two three four"
            "five two three four";
        }
      }
      ::slotted([area="one"]) {
        grid-area: one;
      }
      ::slotted([area="two"]) {
        grid-area: two;
      }
      ::slotted([area="three"]) {
        grid-area: three;
      }
      ::slotted([area="four"]) {
        grid-area: four;
      }
      ::slotted([area="five"]) {
        grid-area: five;
      }

      h2 {
        font-size: 1.375rem;
        line-height: 1.25;
        font-weight: 900;
        display: inline-block;

        margin: 0;
      }
    `,
  ];

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define("bento-grid", BentoGrid);
