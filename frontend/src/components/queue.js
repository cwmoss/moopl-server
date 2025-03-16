import { LitElement, css, html, svg } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";
import Sortable from "../../vendor/sortable.complete.esm.js";
// console.log("bootstrap import", cssvars);

let play_icon = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>`;
let trash_icon = svg`<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>`;
let heart_icon = svg`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default class Queue extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
    current: {},
  };

  async connectedCallback() {
    super.connectedCallback();

    this.data = library.queue_data;
    this.current = library.current_song.file;
    //this.data = library.search("touch");
    console.log("filtered:", this.data);
    document.addEventListener("app.queue", this);
    document.addEventListener("app.current", this);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("app.queue", this);
    document.removeEventListener("app.current", this);
  }
  static styles = [
    // cssvars,
    css`
      :host {
        display: block;
        --border-color: #ccc;
        --image-size: 57px;
      }
      * {
        box-sizing: border-box;
      }
      svg:not([fill="none"]) {
        fill: var(--text);
      }
      strong {
        font-weight: 900;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        display: flex;
        gap: 0.5rem;
        background: var(--surface);
        margin-bottom: 0.2rem;
      }
      li[active] {
        background: var(--accent);
        color: var(--inverted);
      }
      header {
        line-height: 0;
        flex-shrink: 0;
        width: var(--image-size);
        height: var(--image-size);
      }
      img {
        width: var(--image-size);
        height: var(--image-size);
      }
      main {
        flex-grow: 1;
        flex-shrink: 1;
        padding: 4px;
        overflow: hidden;
        white-space: nowrap;
      }
      strong,
      .artist {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      footer {
        flex-shrink: 0;
        width: 78px;
        align-self: end;
        padding: 4px;
      }
      footer pi-btn {
        display: inline-block;
      }
      footer svg {
        width: 18px;
      }
      .selected,
      .sortable-chosen {
        background: #999;
      }
      .sortable-ghost {
        opacity: 0.5;
      }
    `,
  ];

  handleEvent(e) {
    console.log("$$ queue data update", e);
    if (e.type == "app.queue") this.data = e.detail;
    if (e.type == "app.current") this.current = e.detail.file;
  }
  search(e) {
    console.log("search", e);
  }
  play_now(track) {
    console.log("playnow0", track);
    library.api.play_id(track.id);
  }
  delete(track) {
    console.log("delete", track);
    library.api.delete_from_queue(track.id);
  }
  update_order(ids, newidx) {
    library.api.post("/queue/move", { ids, to_index: newidx });
  }
  render_item(el) {
    let artist = el.artist;
    let artwork = library.api.artwork(el);
    if (el.is_radio) {
      artist = library.station_name(el.file);
      artwork = library.api.artwork_radio(artist);
    }
    return html`<li
      ?active=${this.current == el.file}
      data-id=${el.id}
      data-track=${el.file}
    >
      <header>
        <img loading="lazy" src=${artwork} @error=${this.image_loaderror} />
      </header>
      <main>
        <strong title=${el.title}>${el.title}</strong
        ><span class="artist" title=${artist}>${artist}</span>
      </main>

      <footer>
        <pi-btn flat @click=${() => this.play_now(el)}>${play_icon}</pi-btn>
        <pi-btn flat @click=${() => this.delete(el)}>${trash_icon}</pi-btn>
      </footer>
    </li>`;
  }
  render() {
    console.log("+++ try queue", this.data);
    if (!this.data) return "";
    console.log("+++ render queue", this.data);
    // if (!this.data) return "";

    return html`<h1>${this.data.length} items</h1>
      <ul class="draggable">
        ${this.data.map((el) => {
          return this.render_item(el);
        })}
      </ul>`;
  }
  xxcreateRenderRoot() {
    return this;
  }

  // https://stackoverflow.com/questions/704561/ns-binding-aborted-shown-in-firefox-with-httpfox
  // http://localhost/api/image/artwork?name=Amazon MP3/Judith Holofernes feat Maeckes/Analogpunk 2 0/01-01- Analogpunk 2 0.mp3&hash=undefined
  // http://localhost/api/image/artwork?name=Amazon MP3/Judith Holofernes feat Maeckes/Analogpunk 2 0/01-01- Analogpunk 2 0.mp3&hash=
  // http://localhost/api/image/artwork?name=Music%2FMedia.localized%2FMusic%2FUnknown+Artist%2FUnknown+Album%2FPeter+Gabriel+-+In+Your+Eyes.mp3&hash=undefined
  // http://localhost/api/image/artwork?name=Music/Media.localized/Music/Unknown Artist/Unknown Album/Peter Gabriel - In Your Eyes.mp3&hash=
  firstUpdated() {
    console.log("+++ first updated", this.data);
    /* 
      List elements have important part marker nodes around them
      which do *not* move when items are dragged with Sortable.
      This can cause the Sortable ordering and Lit's ordering
      to get out of sync.
      To address this, whenever Sortable moves an item, ensure
      the item's markers move with it and this requires understanding how Lit renders parts.
      
      For a list, Lit renders DOM as follows:
      <parent>
      <!-- list start -->
        <!-- item 0 start --> item <!-- item 0 end -->
        <!-- item 1 start --> item <!-- item 1 end -->
        <!-- item N start --> item 
      <!-- list end -->
      </parent>
      
      Importantly Lit does *not* have a last item part marker and this must be accounted for.
    */
    let before; // Sortable.create
    let s = new Sortable(this.renderRoot?.querySelector(".draggable"), {
      animation: 150,
      multiDrag: true, // Enable multi-drag
      selectedClass: "selected", // The class applied to the selected items
      fallbackTolerance: 3, // So that we can select items on mobile
      ghostClass: "ghost",
      onStart: (e) => {
        before = e.item.previousSibling;
      },
      onEnd: (e) => {
        // put the item back
        console.log("drop-end", e.oldIndex, e.newIndex, e);
        before.after(e.item);
        this.data.splice(e.newIndex, 0, this.data.splice(e.oldIndex, 1)[0]);
        this.requestUpdate();
      },
      onUpdate: (e) => {
        console.log("drop-update", e.oldIndex, e.newIndex, e.item.dataset.id);
        let items = e.items.length ? e.items : [e.item];
        this.update_order(
          items.map((i) => i.dataset.id),
          e.newIndex
        );
      },
    });
  }
}

window.customElements.define("mo-queue", Queue);
