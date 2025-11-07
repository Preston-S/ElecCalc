<script>
  import { estimateHistory } from '$lib/stores.js';
  import { slide } from 'svelte/transition';
  import PageHeader from '$lib/components/PageHeader.svelte';

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function deleteEstimate(id) {
    if (confirm('Are you sure you want to delete this estimate?')) {
      $estimateHistory = $estimateHistory.filter(estimate => estimate.id !== id);
    }
  }
</script>

<svelte:head>
  <title>Estimate History</title>
</svelte:head>

<PageHeader title="Estimate History" backHref="/" />

<div class="container">
  <main>
    {#if $estimateHistory.length === 0}
      <p class="empty-message">You have no saved estimates.</p>
    {:else}
      <ul class="history-list">
        {#each $estimateHistory as estimate (estimate.id)}
          <li transition:slide|local>
            <div class="history-item-wrapper">
              <a href={`/ElecCalc/history/${estimate.id}`} data-sveltekit-reload class="history-item-link">
                <div class="estimate-details">
                  <span class="estimate-name">{estimate.name}</span>
                  <span class="estimate-date">{formatDate(estimate.date)}</span>
                </div>
                <div class="estimate-total">
                  {estimate.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
              </a>
              <button class="delete-button" on:click={() => deleteEstimate(estimate.id)} aria-label="Delete estimate">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              </button>
            </div>
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
    padding: 0 1rem 1rem 1rem; /* Adjusted padding */
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

  .history-list li {
    margin-bottom: 0.5rem;
    position: relative; /* For positioning the delete button */
  }

  .history-item-wrapper {
    display: flex;
    align-items: center;
    background-color: #1a1a1a; /* Darker background for list items */
    border-radius: 0.75rem; /* Rounded corners */
    transition: background-color 0.2s;
  }

  .history-item-wrapper:hover {
    background-color: #2f2f2f; /* Slightly lighter on hover */
  }

  .history-item-link {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    text-decoration: none;
    color: inherit;
  }

  .estimate-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .estimate-name {
    font-weight: 500;
    font-size: 1.1rem;
    color: #f0f0f0;
  }

  .estimate-date {
    color: #bdbdbd;
    font-size: 0.9rem;
  }

  .estimate-total {
    font-weight: 600;
    font-size: 1.1rem;
    color: #f0f0f0;
  }

  .delete-button {
    background-color: #ef4444; /* Red background for delete */
    color: #f0f0f0;
    border: none;
    border-radius: 0 0.75rem 0.75rem 0; /* Rounded on right side */
    padding: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0; /* Hidden by default on desktop */
    transition: opacity 0.2s, background-color 0.2s;
  }

  .history-item-wrapper:hover .delete-button {
    opacity: 1; /* Show on hover on desktop */
  }

  .delete-button:hover {
    background-color: #dc2626; /* Darker red on hover */
  }

  @media (max-width: 600px) {
    .container { padding: 0 0.75rem 0.75rem 0.75rem; } /* Adjusted padding for mobile */
    .history-item-link {
      padding: 0.75rem;
    }
    .delete-button {
      opacity: 1; /* Always visible on mobile */
      border-radius: 0.75rem; /* Fully rounded on mobile */
      margin-left: 0.5rem; /* Space between link and button */
    }
    .history-item-wrapper {
      background-color: #1a1a1a;
      border-radius: 0.75rem;
      padding-right: 0; /* Remove padding on wrapper as button has its own */
    }
    .history-item-wrapper:hover {
      background-color: #1a1a1a; /* No background change on hover for wrapper on mobile */
    }
  }
</style>
