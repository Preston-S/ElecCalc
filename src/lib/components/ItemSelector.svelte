<script>
  import { getContext } from 'svelte';
  import { materials } from '$lib/stores.js';

  const estimateItems = getContext('estimateItems');

  let selectedItemId = $materials.length > 0 ? $materials[0].id : null;
  let quantity = 1;

  function addItem() {
    if (!selectedItemId) {
      alert('Please select an item.');
      return;
    }
    const selectedItem = $materials.find(item => item.id === selectedItemId);
    if (!selectedItem) return;

    const existingItemIndex = $estimateItems.findIndex(item => item.id === selectedItemId);

    if (existingItemIndex > -1) {
      $estimateItems[existingItemIndex].quantity += quantity;
      $estimateItems = [...$estimateItems];
    } else {
      $estimateItems = [...$estimateItems, { ...selectedItem, quantity }];
    }

    quantity = 1;
  }
</script>

<div class="item-selector">
  <select bind:value={selectedItemId}>
    {#each $materials as material (material.id)}
      <option value={material.id}>{material.name}</option>
    {/each}
  </select>
  <input type="number" min="1" bind:value={quantity} />
  <button on:click={addItem}>Add Item</button>
</div>

<style>
  .item-selector {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  select, input, button {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #374151;
    background-color: #374151;
    color: #e5e7eb;
  }

  select:focus, input:focus {
    outline: 2px solid #38bdf8;
    outline-offset: -1px;
    border-color: #38bdf8;
  }

  select {
    flex-grow: 1;
  }

  input {
    width: 80px;
  }

  button {
    background-color: #38bdf8;
    color: #111827;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #7dd3fc;
  }
</style>