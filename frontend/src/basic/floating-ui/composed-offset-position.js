// import { isContainingBlock } from '@floating-ui/utils/dom';
let isContainingBlock = null;

function offsetParent(element) {
  return offsetParentPolyfill(element);
}
function offsetTop(element) {
  return offsetTopLeftPolyfill(element, "offsetTop");
}
function offsetLeft(element) {
  return offsetTopLeftPolyfill(element, "offsetLeft");
}
function flatTreeParent(element) {
  if (element.assignedSlot) {
    return element.assignedSlot;
  }
  if (element.parentNode instanceof ShadowRoot) {
    return element.parentNode.host;
  }
  return element.parentNode;
}
function ancestorTreeScopes(element) {
  const scopes = new Set();
  let currentScope = element.getRootNode();
  while (currentScope) {
    scopes.add(currentScope);
    currentScope = currentScope.parentNode
      ? currentScope.parentNode.getRootNode()
      : null;
  }
  return scopes;
}
function offsetParentPolyfill(element) {
  // Do an initial walk to check for display:none ancestors.
  for (let ancestor = element; ancestor; ancestor = flatTreeParent(ancestor)) {
    if (!(ancestor instanceof Element)) {
      continue;
    }
    if (getComputedStyle(ancestor).display === "none") {
      return null;
    }
  }
  for (
    let ancestor = flatTreeParent(element);
    ancestor;
    ancestor = flatTreeParent(ancestor)
  ) {
    if (!(ancestor instanceof Element)) {
      continue;
    }
    const style = getComputedStyle(ancestor);
    // Display:contents nodes aren't in the layout tree, so they should be skipped.
    if (style.display === "contents") {
      continue;
    }
    if (style.position !== "static" || isContainingBlock(style)) {
      return ancestor;
    }
    if (ancestor.tagName === "BODY") {
      return ancestor;
    }
  }
  return null;
}
function offsetTopLeftPolyfill(element, offsetTopOrLeft) {
  let value = element[offsetTopOrLeft];
  let nextOffsetParent = offsetParentPolyfill(element);
  const scopes = ancestorTreeScopes(element);
  while (nextOffsetParent && !scopes.has(nextOffsetParent.getRootNode())) {
    value -= nextOffsetParent[offsetTopOrLeft];
    nextOffsetParent = offsetParentPolyfill(nextOffsetParent);
  }
  return value;
}
function setup() {
  isContainingBlock = window.FloatingUIUtilsDOM.isContainingBlock;
}
export { offsetLeft, offsetParent, offsetTop, setup };
