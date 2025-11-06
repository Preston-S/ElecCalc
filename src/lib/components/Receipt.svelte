<script>
  import { estimateItems, laborRate, taxRate } from '$lib/stores.js';

  let subtotal = 0;
  let laborCost = 0;
  let tax = 0;
  let total = 0;

  $: {
    subtotal = $estimateItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const estimatedHours = $estimateItems.length / 10;
    laborCost = estimatedHours * $laborRate;
    tax = (subtotal + laborCost) * $taxRate;
    total = subtotal + laborCost + tax;
  }

  function printReceipt() {
    window.print();
  }
</script>

<div class="receipt-container">
  <button on:click={printReceipt} class="print-button">Print Receipt</button>

  <div class="receipt">
    <div class="receipt-header">
      <h2>Estimate Receipt</h2>
      <p>Date: {new Date().toLocaleDateString()}</p>
    </div>

    <div class="receipt-body">
      <div class="receipt-section">
        <h3>Itemized Breakdown</h3>
        {#each $estimateItems as item}
          <div class="receipt-item">
            <span>{item.name} (x{item.quantity})</span>
            <span>{(item.price * item.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
          </div>
        {/each}
      </div>

      <div class="receipt-section summary">
        <h3>Summary</h3>
        <div class="receipt-item">
          <span>Subtotal</span>
          <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <div class="receipt-item">
          <span>Labor</span>
          <span>{laborCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <div class="receipt-item">
          <span>Tax</span>
          <span>{tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <hr>
        <div class="receipt-item total">
          <span>Total</span>
          <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .receipt-container {
    margin-top: 2rem;
    text-align: center;
  }

  .print-button {
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    border: none;
    background-color: #38bdf8;
    color: #111827;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-bottom: 2rem;
  }

  .print-button:hover {
    background-color: #7dd3fc;
  }

  .receipt {
    background-color: #f9fafb;
    color: #111827;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: left;
    max-width: 600px;
    margin: 0 auto;
  }

  .receipt-header {
    text-align: center;
    border-bottom: 2px solid #d1d5db;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }

  .receipt-header h2 {
    font-size: 1.75rem;
    margin: 0;
    color: #111827;
  }
  
  .receipt-header p {
      margin: 0.25rem 0 0;
      color: #4b5563;
  }

  .receipt-section {
    margin-bottom: 1.5rem;
  }

  .receipt-section h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .receipt-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  
  .summary .receipt-item {
      font-size: 1.1rem;
  }

  .total {
    font-size: 1.25rem;
    font-weight: bold;
    color: #111827;
  }

  hr {
    border: none;
    border-top: 1px solid #d1d5db;
    margin: 1rem 0;
  }

  @media print {
    body * {
      visibility: hidden;
    }
    .receipt, .receipt * {
      visibility: visible;
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
    .print-button {
        display: none;
    }
  }
</style>