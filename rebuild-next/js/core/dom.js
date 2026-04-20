/**
 * dom.js — lightweight DOM helpers
 * Never import the DOM directly in screens — use these.
 */

/** Query single element */
export const $ = (selector, root = document) =>
  root.querySelector(selector);

/** Query all elements */
export const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

/** Create element with optional attrs and children */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k.startsWith('on') && typeof v === 'function')
      node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') node.append(document.createTextNode(child));
    else if (child) node.append(child);
  }
  return node;
}

/** Set innerHTML safely (no user-supplied HTML here) */
export function setHTML(node, html) {
  node.innerHTML = html;
}

/** Empty a container */
export function empty(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/** Navigate via hash router */
export function navigate(path) {
  window.location.hash = path;
}

/** Delegate event on container */
export function delegate(root, eventType, selector, handler) {
  root.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if (target && root.contains(target)) handler(e, target);
  });
}
