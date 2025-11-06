<script>
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import { goto } from '$app/navigation';
  import ItemSelector from '$lib/components/ItemSelector.svelte';
  import ItemList from '$lib/components/ItemList.svelte';
  import { laborRate, taxRate } from '$lib/stores.js';

  // Create local stores for this estimate session
  const estimateItems = writable([]);
  const estimatedHours = writable(0);
  setContext('estimateItems', estimateItems);

  let subtotal = 0;
  let laborCost = 0;
  let tax = 0;
  let total = 0;

  // Reactive calculation
  $: {
    subtotal = $estimateItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    laborCost = $estimatedHours * $laborRate;
    tax = (subtotal + laborCost) * $taxRate;
    total = subtotal + laborCost + tax;
  }

  function reviewReceipt() {
    goto('receipt', { state: {
      items: $estimateItems,
      subtotal,
      laborCost,
      tax,
      total,
      hours: $estimatedHours
    }});
  }
</script>

<svelte:head>
  <title>Create Estimate</title>
</svelte:head>

<div class="container">
  <header>
    <a href="../" class="back-link">&larr; Back to Settings</a>
    <h1>Create Estimate</h1>
  </header>

  <main>
    <div class="card">
      <h2>Job Details</h2>
      <div class="form-group">
        <label for="hours">Estimated Labor Hours</label>
        <input id="hours" type="number" step="0.5" bind:value={$estimatedHours} />
      </div>
    </div>

    <div class="card">
      <h2>Add Items</h2>
      <ItemSelector />
    </div>

    <div class="card">
      <h2>Current Items</h2>
      <ItemList />
    </div>

    <div class="card summary">
      <h2>Running Total</h2>
      <div class="summary-item">
        <span>Subtotal</span>
        <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <div class="summary-item total">
        <span>Total (incl. labor & tax)</span>
        <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
    </div>

    <button class="cta-button" on:click={reviewReceipt} disabled={$estimateItems.length === 0}>
      Review Final Receipt
    </button>
  </main>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  @media (max-width: 600px) {
    .container {
      padding: 1rem;
    }
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

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #374151;
    background-color: #374151;
    color: #e5e7eb;
    box-sizing: border-box;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
  }

  .total {
    font-weight: 600;
    font-size: 1.25rem;
  }

  .cta-button {
    font-size: 1.25rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #38bdf8;
    color: #111827;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
  }

  .cta-button:hover {
    background-color: #7dd3fc;
  }

  .cta-button:disabled {
    background-color: #374151;
    cursor: not-allowed;
  }
</style>