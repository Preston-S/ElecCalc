<script>
  import { getContext } from 'svelte';
  import { flip } from 'svelte/animate';
  import { fade } from 'svelte/transition';

  const estimateItems = getContext('estimateItems');

  function removeItem(id) {
    $estimateItems = $estimateItems.filter(item => item.id !== id);
  }
</script>

<div class="item-list-container">
  {#if $estimateItems.length === 0}
    <p class="empty-message">No items added yet.</p>
  {:else}
    <ul class="item-list">
      {#each $estimateItems as item (item.id)}
        <li in:fade|local out:fade|local animate:flip={{duration: 300}}>
          <div class="item-details">
            <span class="item-name">{item.name}</span>
            <span class="item-qty">{item.quantity} &times; {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
          <div class="item-actions">
            <span class="item-total">{(item.quantity * item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            <button class="remove-btn" on:click={() => removeItem(item.id)}>&times;</button>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .item-list-container {
    margin-top: 1rem;
  }

  .empty-message {
    text-align: center;
    color: #888888;
    padding: 2rem 0;
  }

  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #2f2f2f;
  }

  li:last-child {
      border-bottom: none;
  }

  .item-name {
    font-weight: 500;
  }

  .item-qty {
    font-size: 0.9rem;
    color: #888888;
  }

  .item-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
  }

  .item-total {
      font-weight: 500;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #888888;
    font-size: 1.75rem;
    cursor: pointer;
    padding: 0 0.5rem;
    line-height: 1;
  }
</style>