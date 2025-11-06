import { writable } from 'svelte/store';

// This will hold the list of items in the current estimate
export const estimateItems = writable([]);

// This will hold the labor rate
export const laborRate = writable(100); // Default to $100/hour

// This will hold the tax rate
export const taxRate = writable(0.08); // Default to 8%
