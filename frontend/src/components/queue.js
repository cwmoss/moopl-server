import { LitElement, css, html, svg } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";
import Sortable from "../../vendor/sortable.complete.esm.js";
// console.log("bootstrap import", cssvars);

let play_icon = svg`<svg height="24px" viewBox="0 0 24 24" width="24px" fill="black"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>`;
let trash_icon = svg`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
let heart_icon = svg`<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default class Queue extends LitElement {
  static properties = {
    keys: { type: Array },
    data: { type: Array },
  };

  async connectedCallback() {
    super.connectedCallback();
    this.data = [];
    this.data = await library.queue();
    //this.data = library.search("touch");
    console.log("filtered:", this.data);
    document.addEventListener("app.queue", this);
  }
  static styles = [
    // cssvars,
    css`
      :host {
        display: block;
        --border-color: #ccc;
        --image-size: 57px;
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
        width: 410px;
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
        width: 68px;
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
    let artwork = library.api.artwork(el.file, el.artwork_file);
    if (el.is_radio) {
      artist = library.station_name(el.file);
      artwork = library.api.artwork_radio(artist);
    }
    return html`<li data-id=${el.id} data-track=${el.file}>
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

    return html`${this.data.length} tracks
      <input type="search" @input=${this.search} />
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
