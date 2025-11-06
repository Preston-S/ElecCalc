<script>
  import { page } from '$app/stores';
  import { estimateHistory } from '$lib/stores.js';

  let estimate = null;

  // Find the estimate from the history store based on the URL parameter
  $: {
    const estimateId = parseInt($page.params.id, 10);
    estimate = $estimateHistory.find(e => e.id === estimateId);
  }

  function printReceipt() {
    window.print();
  }
</script>

<svelte:head>
  <title>View Estimate: {estimate ? estimate.name : ''}</title>
</svelte:head>

<div class="container">
  {#if estimate}
    <header class="no-print">
      <a href="/ElecCalc/history" class="back-link">&larr; Back to History</a>
      <h1>{estimate.name}</h1>
      <p class="date">Saved on {new Date(estimate.date).toLocaleDateString()}</p>
    </header>

    <div class="receipt">
      <div class="receipt-body">
        <h3>Itemized Breakdown</h3>
        {#each estimate.items as item}
          <div class="receipt-item">
            <span>{item.name} (x{item.quantity})</span>
            <span>{(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
        {/each}
      </div>

      <div class="receipt-summary">
          <h3>Summary</h3>
          <div class="receipt-item">
            <span>Subtotal</span>
            <span>{estimate.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
          <div class="receipt-item">
            <span>Labor ({estimate.hours} hrs)</span>
            <span>{estimate.laborCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
          <div class="receipt-item">
            <span>Tax</span>
            <span>{estimate.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
          <hr>
          <div class="receipt-item total">
            <span>Total</span>
            <span>{estimate.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
      </div>
    </div>

    <button on:click={printReceipt} class="print-button no-print">
      Print or Save as PDF
    </button>
  {:else}
    <p class="error-message">Estimate not found.</p>
  {/if}
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  header {
      margin-bottom: 1.5rem;
  }
  .back-link {
    display: block;
    color: #888888;
    text-decoration: none;
    margin-bottom: 1rem;
  }
  h1 {
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
  }
  .date {
      color: #888888;
      margin-top: 0.25rem;
  }
  .receipt {
    background-color: #1c1c1c;
    padding: 2rem;
    border-radius: 0.5rem;
    border: 1px solid #2f2f2f;
  }
  h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      border-bottom: 1px solid #2f2f2f;
      padding-bottom: 0.5rem;
  }
  .receipt-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .receipt-body, .receipt-summary {
      margin-bottom: 1.5rem;
  }
  .total {
    font-weight: bold;
    font-size: 1.1rem;
  }
  hr {
    border: none;
    border-top: 1px solid #2f2f2f;
    margin: 1rem 0;
  }
  .print-button {
    width: 100%;
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: #374151;
    color: #f0f0f0;
    margin-top: 2rem;
  }
  .error-message {
      text-align: center;
      color: #ef4444;
  }

  @media print {
    .no-print { display: none; }
    body { background-color: white; color: black; }
    .receipt { 
        position: absolute; left: 0; top: 0; width: 100%; 
        max-width: 100%; border-radius: 0; box-shadow: none; 
        border: none; background-color: white; color: black;
    }
    h1, h3, .date, .receipt-item, .total { color: black; }
    hr { border-color: #ccc; }
  }
</style>
