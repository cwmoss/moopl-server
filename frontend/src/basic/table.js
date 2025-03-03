import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";

// console.log("bootstrap import", cssvars);

export default class Table extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
  };

  static styles = [
    // cssvars,
    css`
      :host {
        display: block;
        --border-color: #ccc;
      }
      table {
        border-collapse: collapse;
      }
      thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
      }
      th,
      td {
        padding: 0 0.5rem;
      }
      td:first-child {
        font-weight: 900;
      }
      tbody tr {
        border-bottom: 1px solid #dddddd;
      }

      tbody tr:nth-child(2n) {
        background-color: #f3f3f3;
      }

      tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
      }
    `,
  ];

  render_col(el, key, keyindex) {
    return html`<td>${el[key]}</td>`;
  }

  render() {
    if (!this.data) return "";
    return html`<table>
      ${this.data.map((el) => {
        return html`<tr>
          ${this.keys.map((key, idx) => this.render_col(el, key))}
        </tr>`;
      })}
    </table>`;
  }
}

window.customElements.define("pi-table", Table);
