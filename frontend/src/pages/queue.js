import PageElement from "../lib/page_element.js";
// import DeployWidget from "../widgets/deploy.js";

export default class Queue extends PageElement {
  get title() {
    return "Music";
  }
}

window.customElements.define("queue-page", Queue);
