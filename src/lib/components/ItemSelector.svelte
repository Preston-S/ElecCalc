<script>
  import { items } from '$lib/data/items.js';
  import { estimateItems } from '$lib/stores.js';

  let selectedItemId = items[0].id;
  let quantity = 1;

  function addItem() {
    const selectedItem = items.find(item => item.id === selectedItemId);
    if (!selectedItem) return;

    // Check if the item is already in the cart
    const existingItemIndex = $estimateItems.findIndex(item => item.id === selectedItemId);

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      $estimateItems[existingItemIndex].quantity += quantity;
      // Trigger reactivity by reassigning the array
      $estimateItems = [...$estimateItems];
    } else {
      // Add new item to the cart
      $estimateItems = [...$estimateItems, { ...selectedItem, quantity }];
    }

    // Reset inputs
    quantity = 1;
  }
</script>

<div class="item-selector">
  <select bind:value={selectedItemId}>
    {#each items as item (item.id)}
      <option value={item.id}>{item.name}</option>
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