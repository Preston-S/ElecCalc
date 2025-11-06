<script>
  import { materials } from '$lib/stores.js';
  import { slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  // State for adding a new item
  let newItemName = '';
  let newItemPrice = null;

  // State for editing an existing item
  let editingId = null;
  let editName = '';
  let editPrice = null;

  function addItem() {
    if (!newItemName || !newItemPrice || newItemPrice <= 0) {
      alert('Please enter a valid name and price.');
      return;
    }
    const newItem = { id: Date.now(), name: newItemName, price: newItemPrice };
    $materials = [...$materials, newItem];
    newItemName = '';
    newItemPrice = null;
  }

  function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      $materials = $materials.filter(item => item.id !== id);
    }
  }

  function startEditing(item) {
    editingId = item.id;
    editName = item.name;
    editPrice = item.price;
  }

  function cancelEditing() {
    editingId = null;
  }

  function saveEdit(id) {
    if (!editName || !editPrice || editPrice <= 0) {
      alert('Please enter a valid name and price.');
      return;
    }
    $materials = $materials.map(item => 
      item.id === id ? { ...item, name: editName, price: editPrice } : item
    );
    editingId = null;
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
          <li animate:flip={{duration: 300}}>
            {#if editingId === material.id}
              <!-- Edit State -->
              <div class="edit-form">
                <input type="text" bind:value={editName} class="edit-input" />
                <input type="number" step="0.01" bind:value={editPrice} class="edit-input price-input" />
              </div>
              <div class="item-actions">
                <button class="save-btn" on:click={() => saveEdit(material.id)}>Save</button>
                <button class="cancel-btn" on:click={cancelEditing}>Cancel</button>
              </div>
            {:else}
              <!-- Default State -->
              <div class="item-details">
                <span class="item-name">{material.name}</span>
                <span class="item-price">{material.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              </div>
              <div class="item-actions">
                <button class="edit-btn" on:click={() => startEditing(material)}>Edit</button>
                <button class="delete-btn" on:click={() => deleteItem(material.id)}>Delete</button>
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    </div>

    <div class="card">
      <h2>Add New Material</h2>
      <form class="add-form" on:submit|preventDefault={addItem}>
        <div class="form-group">
          <label for="name">Material Name</label>
          <input id="name" type="text" bind:value={newItemName} placeholder="e.g., 1-Gang Box" />
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input id="price" type="number" step="0.01" bind:value={newItemPrice} placeholder="e.g., 2.50" />
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
    gap: 1rem;
  }

  .materials-list li:last-child {
    border-bottom: none;
  }

  .item-details, .edit-form {
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 1rem;
  }

  .item-name {
    font-weight: 500;
  }

  .item-price {
    color: #9ca3af;
    margin-left: auto;
    padding-right: 1rem;
  }

  .item-actions {
      display: flex;
      gap: 0.5rem;
  }

  .edit-input {
      font-size: 1rem;
      padding: 0.5rem;
      border-radius: 0.375rem;
      border: 1px solid #38bdf8;
      background-color: #111827;
      color: #e5e7eb;
  }
  .price-input { width: 80px; }

  .edit-btn, .save-btn, .cancel-btn, .delete-btn {
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      color: white;
  }
  .edit-btn { background-color: #3b82f6; }
  .save-btn { background-color: #22c55e; }
  .cancel-btn { background-color: #6b7280; }
  .delete-btn { background-color: #ef4444; }

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