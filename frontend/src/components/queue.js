import { LitElement, css, html } from "../../vendor/lit-core.min.js";
//import cssvars from "./variables.css.js";
import library from "../lib/library.js";
// import api from "../lib/api.js";
import Sortable from "../../vendor/sortable.complete.esm.js";
// console.log("bootstrap import", cssvars);

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
  }
  static styles = [
    // cssvars,
    css`
      :host {
        display: block;
        --border-color: #ccc;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        margin-bottom: 0.5rem;
      }
      .artist {
        display: block;
      }
      strong {
        font-weight: 900;
      }
      .selected {
        background: #999;
      }
      .ghost {
        opacity: 0.5;
      }
    `,
  ];
  search(e) {
    console.log("search", e);
  }
  play_now(track) {
    console.log("playnow0", track);
    library.api.play_now(track.file);
  }

  render_item(el) {
    return html`<li>
      <strong>${el.title}</strong
      ><span class="artist"
        >${el.artist}
        <button @click=${() => this.play_now(el)}>play</button></span
      >
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
    let before;
    Sortable.create(this.renderRoot?.querySelector(".draggable"), {
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
        before.after(e.item);
        this.data.splice(e.newIndex, 0, this.data.splice(e.oldIndex, 1)[0]);
        this.requestUpdate();
      },
    });
  }
}

window.customElements.define("mo-queue", Queue);
