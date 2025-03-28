import { LitElement, css, html } from "./../../vendor/lit-core.min.js";
import Face from "./face.js";

export default class Switch extends Face {
  static properties = { ...Face.properties, on_label: {}, off_label: {} };

  static styles = [
    css`
      *,
      *::before,
      *::after {
        transition: 400ms all ease-in-out 50ms;
        box-sizing: border-box;
        backface-visibility: hidden;
      }
      :host {
        position: relative;
        display: block;
        --size: 40px;
        --top-offset: -3px;
        --left-offset: 2px;
      }
      input[type="checkbox"] {
        display: none;
      }

      a {
        color: rgba(43, 43, 43, 1);
        text-decoration: none;
        padding: 10px;
        border-bottom: 2px solid rgba(43, 43, 43, 1);
      }

      a:hover {
        background: rgba(43, 43, 43, 1);
        color: rgba(255, 255, 255, 1);
      }

      /*Button is :CHECKED*/

      input[type="checkbox"]:checked ~ div {
        background: rgba(73, 168, 68, 1);
        box-shadow: 0 0 2px rgba(73, 168, 68, 1);
      }

      input[type="checkbox"]:checked ~ div label {
        left: calc(var(--size) * 1.1);
        transform: rotate(360deg);
      }

      div,
      label {
        border-radius: 50px;
      }

      /*'un':checked state*/

      div {
        height: var(--size);
        width: calc(var(--size) * 2);
        background: rgba(43, 43, 43, 1);
        position: relative;
        /* top: calc(50vh - 50px);
        left: calc(50vw - 100px); */

        box-shadow: 0 0 2px rgba(43, 43, 43, 1);
      }

      label {
        height: calc(var(--size) * 0.8);
        width: calc(var(--size) * 0.8);
        background: rgba(255, 255, 255, 1);
        position: absolute;
        top: calc(var(--size) * 0.1);
        left: calc(var(--size) * 0.1);
        cursor: pointer;
      }

      label::before {
        content: "";
        height: calc(var(--size) * 0.6);
        width: 5px;
        position: absolute;
        top: calc(50% - calc(var(--size) * 0.3));
        left: calc(50% - 2.5px);
        transform: rotate(45deg);
      }

      label::after {
        content: "";
        height: 5px;
        width: calc(var(--size) * 0.6);
        position: absolute;
        top: calc(50% - 2.5px);
        left: calc(50% - calc(var(--size) * 0.3));
        transform: rotate(45deg);
      }

      label::before,
      label::after {
        background: rgba(43, 43, 43, 1);
        border-radius: 5px;
      }

      /* pesduo class on toggle */

      input[type="checkbox"]:checked ~ div label::before {
        height: calc(var(--size) * 0.5);
        top: calc(55% - (calc(var(--size) * 0.25)));
        left: calc(60% - (calc(var(--size) * 0.025)));
        background: rgba(73, 168, 68, 1);
      }
      input[type="checkbox"]:checked ~ div label::after {
        width: calc(var(--size) * 0.2);
        top: calc(95% - calc(var(--size) * 0.25) + var(--top-offset));
        left: calc(22.5% - calc(var(--size) * 0.025) + var(--left-offset));
        background: rgba(73, 168, 68, 1);
      }

      /*
label::before{
  height: 50px;
  top: calc(55% - 25px);
  left: calc(60% - 2.5px);
  background: rgba(73,168,68,1);
}
input[type="checkbox"]:checked ~ div label::after{
  width: 20px;
  top: calc(95% - 25px);
  left: calc(22.5% - 2.5px);
  background: rgba(73,168,68,1);
  */
    `,
  ];
  get_input_value(e) {
    // console.log(this.constructor.properties);
    return e.target.checked ? "on" : "off";
  }

  get_default_value() {
    return "off";
  }

  get_updated_data() {
    return this.value == "off" || !this.value ? false : true;
  }
  render() {
    return html`
      <input
        type="checkbox"
        id="toggle"
        @click=${(e) => this.input_event(e)}
        ?checked=${this.value == "on" || this.value === true}
        role="switch"
      />
      <div>
        <label for="toggle"></label>
      </div>
    `;
  }
  xrender() {
    console.log("render switch", this);
    return html`<div class="fgroup">
      <div class="form-check form-switch">
        <input
          @click=${(e) => this.input_event(e)}
          ?checked=${this.value == "on" || this.value === true}
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="check"
        />
        <label class="form-check-label" for="check"
          >${this.label}
          ${this.value == "off"
            ? this.off_label
            : this.value == "on"
            ? this.on_label
            : ""}</label
        >
        <slot></slot>
      </div>
    </div>`;
  }
}

customElements.define("pi-switch", Switch);
