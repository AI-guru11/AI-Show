export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}
export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}
export function createEl(tag, className, content) {
  const el = document.createElement(tag);
  if (className) {
    el.className = className;
  }
  if (content !== undefined && content !== null) {
    el.textContent = content;
  }
  return el;
}
