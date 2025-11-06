<script>
  import { laborRate, taxRate } from '$lib/stores.js';
  import { goto } from '$app/navigation';

  let taxPercentage;

  // When the store changes, update the local percentage value
  taxRate.subscribe(value => {
    taxPercentage = value * 100;
  });

  // When the user types in the input, update the store
  function handleTaxInput(e) {
    const percentage = parseFloat(e.target.value);
    if (!isNaN(percentage)) {
      $taxRate = percentage / 100;
    }
  }

  function startEstimate() {
    goto('/estimate');
  }
</script>

<svelte:head>
  <title>Settings - Electrical Calculator</title>
</svelte:head>

<div class="container">
  <header>
    <h1>Electrical Cost Calculator</h1>
    <p>Welcome! Set your rates below before starting a new estimate.</p>
  </header>

  <main>
    <div class="card">
      <h2>Configuration</h2>
      <div class="form-group">
        <label for="labor">Labor Rate ($/hour)</label>
        <input id="labor" type="number" bind:value={$laborRate} />
      </div>
      <div class="form-group">
        <label for="tax">Tax Rate (%)</label>
        <input id="tax" type="number" step="0.01" value={taxPercentage} on:input={handleTaxInput} />
      </div>
    </div>

    <button class="cta-button" on:click={startEstimate}>
      Start New Estimate
    </button>

    <a href="/settings/materials" class="manage-link">Manage Materials</a>
  </main>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #e5e7eb;
    text-align: center;
  }

  header p {
    color: #9ca3af;
    font-size: 1.125rem;
  }

  .card {
    background-color: #1f2937;
    border-radius: 0.75rem;
    padding: 2rem;
    margin: 2rem 0;
    text-align: left;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #d1d5db;
  }

  input {
    width: 100%;
    font-size: 1.125rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #374151;
    background-color: #374151;
    color: #e5e7eb;
    box-sizing: border-box;
  }

  .cta-button {
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
  }

  .cta-button:hover {
    background-color: #7dd3fc;
  }

  .manage-link {
    display: block;
    margin-top: 1.5rem;
    color: #38bdf8;
    text-decoration: none;
    font-size: 1rem;
  }
  .manage-link:hover {
    text-decoration: underline;
  }
</style>