<script>
  import { estimateHistory } from '$lib/stores.js';
  import { slide } from 'svelte/transition';

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Estimate History</title>
</svelte:head>

<div class="container">
  <header>
    <h1>History</h1>
  </header>

  <main>
    {#if $estimateHistory.length === 0}
      <p class="empty-message">You have no saved estimates.</p>
    {:else}
      <ul class="history-list">
        {#each $estimateHistory as estimate (estimate.id)}
          <li transition:slide|local>
            <a href={`/ElecCalc/history/${estimate.id}`} data-sveltekit-reload>
              <div class="estimate-details">
                <span class="estimate-name">{estimate.name}</span>
                <span class="estimate-date">{formatDate(estimate.date)}</span>
              </div>
              <div class="estimate-total">
                {estimate.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </div>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </main>
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

  h1 {
    font-size: 2rem;
    font-weight: 600;
  }

  .empty-message {
    color: #888888;
    text-align: center;
    padding: 3rem 0;
  }

  .history-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .history-list li a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #2f2f2f;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s;
  }

  .history-list li a:hover {
    background-color: #1a1a1a;
  }

  .estimate-name {
    font-weight: 500;
    font-size: 1.1rem;
  }

  .estimate-date {
    color: #888888;
    font-size: 0.9rem;
  }

  .estimate-total {
    font-weight: 600;
    font-size: 1.1rem;
  }
</style>
