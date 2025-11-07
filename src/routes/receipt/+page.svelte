<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { estimateHistory } from '$lib/stores.js';
  import PageHeader from '$lib/components/PageHeader.svelte';

  let estimate = {
    items: [],
    subtotal: 0,
    laborCost: 0,
    tax: 0,
    total: 0,
    hours: 0
  };
  let estimateName = '';

  onMount(() => {
    if ($page.state && $page.state.items) {
      estimate = $page.state;
    } else if (history.state && history.state.items) {
      // Fallback for direct navigation or page refresh in some browsers
      estimate = history.state;
    }
  });

  function printReceipt() {
    window.print();
  }

  function saveEstimate() {
    if (!estimateName.trim()) {
      alert('Please enter a name for the estimate.');
      return;
    }
    const newEstimate = {
      id: Date.now(),
      name: estimateName,
      date: new Date().toISOString(),
      ...estimate
    };
    $estimateHistory = [newEstimate, ...$estimateHistory];
    window.location.href = '/ElecCalc/history'; // Go to history page
  }
</script>

<svelte:head>
  <title>Final Receipt</title>
</svelte:head>

<PageHeader title="Final Receipt" backHref="/estimate" />

<div class="container">
  <div class="receipt-details">
    <div class="section">
      <h2>Items</h2>
      {#if estimate.items.length > 0}
        <ul class="item-list">
          {#each estimate.items as item (item.id)}
            <li>
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p>No items in this estimate.</p>
      {/if}
    </div>

    <hr />

    <div class="section">
      <h2>Summary</h2>
      <div class="summary-item">
        <span>Subtotal</span>
        <span>{estimate.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <div class="summary-item">
        <span>Labor ({estimate.hours} hours)</span>
        <span>{estimate.laborCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <div class="summary-item">
        <span>Tax</span>
        <span>{estimate.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <div class="summary-item total">
        <span>Total</span>
        <span>{estimate.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
    </div>
  </div>

  <div class="actions no-print">
    <div class="save-section">
      <input type="text" bind:value={estimateName} placeholder="Name this estimate (e.g., Kitchen Reno)" />
      <button on:click={saveEstimate} class="save-button">Save Estimate</button>
    </div>
    <button on:click={printReceipt} class="print-button">
      Print or Save as PDF
    </button>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  .receipt-details {
    background-color: #1a1a1a;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .section {
    margin-bottom: 1rem;
  }

  .section h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f0f0f0;
  }

  .item-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .item-list li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #2f2f2f;
  }

  .item-list li:last-child {
    border-bottom: none;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .summary-item span:first-child {
    color: #bdbdbd;
  }

  .summary-item.total {
    font-size: 1.2rem;
    font-weight: 700;
    color: #f0f0f0;
    border-top: 1px solid #2f2f2f;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid #2f2f2f;
    margin: 1.5rem 0;
  }

  .actions {
    margin-top: 2rem;
  }
  .save-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-direction: column; /* Stack on mobile */
  }
  input[type="text"] {
    flex-grow: 1;
    background-color: #0f0f0f;
    border: 1px solid #2f2f2f;
    color: #f0f0f0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
  input[type="text"]:focus {
    outline: none;
    border-color: #38bdf8;
  }
  input[type="text"]::placeholder {
    color: #555;
  }
  .save-button, .print-button {
    width: 100%;
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: none;
    font-weight: 60    0;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .save-button {
    background-color: #38bdf8;
    color: #101010;
  }
  .save-button:hover:not(:disabled) {
    background-color: #0ea5e9;
  }
  .print-button {
      background-color: #374151;
      color: #f0f0f0;
  }
  .print-button:hover:not(:disabled) {
    background-color: #4b5563;
  }

  @media (min-width: 600px) {
    .save-section {
      flex-direction: row; /* Row on desktop */
    }
  }

  @media print {
    .no-print {
      display: none;
    }
    .container {
      max-width: none;
      margin: 0;
      padding: 0;
    }
    .receipt-details {
      border: none;
      border-radius: 0;
      padding: 0;
      background-color: transparent;
    }
    /* ... other print styles ... */
  }
</style>