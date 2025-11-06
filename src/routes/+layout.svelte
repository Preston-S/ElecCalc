<script>
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import './global.css'; // Import global styles
  import BottomNav from '$lib/components/BottomNav.svelte';

  let { children } = $props();
</script>

<div class="page-wrapper">
  {#key $page.url.pathname}
    <div in:slide|local={{ duration: 250, delay: 250 }} out:slide|local={{ duration: 250 }}>
      {@render children()}
    </div>
  {/key}
</div>

<BottomNav />

<style>
  .page-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    .page-wrapper {
      padding-bottom: 60px; /* Height of the nav bar */
    }
  }
</style>
