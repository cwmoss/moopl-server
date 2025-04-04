import { LitElement, css, html, svg } from "../../vendor/lit-core.min.js";
// import api from "../lib/api.js";
import library from "../lib/library.js";
import track from "../lib/track.js";
import { seconds_to_hms } from "../lib/util.js";

//import cssvars from "./variables.css.js";
let play = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>`;
// console.log("bootstrap import", cssvars);
let next = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>`;
let prev = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"/></svg>`;
let volume = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"/></svg>`;
let pause = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5985E1"><path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>`;
let mute = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5985E1"><path d="M7 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L11 9H8c-.55 0-1 .45-1 1z"/></svg>`;

export default class Player extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
    volume: {},
    title: {},
    artist: {},
    elapsed: { type: Number },
    duration: { type: Number },
    radio: { type: Boolean, reflect: true },
    track: { type: Boolean, reflect: true },
    bluetooth: { type: Boolean, reflect: true },
    airplay: { type: Boolean, reflect: true },
    spotify: { type: Boolean, reflect: true },
    countdownmode: { type: Boolean, reflect: true },
    state: { type: String, reflect: true },
  };

  timer = null;

  constructor() {
    super();
    this.volume = 0;
    this.elapsed = 0;
    this.duration = 0;
    console.log("##player", navigator);
    //document.addEventListener("moo.sse", this);
  }
  //  disconnectedCallback() {
  //    super.disconnectedCallback();
  //    document.removeEventListener("moo.sse", this);
  //  }

  /*
https://stackoverflow.com/questions/52226454/media-notifications-using-the-media-session-web-api-doesnt-work-with-web-audio

https://css-tricks.com/give-users-control-the-media-session-api/




*/
  play() {}
  pause() {
    console.log("paused by mediasession");
  }
  handleEvent(e) {
    console.log("from player component", e, e.detail);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    let ev = e.detail;
    if (ev.volume) this.volume = ev.volume;
    if (ev?.state) this.state = ev.state;
    if (ev.current_song) {
      let current = ev.current_song;
      this.set_inputs(current);
      this.title = current.title;
      this.artist = current.artist;
      if (current.is_radio) this.artist = library.station_name(current.file);
      this.duration = ev.duration ? ev.duration : 0;
      this.elapsed = ev.elapsed ? ev.elapsed : 0;
      if (ev?.state == "play" && !current.is_radio) {
        this.timer = setInterval(() => (this.elapsed += 1), 1000);
      }
    }
  }
  set_inputs(current) {
    this.track = this.radio = false;
    if (current.is_radio) this.radio = true;
    else this.track = true;
  }
  get elapsed_permille() {
    return (this.elapsed * 1000) / this.duration;
  }
  toggle_countdownmode(e) {
    this.countdownmode = !this.countdownmode;
  }
  toggle_play() {
    if (this.state == "play") {
      this.state = "pause";
      library.api.pause();
    } else {
      let current_state = this.state;
      this.state = "play";
      library.api.play(current_state);
    }
  }
  next() {
    library.api.next();
  }
  prev() {
    library.api.prev();
  }
  seek(e) {
    console.log("seek pos", e.target.value);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    library.api.seek((this.duration * e.target.value) / 1000);
  }
  change_volume(e) {
    console.log("change vol", e.target.value);
    this.volume = e.target.value;
    library.api.volume(e.target.value);
  }

  render() {
    console.log("render player");
    // if (!this.data) return "";
    return html`<section class="play-buttons">
        <button
          @click=${this.toggle_play}
          title=${"current state: " + this.state + ". click to toggle"}
        >
          <span class="play">${play}</span
          ><span class="pause">${pause}</span></button
        ><button @click=${this.prev}>${prev}</button
        ><button @click=${this.next}>${next}</button>
      </section>
      <mo-knob .value=${this.volume} @input=${this.change_volume}></mo-knob>

      <section class="track">
        <strong title=${this.title}>${this.title}</strong>
        <span title=${this.artist}>${this.artist}</span>
      </section>
      <section class="playhead">
        <input
          type="range"
          .value=${this.elapsed_permille}
          @input=${this.seek}
          min="0"
          max="1000"
        />
        <div class="times">
          <div class="duration num">${seconds_to_hms(this.duration)}</div>
          <div @click=${this.toggle_countdownmode}>
            <div class="time-elapsed num">${seconds_to_hms(this.elapsed)}</div>
            <div class="time-remaining num">
              -${seconds_to_hms(this.duration - this.elapsed)}
            </div>
          </div>
        </div>
      </section>
      <section class="inputs">
        <div ?active=${this.track}>Tracks</div>
        <div ?active=${this.radio}>Radio</div>
        <div ?active=${this.bluetooth}>Bluetooth</div>
        <div ?active=${this.airplay}>Airplay</div>
        <div ?active=${this.spotify}>Spotify</div>
      </section> `;
  }

  static styles = [
    // cssvars,
    css`
      :host {
        display: grid;
        grid-template-areas:
          "btn knob info"
          "btn knob info"
          "btn knob playhead"
          "btn led led";
        grid-template-columns: 100px 55px 1fr;
        width: 100%;
        --border-color: #ccc;
        --small-screen: 380px;
      }
      svg {
        fill: var(--text);
      }
      section.play-buttons {
        //margin-right: 1rem;
        grid-area: btn;
        max-width: 100px;
        // min-width: 40px;
      }
      @media (max-width: 380px) {
        section.play-buttons {
          max-width: 34px;
        }
      }
      strong {
        font-weight: 900;
      }
      .num {
        // font-family: monospace;
        font-variant-numeric: tabular-nums;
      }
      .volume input[type="range"] {
        writing-mode: sideways-lr;
      }
      .playhead {
        grid-area: playhead;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .inputs {
        grid-area: led;
      }
      input {
        // flex-shrink: 1;
        flex-grow: 2;
        width: 0;
        // width: 100%;
      }
      .volume .inactive {
        display: none;
      }
      .volume:hover .inactive {
        display: block;
        position: absolute;
        top: 0px;
        z-index: 99;
      }
      mo-knob {
        width: 54px;
        grid-area: knob;
      }
      main {
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: 0;
      }
      .track {
        // display: flex;
        // gap: 0.5rem;
        line-height: 1.2;
        grid-area: info;
        display: inline-grid;
        white-space: nowrap;
        justify-self: start;
      }
      .track > * {
        white-space: nowrap;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .track > strong:empty + span {
        font-size: 2rem;
      }
      .times {
        display: flex;
        gap: 0.5rem;
        font-size: 0.8rem;
        width: 100px;
        flex-shrink: 0;
      }
      .time-remaining,
      .time-elapsed {
        cursor: pointer;
      }
      .time-remaining {
        display: none;
      }
      :host([countdownmode]) .time-remaining {
        display: block;
      }
      :host([countdownmode]) .time-elapsed {
        display: none;
      }
      :host([state="stop"]) .pause,
      :host([state="pause"]) .pause {
        display: none;
      }
      :host([state="stop"]) .play,
      :host([state="pause"]) .play {
        display: initial;
      }
      :host([state="play"]) .pause {
        display: initial;
      }
      :host([state="play"]) .play {
        display: none;
      }

      :host([radio]) .times,
      :host([radio]) .playhead {
        display: none;
      }
      :host([radio]) .track {
        flex-direction: column;
        gap: 0;
      }
      button {
        background: transparent;
        border: none;
        border-radius: 3px;
      }
      button:hover {
        background: var(--surface-hover);
      }
      .inputs div {
        display: inline-block;
        font-size: 0.6rem;
        padding: 0.05rem 0.2rem;
        text-transform: uppercase;
        color: #ddd;
        border: 2px solid #ddd;
        border-radius: 2px;
      }
      .inputs div[active] {
        color: var(--inverted);
        border-color: #666;
        /* https://cssgradient.io/gradient-backgrounds/ */

        background-image: linear-gradient(
          to right,
          #bda426 0%,
          #fddd34 51%,
          #e4be03 100%
        );

        /* background-image: linear-gradient(
          to right,
          #02aab0 0%,
          #00cdac 51%,
          #02aab0 100%
        );*/
      }
    `,
  ];
}

window.customElements.define("mo-player", Player);
