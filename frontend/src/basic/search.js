import { LitElement, css, html, unsafeHTML } from "../../vendor/lit-all.min.js";
import FormInput from "../form-elements/input.js";
import Select from "../form-elements/select.js";
import api from "../lib/api.js";
// import project from "../lib/project.js";
// https://stackoverflow.com/questions/15462991/trigger-autocomplete-without-submitting-a-form
let style = css`
  #rel {
    position: relative;
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
    isopen: { reflect: true, type: Boolean },
    types: { type: Array },
    result: { type: Array },
  };

  static styles = [style];
  async connectedCallback() {
    super.connectedCallback();
    //let schema = project.schema();
    //this.types = schema.document_types;
    this.isopen = false;

    // hide the menu when a click event occurs outside the menu
    /*
    https://stackoverflow.com/questions/37369960/determine-if-user-clicked-outside-shadow-dom
    */
    document.addEventListener("click", (event) => {
      // console.log(
      //   "$search click outside check",
      //   event.composedPath(),
      //   event.path,
      //   event.target,
      //   event.currentTarget,
      //   event.originalTarget
      // );
      // if (!this.contains(event.target)) {
      if (!event.composedPath().includes(this.shadowRoot)) {
        // console.log("$search click outside");
        this.isopen = false;
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("$search disconnected");
  }
  open() {
    this.dispatchEvent(
      new CustomEvent("open-doc", {
        detail: { id: this.id },
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
    console.log("+++ submit", ev);
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
      >
        <input
          @focusin=${this.hasfocus}
          @click=${this.hasfocus}
          @input=${this.typeing}
          name="search"
          type="search"
        /><button
          flat
          slot="suffix-button"
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
      </form>
    </div>`;
  }
}

customElements.define("pi-search", Search);
