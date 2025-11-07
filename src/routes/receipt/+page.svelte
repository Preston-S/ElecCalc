<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { estimateHistory, companyInfo } from '$lib/stores.js';
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
    window.location.href = '/history'; // Go to history page
  }
</script>

<svelte:head>
  <title>Final Receipt</title>
</svelte:head>

<PageHeader title="Final Receipt" backHref="/" />

<div class="container">
  <div class="receipt-details">
    <header class="receipt-header">
      <div class="company-logo">
        <!-- You can replace this with your own logo -->
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L2 7l10 5l10-5l-10-5zm0 11.5L3.5 9L12 4.5L20.5 9L12 13.5z"/><path fill="currentColor" d="M2 17l10 5l10-5l-10-5l-10 5zm10 3.5L3.5 16L12 11.5L20.5 16L12 20.5z"/></svg>
      </div>
      <div class="company-details">
        <h2>{$companyInfo.name}</h2>
        <p>{$companyInfo.address1}<br>{$companyInfo.address2}</p>
        <p>{$companyInfo.phone} | {$companyInfo.email}</p>
      </div>
    </header>

    <div class="section">
      <h2>Items</h2>
      {#if estimate.items.length > 0}
        <table class="item-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {#each estimate.items as item (item.id)}
              <tr>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      {:else}
        <p>No items in this estimate.</p>
      {/if}
    </div>

    <div class="summary-section">
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

    <footer class="receipt-footer">
      <p>Thank you for your business!</p>
    </footer>
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
    background-color: #ffffff;
    border-radius: 0.5rem;
    padding: 2rem;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
  }

  .receipt-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 1rem;
  }

  .company-logo {
    margin-right: 1rem;
  }

  .company-details h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  .company-details p {
    margin: 0;
    color: #6b7280;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  .item-table {
    width: 100%;
    border-collapse: collapse;
  }

  .item-table th, .item-table td {
    text-align: left;
    padding: 0.75rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .item-table th {
    color: #6b7280;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.875rem;
  }

  .summary-section {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid #e5e7eb;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .summary-item span:first-child {
    color: #6b7280;
  }

  .summary-item.total {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 0.5rem;
  }

  .receipt-footer {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
    color: #6b7280;
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
    font-weight: 600;
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
    body {
      background-color: #ffffff;
    }
    .no-print, PageHeader {
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
      color: #000000;
    }
    .company-details h2, .section h2, .summary-item.total {
      color: #000000;
    }
    .company-details p, .item-table th, .summary-item span:first-child, .receipt-footer {
      color: #333333;
    }
    .item-table th, .item-table td {
      border-bottom: 1px solid #dddddd;
    }
    .summary-section {
      border-top: 2px solid #dddddd;
    }
    .receipt-footer {
      border-top: 1px solid #dddddd;
    }
  }
</style>
