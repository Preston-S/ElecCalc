import { persistentStore } from './persistentStore';
import { writable } from 'svelte/store';

// Default items to seed the store if it's empty
const defaultItems = [
  { id: 1, name: '14/2 Romex (per foot)', price: 0.78 },
  { id: 2, name: '12/2 Romex (per foot)', price: 0.92 },
  { id: 3, name: '1-Gang Plastic Box', price: 2.50 },
  { id: 4, name: '2-Gang Plastic Box', price: 3.25 },
  { id: 5, name: 'Standard Outlet', price: 3.50 },
  { id: 6, name: 'GFCI Outlet', price: 21.00 },
  { id: 7, name: 'Single-Pole Switch', price: 4.25 },
  { id: 8, name: '3-Way Switch', price: 7.50 },
  { id: 9, name: '1/2" Staple', price: 0.15 },
  { id: 10, name: 'Wire Nut (each)', price: 0.10 },
  { id: 11, name: '6" Recessed Can Light', price: 45.00 },
  { id: 12, name: 'LED Trim Kit', price: 25.00 }
];

// This will hold the labor rate, persisted in localStorage
export const laborRate = persistentStore('laborRate', 100); // Default to $100/hour

// This will hold the tax rate, persisted in localStorage
export const taxRate = persistentStore('taxRate', 0.08); // Default to 8%

// This will hold the list of materials, persisted in localStorage
export const materials = persistentStore('materials', defaultItems);

// This will hold an array of saved estimates
export const estimateHistory = persistentStore('estimateHistory', []);

