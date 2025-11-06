import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * A Svelte store that persists its value in localStorage.
 * @template T
 * @param {string} key The key to use for localStorage.
 * @param {T} initialValue The initial value of the store.
 * @returns {import('svelte/store').Writable<T>}
 */
export function persistentStore(key, initialValue) {
  let storedValue = initialValue;

  if (browser) {
    const stored = localStorage.getItem(key);
    if (stored) {
      storedValue = JSON.parse(stored);
    }
  }

  const store = writable(storedValue);

  if (browser) {
    store.subscribe(value => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}
