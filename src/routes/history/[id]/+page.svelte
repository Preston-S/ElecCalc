<script>
  import { page } from '$app/stores';
  import { estimateHistory } from '$lib/stores.js';
  import PageHeader from '$lib/components/PageHeader.svelte';

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

<PageHeader title={estimate ? estimate.name : 'Estimate Details'} backHref="/ElecCalc/history" />

<div class="container">
  {#if estimate}
    <div class="receipt-details">
      <p class="date">Saved on {new Date(estimate.date).toLocaleDateString()}</p>

      <div class="section">
        <h2>Itemized Breakdown</h2>
        {#if estimate.items.length > 0}
          <ul class="item-list">
            {#each estimate.items as item}
              <li>
                <span>{item.name} (x{item.quantity})</span>
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
          <span>Labor ({estimate.hours} hrs)</span>
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
    padding: 0 1rem 1rem 1rem; /* Adjusted padding */
  }

  .date {
    color: #bdbdbd;
    margin-top: -0.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 0.9rem;
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

  .print-button {
    width: 100%;
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: #374151;
    color: #f0f0f0;
    margin-top: 1.5rem;
  }
  .print-button:hover:not(:disabled) {
    background-color: #4b5563;
  }

  .error-message {
    text-align: center;
    color: #ef4444;
    padding: 2rem 0;
  }

  @media (max-width: 600px) {
    .container { padding: 0 0.75rem 0.75rem 0.75rem; } /* Adjusted padding for mobile */
    .receipt-details {
      padding: 1rem;
    }
    .date {
      margin-bottom: 1rem;
    }
  }

  @media print {
    .no-print { display: none; }
    .receipt-details {
        position: absolute; left: 0; top: 0; width: 100%;
        max-width: 100%; border-radius: 0; box-shadow: none;
        border: none; background-color: white; color: black;
        padding: 0;
    }
    h2, .date, .item-list li span, .summary-item span, .summary-item.total span { color: black; }
    hr { border-color: #ccc; }
  }
</style>
