<script>
  import { page } from '$app/stores';
  import { slide } from 'svelte/transition';
  import './global.css'; // Import global styles

  let { children } = $props();
</script>

<div class="page-wrapper">
  {#key $page.url.pathname}
    <div in:slide|local={{ duration: 250, delay: 250 }} out:slide|local={{ duration: 250 }}>
      {@render children()}
    </div>
  {/key}
</div>

<style>
  .page-wrapper {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
