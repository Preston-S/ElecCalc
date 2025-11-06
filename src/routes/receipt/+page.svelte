<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let estimate = {
    items: [],
    subtotal: 0,
    laborCost: 0,
    tax: 0,
    total: 0,
    hours: 0
  };

  onMount(() => {
    // Get the estimate data passed from the previous page
    if ($page.state.items) {
      estimate = $page.state;
    }
  });

  function printReceipt() {
    window.print();
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
    <div class="receipt-header">
      <h2>Estimate Details</h2>
      <p>Date: {new Date().toLocaleDateString()}</p>
    </div>

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

  .receipt {
    background-color: #fff;
    color: #111;
    padding: 2rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
  }
  @media (max-width: 600px) {
    .receipt {
      padding: 1.5rem;
    }
  }

  .receipt-header {
    text-align: center;
    border-bottom: 2px solid #d1d5db;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }
  .receipt-header h2 {
      color: #111;
  }
  .receipt-header p {
      color: #4b5563;
  }

  .receipt-body, .receipt-summary {
      margin-bottom: 1.5rem;
  }

  h1, h2, h3 {
      color: #f9fafb;
      margin-top: 0;
  }
  .receipt h2, .receipt h3 {
      color: #111;
  }

  .receipt-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .total {
    font-weight: bold;
    font-size: 1.2rem;
  }

  hr {
    border: none;
    border-top: 1px solid #d1d5db;
    margin: 1rem 0;
  }

  .print-button {
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
    margin-top: 2rem;
  }

  @media print {
    .no-print {
      display: none;
    }
    .receipt {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>