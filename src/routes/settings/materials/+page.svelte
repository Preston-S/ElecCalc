<script>
  import { materials } from '$lib/stores.js';
  import { slide } from 'svelte/transition';

  let newItemName = '';
  let newItemPrice = 0;

  function addItem() {
    if (!newItemName || newItemPrice <= 0) {
      alert('Please enter a valid name and price.');
      return;
    }

    const newItem = {
      id: Date.now(), // Simple unique ID
      name: newItemName,
      price: newItemPrice
    };

    $materials = [...$materials, newItem];

    // Reset form
    newItemName = '';
    newItemPrice = 0;
  }

  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      $materials = $materials.filter(item => item.id !== id);
    }
  }
</script>

<svelte:head>
  <title>Manage Materials</title>
</svelte:head>

<div class="container">
  <header>
    <a href="/" class="back-link">&larr; Back to Settings</a>
    <h1>Manage Materials</h1>
  </header>

  <main>
    <div class="card">
      <h2>Current Materials</h2>
      <ul class="materials-list">
        {#each $materials as material (material.id)}
          <li in:slide|local>
            <div class="item-details">
              <span class="item-name">{material.name}</span>
              <span class="item-price">{material.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            </div>
            <button class="delete-btn" on:click={() => deleteItem(material.id)}>Delete</button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="card">
      <h2>Add New Material</h2>
      <form class="add-form" on:submit|preventDefault={addItem}>
        <div class="form-group">
          <label for="name">Material Name</label>
          <input id="name" type="text" bind:value={newItemName} />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input id="price" type="number" step="0.01" bind:value={newItemPrice} />
        </div>
        <button type="submit" class="add-btn">Add Material</button>
      </form>
    </div>
  </main>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .back-link {
    display: block;
    color: #38bdf8;
    text-decoration: none;
    margin-bottom: 1rem;
  }

  .card {
    background-color: #1f2937;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h1, h2 {
    color: #f9fafb;
    margin-top: 0;
  }

  .materials-list {
    list-style: none;
    padding: 0;
  }

  .materials-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #374151;
  }

  .materials-list li:last-child {
    border-bottom: none;
  }

  .item-name {
    font-weight: 500;
  }

  .item-price {
    color: #9ca3af;
  }

  .delete-btn {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }

  .add-form .form-group {
    margin-bottom: 1rem;
  }

  .add-form label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .add-form input {
    width: 100%;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #374151;
    background-color: #374151;
    color: #e5e7eb;
    box-sizing: border-box;
  }

  .add-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 1.125rem;
    background-color: #38bdf8;
    color: #111827;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    font-weight: 600;
  }
</style>