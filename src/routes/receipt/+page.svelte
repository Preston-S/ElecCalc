<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { estimateHistory } from '$lib/stores.js';

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
    if ($page.state.items) {
      estimate = $page.state;
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

<div class="container">
  <header class="no-print">
    <a href="../estimate" class="back-link">&larr; Back to Estimate</a>
    <h1>Final Receipt</h1>
  </header>

  <div class="receipt">
    <!-- ... receipt content ... -->
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
  /* ... existing styles ... */
  .actions {
    margin-top: 2rem;
  }
  .save-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  input[type="text"] {
    flex-grow: 1;
    background-color: #2f2f2f;
    border: 1px solid #444;
    color: #f0f0f0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 1rem;
  }
  .save-button, .print-button {
    width: 100%;
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .save-button {
    background-color: #38bdf8;
    color: #111827;
  }
  .print-button {
      background-color: #374151;
      color: #f0f0f0;
  }

  @media print {
    .no-print {
      display: none;
    }
    /* ... other print styles ... */
  }
</style>