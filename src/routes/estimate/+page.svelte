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
    <h1>New Estimate</h1>
  </header>

  <main>
    <div class="section">
      <label for="hours">Estimated Labor Hours</label>
      <input id="hours" type="number" step="0.5" bind:value={$estimatedHours} />
    </div>

    <hr />

    <div class="section">
      <ItemSelector />
    </div>

    <div class="item-list-section">
      <ItemList />
    </div>

    <div class="summary-section">
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

    <div class="button-container">
        <button class="cta-button desktop-cta" on:click={reviewReceipt} disabled={$estimateItems.length === 0}>
          Review Final Receipt
        </button>
    </div>
  </main>
</div>

  <!-- Mobile sticky summary bar -->
  <div class="mobile-summary">
    <div class="mobile-totals">
      <div class="mobile-sub">{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
      <div class="mobile-total">{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
    </div>
    <button class="cta-button mobile-cta" on:click={reviewReceipt} disabled={$estimateItems.length === 0}>Review</button>
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
  h1 {
    font-size: 2rem;
    font-weight: 600;
  }
  .section {
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item-list-section, .summary-section {
      padding: 1rem 0.5rem;
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
    width: 100px;
  }
  input:focus { outline: none; }

  .summary-section h2 {
      font-size: 1rem;
      font-weight: 500;
      color: #888888;
      margin-bottom: 1rem;
      text-transform: uppercase;
  }
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
  .total {
    font-weight: 600;
    font-size: 1.1rem;
  }
  .button-container {
      padding: 1rem 0.5rem;
  }
  .cta-button {
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid #2f2f2f;
    background-color: #f0f0f0;
    color: #101010;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
  }
  .cta-button:disabled {
    background-color: #1c1c1c;
    color: #555;
    border-color: #2f2f2f;
    cursor: not-allowed;
  }

  /* Mobile-specific styles */
  @media (max-width: 600px) {
    .container { padding: 0.75rem; }
    .section { flex-direction: column; gap: 0.5rem; align-items: stretch; }
    label { width: 100%; }
    input { width: 100%; text-align: left; padding: 0.75rem; border-radius: 0.5rem; background-color: #0f0f0f; border: 1px solid #2f2f2f; }
    .item-list-section, .summary-section { padding: 0.75rem 0; }

    /* Hide desktop CTA and show mobile sticky bar */
    .desktop-cta { display: none; }
    .mobile-summary { display: flex; }
  }

  /* Mobile summary bar */
  .mobile-summary {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: env(safe-area-inset-bottom, 12px);
    padding: 10px 16px;
    gap: 12px;
    background: linear-gradient(180deg, rgba(16,16,16,0.8), rgba(16,16,16,0.95));
    align-items: center;
    z-index: 200;
  }

  .mobile-totals { flex: 1; display:flex; flex-direction:column; gap:2px; }
  .mobile-sub { font-size: 0.9rem; color: #bdbdbd; }
  .mobile-total { font-size: 1.1rem; font-weight: 700; }

  .mobile-cta { min-width: 120px; padding: 0.75rem 1rem; border-radius: 0.75rem; }
</style>