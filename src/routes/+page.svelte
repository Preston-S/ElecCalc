<script>
  import ItemSelector from '$lib/components/ItemSelector.svelte';
  import ItemList from '$lib/components/ItemList.svelte';
  import Receipt from '$lib/components/Receipt.svelte';
  import { estimateItems, laborRate, taxRate } from '$lib/stores.js';

  let subtotal = 0;
  let laborCost = 0;
  let tax = 0;
  let total = 0;

  // Reactive calculation
  $: {
    subtotal = $estimateItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // For now, let's assume a simple labor calculation, e.g., 1 hour per 10 items
    const estimatedHours = $estimateItems.length / 10;
    laborCost = estimatedHours * $laborRate;
    tax = (subtotal + laborCost) * $taxRate;
    total = subtotal + laborCost + tax;
  }
</script>

<svelte:head>
  <title>Electrical Cost Calculator</title>
</svelte:head>

<div class="container">
  <header>
    <h1>Electrical Cost Calculator</h1>
  </header>

  <main>
    <section class="card">
      <h2>Add Items</h2>
      <ItemSelector />
    </section>

    <section class="card">
      <h2>Estimate</h2>
      <ItemList />
    </section>

    <section class="card summary">
      <h2>Project Summary</h2>
      <div class="summary-item">
        <span>Subtotal</span>
        <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <div class="summary-item">
        <span>Labor</span>
        <span>{laborCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <div class="summary-item">
        <span>Tax</span>
        <span>{tax.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
      <hr />
      <div class="summary-item total">
        <span>Total</span>
        <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
    </section>

    <section>
        <Receipt />
    </section>
  </main>
</div>

<style>
  :global(body) {
    background-color: #111827;
    color: #e5e7eb;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #f9fafb;
  }

  .card {
    background-color: #1f2937;
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid #374151;
    padding-bottom: 0.5rem;
  }

  .summary-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 1.125rem;
  }

  .total {
    font-size: 1.25rem;
    font-weight: 600;
  }

  hr {
    border: none;
    border-top: 1px solid #374151;
    margin: 1rem 0;
  }
</style>