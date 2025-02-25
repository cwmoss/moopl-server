import {
  LitElement,
  css,
  html,
  svg,
  unsafeHTML,
} from "../../vendor/lit-all.min.js";
import FormInput from "../form-elements/input.js";
import Select from "../form-elements/select.js";
import { bootstrapformstyles } from "../form-elements/bs-only-form.css.js";
import api from "../lib/api.js";
// import project from "../lib/project.js";
// https://stackoverflow.com/questions/15462991/trigger-autocomplete-without-submitting-a-form
let searchicon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>`;
let closeicon = svg`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg>`;
let style = css`
  #rel {
    position: relative;
  }
  input {
    position: relative;
  }
  input::-webkit-search-cancel-button {
    display: none;
  }
  .xxxreset {
    position: absolute;
    right: 55px;
    top: 5px;
    cursor: pointer;
    z-index: 100;
  }
  .close-icon {
    padding: 0;
    margin: 0 !important;
    position: relative;
    border: 0px solid transparent;
    background-color: transparent;
    display: inline-block;
    vertical-align: middle;
    outline: 0;
    cursor: pointer;
  }

  .close-icon:after {
    content: "X";
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: #fa9595;
    z-index: 10;
    right: 18px;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 0;
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: normal;
    font-size: 12px;
    box-shadow: 0 0 2px #e50f0f;
    cursor: pointer;
  }
  #search:not(:valid) ~ .close-icon {
    display: none;
  }
  pi-select {
    width: 40%;
  }
  :host([isopen]) #menu {
    position: absolute;
    z-index: 99;
    background: white;
    border: none;
    --shadow-linie-color: rgba(114, 120, 146, 0.3);
    --shadow-schatten-color: rgba(114, 120, 146, 0.1);
    --shadow-halbschatten-color: rgba(114, 120, 146, 0.07);
    --shadow-umgebung-color: rgba(114, 120, 146, 0.06);
    border-radius: 0.375rem;
    box-shadow: 0 0 0 0.03125rem var(--shadow-linie-color),
      0 0.4375rem 0.5rem -0.25rem var(--shadow-schatten-color),
      0 0.75rem 1.0625rem 0.125rem var(--shadow-halbschatten-color),
      0 0.3125rem 1.375rem 0.25rem var(--shadow-umgebung-color);
    width: 150%;
    // max-height: 100%;
    overflow: auto;
  }
  :host(:not([isopen])) #menu {
    display: none;
  }
  :popover-open {
    width: 50vw;
    position: absolute;
    inset: unset;
    top: var(--menu-pos-top);
    left: var(--menu-pos-left);
    margin: 0;
  }
  #menu > * {
    margin: 4px;
    padding: 0.5rem;
  }
  #menu > *:hover {
    background-color: #eee;
  }
  #menu em {
    color: #666;
    text-transform: uppercase;
    font-style: normal;
  }
`;

export default class Search extends LitElement {
  static properties = {
    id: { reflect: true },
    type: {},
    term: {},
    isopen: { reflect: true, type: Boolean },
    types: { type: Array },
    result: { type: Array },
  };

  static styles = [bootstrapformstyles, style];
  async connectedCallback() {
    super.connectedCallback();
    //let schema = project.schema();
    //this.types = schema.document_types;
    this.isopen = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("$search disconnected");
  }

  set page(name) {
    this.type = name;
  }

  fire() {
    document.dispatchEvent(
      new CustomEvent("search", {
        detail: { term: this.term, type: this.type },
        bubbles: 1,
        composed: 1,
      })
    );
  }

  select(e) {
    let idx = e.target.dataset.idx;
    if (this.result[idx]) {
      this.dispatchEvent(
        new CustomEvent("open-doc", {
          detail: { id: this.result[idx]._id, type: this.result[idx]._type },
          bubbles: 1,
          composed: 1,
        })
      );
    }
  }
  on_submit(ev) {
    if (ev.type == "reset") this.term = "";
    else this.term = this.shadowRoot.querySelector("#search").value;
    console.log("+++ submit", ev, this.term);
    this.fire();
    // ev.preventDefault();
  }
  hasfocus(e) {
    console.log("++ search focus");
    this.isopen = true;
    return;
    let menu = this.shadowRoot.getElementById("menu");
    menu.showPopover();
  }
  async typeing(e) {
    return;
    this.set_position();
    let res = await api.search(e.target.value);
    this.result = res.result;
    let menu = this.shadowRoot.getElementById("menu");
    // menu.showPopover();
  }
  xcreateRenderRoot() {
    return this;
  }
  render() {
    return html`<div id="rel">
      <iframe
        name="autosaveframe"
        style="display:none"
        src="about:blank"
      ></iframe>
      <form
        name="search-form"
        target="autosaveframe"
        action="about:blank"
        @submit=${this.on_submit}
        @reset=${this.on_submit}
      >
        <div class="input-group">
          <input
            @focusin=${this.hasfocus}
            @click=${this.hasfocus}
            @input=${this.typeing}
            placeholder=${"Search in " + this.type}
            class="form-control"
            required
            id="search"
            name="search"
            type="search"
          /><button class="close-icon" type="reset"></button
          ><button
            flat
            slot="suffix-button"
            class="btn btn-outline-secondary"
            id="button-addon2"
          >
            ${searchicon}
          </button>
        </div>
      </form>
    </div>`;
  }
}
// <button class="close-icon" type="reset"></button>;
// ${this.term ? html`<i class="reset">${closeicon} </i>` : ""}
customElements.define("mo-search", Search);
