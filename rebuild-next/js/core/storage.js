/**
 * storage.js — thin localStorage wrapper with JSON support.
 * Falls back gracefully if localStorage is unavailable.
 */

const PREFIX = 'aishow:';

function key(k) { return PREFIX + k; }

export const storage = {
  get(k, fallback = null) {
    try {
      const raw = localStorage.getItem(key(k));
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(k, value) {
    try {
      localStorage.setItem(key(k), JSON.stringify(value));
    } catch { /* quota exceeded — silently ignore */ }
  },

  remove(k) {
    try { localStorage.removeItem(key(k)); } catch { }
  },

  clear() {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(PREFIX))
        .forEach(k => localStorage.removeItem(k));
    } catch { }
  },
};
