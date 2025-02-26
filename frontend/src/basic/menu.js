/*
https://codesandbox.io/p/sandbox/floating-ui-dom-composed-offset-position-iscontainingblock-repro-case-qgfhnx?file=%2Fsrc%2Findex.js%3A96%2C37-96%2C60
*/
import loaded from "./floating-ui/loader.js";

import { LitElement, css, html } from "../../vendor/lit-core.min.js";
import { offsetParent } from "./floating-ui/composed-offset-position.js";

export default class Menu extends LitElement {
  static properties = {
    items: { type: Array },
    trigger: { type: Object },
  };

  context = null;

  static styles = [
    // cssvars,
    css`
      :host {
        // display: block;
        position: relative;
        --menu-pos-top: 0;
        --menu-pos-left: 0;
      }
      #rel {
        // position: relative;
      }

      #toggle {
        /* anchor-name: --menu; */
      }

      #menu {
        position: absolute;
        inline-size: max-content;
        // display: none;
        border: none;
        background-color: white;
        --shadow-linie-color: rgba(114, 120, 146, 0.3);
        --shadow-schatten-color: rgba(114, 120, 146, 0.1);
        --shadow-halbschatten-color: rgba(114, 120, 146, 0.07);
        --shadow-umgebung-color: rgba(114, 120, 146, 0.06);
        border-radius: 0.375rem;
        box-shadow: 0 0 0 0.03125rem var(--shadow-linie-color),
          0 0.4375rem 0.5rem -0.25rem var(--shadow-schatten-color),
          0 0.75rem 1.0625rem 0.125rem var(--shadow-halbschatten-color),
          0 0.3125rem 1.375rem 0.25rem var(--shadow-umgebung-color);
      }
      :popover-open {
        width: max-content;
        /* height: 200px; */
        position: absolute;
        inset: unset;
        top: var(--menu-pos-top);
        left: var(--menu-pos-left);
        margin: 0;
      }
      .listcontainer,
      .subcontainer {
        display: flex;
        flex-direction: column;
      }

      a {
        flex: 1;
        text-decoration: none;
        outline: none;
        line-height: 3;
        color: black;
        padding: 0 1rem;
      }

      a:link,
      a:visited {
        color: black;
      }

      a:hover,
      a:focus {
        background: var(--accent);
      }

      a:active {
        background: #999;
        /* color: white; */
      }
    `,
  ];

  select(e) {
    e.preventDefault();
    console.log("selected", e.target);
    this.shadowRoot.getElementById("menu").hidePopover();
    let evt = new CustomEvent("menu-select", {
      detail: { action: e.target.getAttribute("href"), context: this.context },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(evt);
  }
  xxset_position() {
    let rel = this.shadowRoot.getElementById("rel");
    let toggle = this.shadowRoot.getElementById("toggle");
    let menu = this.shadowRoot.getElementById("menu");
    let top = rel.offsetHeight + rel.offsetTop + 8;
    let left = rel.offsetLeft - 300;
    this.style.setProperty("--menu-pos-top", "" + top + "px");
    this.style.setProperty("--menu-pos-left", "" + left + "px");
    console.log("set pos", rel, toggle, menu); // querySelector("#toggle"));
    menu.showPopover();
  }
  show() {
    console.log(
      "++ show ++",
      this.trigger,
      this.trigger.getBoundingClientRect()
    );
    let t = this.trigger;

    let v = {
      getBoundingClientRect() {
        return t.getBoundingClientRect();
      },
    };

    let menu = this.shadowRoot.querySelector("#menu");
    // menu.style.display = "block";
    menu.showPopover();
    window.FloatingUIDOM.computePosition(t, menu, {
      middleware: [
        window.FloatingUIDOM.flip(),
        window.FloatingUIDOM.shift({
          padding: 5,
        }),
      ],

      /* platform: {
        ...window.FloatingUIDOM.platform,
        getOffsetParent: (element) =>
          window.FloatingUIDOM.platform.getOffsetParent(element, offsetParent),
      }, */
    }).then(({ x, y }) => {
      console.log("computed:", x, y);

      this.style.setProperty("--menu-pos-left", "" + x + "px");
      this.style.setProperty("--menu-pos-top", "" + y + "px");
      /*
      Object.assign(menu.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
      */
      // menu.showPopover();
    });
  }
  active = false;
  toggle() {}
  render() {
    return html`<div id="menu" popover @click=${this.select}>
      <nav class="listcontainer">
        ${this.items.map((it) => {
          return html`<a href=${it.name}>${it.title}</a>`;
        })}
      </nav>
    </div>`;
  }
  //createRenderRoot() {
  //  return this;
  //}
}

window.customElements.define("pi-menu", Menu);
