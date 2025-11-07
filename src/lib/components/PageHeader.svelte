<script>
  import { goto } from '$app/navigation';

  export let title = '';
  export let backHref = '';

  function goBack() {
    if (backHref) {
      goto(backHref);
    } else {
      history.back();
    }
  }
</script>

<header class="page-header">
  <button class="back-button" on:click={goBack} aria-label="Go back">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  <h1 class="page-title">{title}</h1>
  <div class="right-action">
    <slot name="rightAction"></slot>
  </div>
</header>

<style>
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #101010; /* Dark background */
    color: #f0f0f0; /* Light text */
    border-bottom: 1px solid #2f2f2f; /* Subtle separator */
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .back-button {
    background: none;
    border: none;
    color: #f0f0f0;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .back-button svg {
    width: 24px;
    height: 24px;
  }

  .page-title {
    font-size: 1.25rem;
    font-weight: 600;
    flex-grow: 1;
    text-align: center;
    margin: 0;
  }

  .right-action {
    width: 24px; /* To balance the back button */
    display: flex;
    justify-content: flex-end;
  }
</style>
