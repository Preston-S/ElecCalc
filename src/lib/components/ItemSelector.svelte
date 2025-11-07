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
    {#if $materials.length === 0}
        <option disabled selected>Add materials in settings</option>
    {/if}
    {#each $materials as material (material.id)}
      <option value={material.id}>{material.name}</option>
    {/each}
  </select>
  <input type="number" min="1" bind:value={quantity} />
  <button on:click={addItem}>Add</button>
</div>

<style>
  .item-selector {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: 100%;
  }

  select, input {
    background-color: #1c1c1c;
    border: 1px solid #2f2f2f;
    color: #f0f0f0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  select {
    flex-grow: 1;
  }

  input {
    width: 70px;
  }

  button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #f0f0f0;
    color: #101010;
    font-weight: 600;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .item-selector {
      gap: 0.5rem;
    }

    select {
      flex-grow: 1;
      font-size: 0.9rem;
      padding: 0.6rem;
    }

    input {
      width: 60px; /* Smaller fixed width for mobile */
      font-size: 0.9rem;
      padding: 0.6rem;
      text-align: center;
    }

    button {
      padding: 0.6rem 1rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 400px) {
    .item-selector {
      flex-direction: column;
      gap: 0.75rem;
    }

    select, input, button {
      width: 100%;
      font-size: 0.9rem;
      padding: 0.6rem;
      text-align: center;
    }
  }
</style>