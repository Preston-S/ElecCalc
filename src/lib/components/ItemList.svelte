<script>
  import { getContext } from 'svelte';
  const estimateItems = getContext('estimateItems');
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  function removeItem(id) {
    $estimateItems = $estimateItems.filter(item => item.id !== id);
  }
</script>

<div class="item-list-container">
  {#if $estimateItems.length === 0}
    <p class="empty-message">No items added yet.</p>
  {:else}
    <ul class="item-list">
      <li class="list-header">
        <span>Item</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
        <span></span>
      </li>
      {#each $estimateItems as item (item.id)}
        <li class="list-item" in:fade|local out:fade|local animate:flip={{duration: 300}}>
          <span class="item-name">{item.name}</span>
          <span class="item-qty">{item.quantity}</span>
          <span class="item-price">{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          <span class="item-total">{(item.quantity * item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          <button class="remove-btn" on:click={() => removeItem(item.id)}>
            &times;
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .item-list-container {
    margin-top: 1.5rem;
  }

  .empty-message {
    text-align: center;
    color: #9ca3af;
    font-style: italic;
  }

  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .list-header, .list-item {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #374151;
  }

  .list-header {
    font-weight: 600;
    color: #9ca3af;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .list-item {
    background-color: #1f2937;
  }

  .item-name {
    font-weight: 500;
  }

  .item-qty, .item-price, .item-total {
    text-align: right;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #ef4444;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0 0.5rem;
    line-height: 1;
    transition: color 0.2s;
  }

  .remove-btn:hover {
    color: #f87171;
  }
</style>