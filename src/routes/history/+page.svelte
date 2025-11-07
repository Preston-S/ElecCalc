<script>
  import { estimateHistory } from '$lib/stores.js';
  import { slide } from 'svelte/transition';
  import PageHeader from '$lib/components/PageHeader.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment'; // Import browser

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  let startX = 0;
  let currentX = 0;
  let swipingItemElement = null; // Reference to the <li> element being swiped
  const SWIPE_THRESHOLD = 50; // Pixels to swipe to trigger revealing the delete button
  const DELETE_BUTTON_WIDTH = 100; // Expected width of the delete button when fully revealed

  function resetSwipe() {
    if (swipingItemElement) {
      // Smoothly reset the item's position
      swipingItemElement.querySelector('.history-item-wrapper').style.transition = 'transform 0.3s ease-out';
      // swipingItemElement.querySelector('.delete-button').style.transition = 'width 0.3s ease-out'; // Width is driven by --delete-button-width
      swipingItemElement.style.setProperty('--swipe-offset', '0px');
      swipingItemElement.style.setProperty('--delete-button-width', '0px');
      swipingItemElement = null;
    }
  }

  function handleStart(e, element) {
    // Ensure only one item can be swiped at a time
    if (swipingItemElement && swipingItemElement !== element) {
      resetSwipe();
    }

    swipingItemElement = element;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    currentX = startX;
    // Disable transitions during swipe for immediate feedback
    swipingItemElement.querySelector('.history-item-wrapper').style.transition = 'none';
    // swipingItemElement.querySelector('.delete-button').style.transition = 'none'; // Width is driven by --delete-button-width

    // Add event listeners for mousemove/mouseup on the window to track swipe even if cursor leaves the item
    if (!e.touches && browser) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
    }
  }

  function handleMove(e) {
    if (!swipingItemElement) return;

    // Prevent scrolling when swiping horizontally
    // Note: passive:true on touchmove might prevent preventDefault. Remove if needed for full gesture control.
    // e.preventDefault(); // Uncomment if you need to prevent vertical scroll during horizontal swipe

    currentX = (e.touches ? e.touches[0].clientX : e.clientX);
    let diffX = currentX - startX;

    // Only allow swiping left
    if (diffX > 0) diffX = 0;
    // Limit swipe distance to the width of the delete button plus a bit of an overshoot effect
    if (diffX < -DELETE_BUTTON_WIDTH - 20) diffX = -DELETE_BUTTON_WIDTH - 20; // Allow a small overshoot

    swipingItemElement.style.setProperty('--swipe-offset', `${diffX}px`);
    swipingItemElement.style.setProperty('--delete-button-width', `${Math.min(DELETE_BUTTON_WIDTH, -diffX)}px`);
  }

  function handleEnd(e, id) {
    if (!swipingItemElement) return;

    const diffX = currentX - startX;

    // Re-enable transitions for smooth snap-back/delete animation
    swipingItemElement.querySelector('.history-item-wrapper').style.transition = 'transform 0.3s ease-out';
    // swipingItemElement.querySelector('.delete-button').style.transition = 'width 0.3s ease-out';

    if (diffX < -SWIPE_THRESHOLD) {
      // Swiped past threshold, reveal delete button fully
      swipingItemElement.style.setProperty('--swipe-offset', `-${DELETE_BUTTON_WIDTH}px`);
      swipingItemElement.style.setProperty('--delete-button-width', `${DELETE_BUTTON_WIDTH}px`);
    } else {
      // Snap back to original position
      resetSwipe();
    }
    
    // Remove global mousemove/mouseup listeners
    if (browser) {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
    }

    swipingItemElement = null; // Clear swiping item reference
  }

  function deleteEstimateAndResetSwipe(id) {
    resetSwipe(); // Ensure item snaps back before deletion animation begins
    if (confirm('Are you sure you want to delete this estimate?')) {
      $estimateHistory = $estimateHistory.filter(estimate => estimate.id !== id);
    }
  }

  // Global mouseup listener for cases where mouseup occurs outside of the swiping element
  function handleGlobalMouseUpOutside() {
    if (swipingItemElement) {
      resetSwipe();
      // Also remove the window-level listeners if they were added for a mouse swipe
      if (browser) {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
      }
    }
  }

  if (browser) {
    onMount(() => {
      window.addEventListener('mouseup', handleGlobalMouseUpOutside);
    });
    onDestroy(() => {
      window.removeEventListener('mouseup', handleGlobalMouseUpOutside);
    });
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
          <li
            transition:slide|local
            on:touchstart|passive={(e) => handleStart(e, e.currentTarget)}
            on:touchmove|passive={handleMove}
            on:touchend|passive={(e) => handleEnd(e, estimate.id)}
            on:mousedown={(e) => handleStart(e, e.currentTarget)}
          >
            <!-- The order changed: delete button is now OUTSIDE the history-item-wrapper -->
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
            </div>
            <button class="delete-button" on:click={() => deleteEstimateAndResetSwipe(estimate.id)} aria-label="Delete estimate">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
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
    overflow: hidden; /* Hide overflowing parts of the item */
    touch-action: pan-y; /* Allows vertical scrolling, prevents horizontal browser swipe */
    border-radius: 0.75rem; /* Apply border-radius to the li to contain the overflow */
    background-color: #1a1a1a; /* Background here for delete area */
  }

  .history-item-wrapper {
    display: flex;
    align-items: center;
    background-color: #1a1a1a; /* Darker background for list items */
    border-radius: 0.75rem; /* Rounded corners */
    transform: translateX(var(--swipe-offset, 0)); /* Controlled by JS */
    position: relative; /* For stacking context */
    z-index: 1; /* Ensure wrapper is above delete button */
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
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #ef4444; /* Red background for delete */
    color: #f0f0f0;
    border: none;
    width: var(--delete-button-width, 0); /* Controlled by JS */
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 0 0.75rem 0.75rem 0; /* Rounded on right side */
    z-index: 0; /* Ensure button is behind wrapper initially */
  }

  .delete-button:hover {
    background-color: #dc2626; /* Darker red on hover */
  }

  @media (max-width: 600px) {
    .container { padding: 0 0.75rem 0.75rem 0.75rem; } /* Adjusted padding for mobile */
    .history-item-link {
      padding: 0.75rem;
    }
  }
</style>
