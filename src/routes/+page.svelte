<script>
  import { laborRate, taxRate } from '$lib/stores.js';
  import { goto } from '$app/navigation';

  /**
     * @type {number}
     */
  let taxPercentage;

  // When the store changes, update the local percentage value, rounded for display
  taxRate.subscribe(value => {
    taxPercentage = parseFloat((value * 100).toFixed(4));
  });

  // When the user types in the input, update the store
  /**
   * @param {Event & { currentTarget: EventTarget & HTMLInputElement }} e
   */
  function handleTaxInput(e) {
    const percentage = parseFloat(e.currentTarget.value);
    if (!isNaN(percentage)) {
      $taxRate = percentage / 100;
    }
  }

  function startEstimate() {
    goto('estimate');
  }
</script>

<svelte:head>
  <title>Settings - Electrical Calculator</title>
</svelte:head>

<div class="container">
  <header>
    <h1>Settings</h1>
  </header>

  <main>
    <div class="form-section">
      <div class="form-group">
        <label for="labor">Labor Rate ($/hour)</label>
        <input id="labor" type="number" bind:value={$laborRate} />
      </div>
      <hr />
      <div class="form-group">
        <label for="tax">Tax Rate (%)</label>
        <input id="tax" type="number" step="0.01" value={taxPercentage} on:input={handleTaxInput} />
      </div>
    </div>

    <a href="settings/materials" class="manage-link">Manage Materials</a>

    <div class="button-container">
        <button class="cta-button" on:click={startEstimate}>
          Start New Estimate
        </button>
    </div>
  </main>
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
  .form-section {
      background-color: #1c1c1c;
      border-radius: 0.75rem;
      border: 1px solid #2f2f2f;
      padding: 0 1rem;
      margin: 1rem 0;
  }
  .form-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
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
  input:focus {
      outline: none;
  }
  .manage-link {
    display: block;
    text-align: center;
    color: #888888;
    text-decoration: none;
    padding: 1rem;
    margin: 1rem 0;
  }
  .button-container {
      margin-top: 2rem;
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
</style>