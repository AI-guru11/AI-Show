/**
 * state.js — minimal reactive store.
 * Single source of truth for app-level state.
 * Screens derive their own local state.
 */

const _listeners = new Map();
let _state = {
  currentRoute: '/',
  currentParams: {},
  playSession: null,   // { challengeId, answers, startedAt }
};

/** Read current state (returns shallow copy) */
export function getState() {
  return { ..._state };
}

/** Update state and notify listeners */
export function setState(partial) {
  _state = { ..._state, ...partial };
  const keys = Object.keys(partial);
  for (const key of keys) {
    (_listeners.get(key) || []).forEach(fn => fn(_state[key], _state));
  }
  (_listeners.get('*') || []).forEach(fn => fn(_state));
}

/** Subscribe to a specific key or '*' for all changes */
export function subscribe(key, fn) {
  if (!_listeners.has(key)) _listeners.set(key, []);
  _listeners.get(key).push(fn);
  return () => {
    const arr = _listeners.get(key);
    if (arr) _listeners.set(key, arr.filter(f => f !== fn));
  };
}

/** Convenience: start a play session */
export function startPlaySession(challengeId) {
  setState({
    playSession: { challengeId, answers: [], startedAt: Date.now() },
  });
}

/** Convenience: record an answer */
export function recordAnswer(questionIndex, answerId) {
  const s = _state.playSession;
  if (!s) return;
  const answers = [...s.answers];
  answers[questionIndex] = answerId;
  setState({ playSession: { ...s, answers } });
}
