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
  <title>New Estimate - Electrical Calculator</title>
</svelte:head>

<div class="container">
  {#if !$laborRate || $laborRate === 0}
    <div class="prompt-container">
      <h1>Set Your Labor Rate</h1>
      <p>Before you can create an estimate, you need to set your hourly labor rate.</p>
      <a href="/settings" class="cta-button">Go to Settings</a>
    </div>
  {:else}
    <main>
      <div class="section input-section">
        <label for="hours">Estimated Labor Hours</label>
        <input id="hours" type="number" step="0.5" bind:value={$estimatedHours} placeholder="0" />
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
  {/if}
</div>

  <!-- Mobile sticky summary bar -->
  <div class="mobile-summary">
    <div class="mobile-totals">
      <div class="mobile-sub">Subtotal: {subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
      <div class="mobile-total">Total: {total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
    </div>
    <button class="cta-button mobile-cta" on:click={reviewReceipt} disabled={$estimateItems.length === 0}>Review</button>
  </div>

<style>
  .prompt-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
    background-color: #1c1c1c;
    border-radius: 0.75rem;
    border: 1px solid #2f2f2f;
  }

  .prompt-container h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .prompt-container p {
    margin-bottom: 2rem;
    color: #888888;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 0 1rem; /* Adjusted padding */
  }

  main {
    padding: 0 1rem;
  }

  .section {
    padding: 1rem 0; /* Adjusted padding */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .item-list-section, .summary-section {
      padding: 1rem 0; /* Adjusted padding */
  }
  hr {
    border: none;
    border-top: 1px solid #2f2f2f;
    margin: 0;
  }
  label {
    font-size: 1rem;
    font-weight: 500;
    color: #bdbdbd; /* Lighter label color */
    margin-bottom: 0.5rem;
  }
  input {
    font-size: 1rem;
    background-color: #0f0f0f; /* Darker background for input */
    border: 1px solid #2f2f2f; /* Subtle border */
    color: #f0f0f0;
    text-align: left; /* Align text left */
    width: 100%; /* Full width */
    padding: 0.75rem; /* More padding */
    border-radius: 0.5rem; /* Rounded corners */
  }
  input:focus {
    outline: none;
    border-color: #38bdf8; /* Highlight on focus */
  }
  input::placeholder {
    color: #555;
  }

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
      padding: 1rem 0; /* Adjusted padding */
  }
  .cta-button {
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    border: none; /* No border */
    background-color: #38bdf8; /* Blue background for CTA */
    color: #101010; /* Dark text for contrast */
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s;
    text-decoration: none;
  }
  .cta-button:hover:not(:disabled) {
    background-color: #0ea5e9; /* Slightly darker blue on hover */
  }
  .cta-button:disabled {
    background-color: #1c1c1c;
    color: #555;
    border-color: #2f2f2f;
    cursor: not-allowed;
  }

  /* Mobile-specific styles */
  @media (max-width: 600px) {
    .container { padding: 0 0.75rem 0.75rem; } /* Adjusted padding */
    .section { flex-direction: column; gap: 0.5rem; align-items: stretch; }
    .input-section { align-items: center; }
    label { width: 100%; }
    input { width: 100%; text-align: center; padding: 0.6rem; border-radius: 0.5rem; background-color: #0f0f0f; border: 1px solid #2f2f2f; font-size: 0.9rem; }
    .item-list-section, .summary-section { padding: 0.75rem 0; }

    .cta-button {
      font-size: 1rem;
      padding: 0.8rem;
    }

    /* Hide desktop CTA and show mobile sticky bar */
    /* .desktop-cta { display: none; } */
    .mobile-summary { display: flex; }
  }

  /* Mobile summary bar */
  .mobile-summary {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    bottom: env(safe-area-inset-bottom, 0); /* Adjusted bottom to 0 */
    padding: 10px 16px;
    gap: 12px;
    background: linear-gradient(180deg, rgba(16,16,16,0.8), rgba(16,16,16,0.95));
    align-items: center;
    z-index: 200;
    backdrop-filter: blur(10px); /* Added blur for frosted glass effect */
  }

  .mobile-totals { flex: 1; display:flex; flex-direction:column; gap:2px; }
  .mobile-sub { font-size: 0.9rem; color: #bdbdbd; }
  .mobile-total { font-size: 1.1rem; font-weight: 700; }

  .mobile-cta { padding: 0.75rem 1rem; border-radius: 0.75rem; }
</style>
