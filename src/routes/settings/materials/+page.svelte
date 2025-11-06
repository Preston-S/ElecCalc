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
    <a href="../" class="back-link">&larr; Back to Settings</a>
    <h1>Manage Materials</h1>
  </header>

  <main>
    <div class="section">
      <h2>Add New Material</h2>
      <form class="add-form" on:submit|preventDefault={addItem}>
        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" bind:value={newItemName} placeholder="e.g., 1-Gang Box" />
        </div>
        <hr />
        <div class="form-group">
          <label for="price">Price</label>
          <input id="price" type="number" step="0.01" bind:value={newItemPrice} placeholder="e.g., 2.50" />
        </div>
        <button type="submit" class="add-btn">Add Material</button>
      </form>
    </div>

    <div class="section">
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
  </main>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }
  header {
    padding: 1rem 0.5rem;
  }
  h1, h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  h2 {
      font-size: 1rem;
      color: #888888;
      text-transform: uppercase;
      margin-bottom: 1rem;
  }
  .back-link {
    display: block;
    color: #888888;
    text-decoration: none;
    margin-bottom: 1rem;
  }
  .section {
      margin-top: 2rem;
  }
  .add-form {
      background-color: #1c1c1c;
      border-radius: 0.75rem;
      border: 1px solid #2f2f2f;
      padding: 0 1rem;
  }
  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  hr {
      border: none;
      border-top: 1px solid #2f2f2f;
      margin: 0;
  }
  label {
    font-size: 1rem;
    font-weight: 500;
  }
  input {
    font-size: 1rem;
    background-color: transparent;
    border: none;
    color: #f0f0f0;
    text-align: right;
  }
  input:focus { outline: none; }
  .add-btn {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid #2f2f2f;
    background-color: #f0f0f0;
    color: #101010;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin: 1rem 0;
  }

  .materials-list {
    list-style: none;
    padding: 0;
    background-color: #1c1c1c;
    border-radius: 0.75rem;
    border: 1px solid #2f2f2f;
  }

  .materials-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #2f2f2f;
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
      border: 1px solid #f0f0f0;
      background-color: #101010;
      color: #f0f0f0;
  }
  .price-input { width: 80px; }

  .edit-btn, .save-btn, .cancel-btn, .delete-btn {
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      color: #101010;
      font-weight: 600;
  }
  .edit-btn { background-color: #888888; }
  .save-btn { background-color: #f0f0f0; }
  .cancel-btn { background-color: #2f2f2f; color: #f0f0f0; }
  .delete-btn { background-color: transparent; color: #888888; }
</style>