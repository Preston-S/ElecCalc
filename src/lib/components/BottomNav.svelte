<script>
  import { page } from '$app/stores';
</script>

<nav>
  <a href="/ElecCalc/history" data-sveltekit-reload class:active={$page.url.pathname.startsWith('/ElecCalc/history')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l2 2M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/></svg>
  </a>
  <a href="/ElecCalc/estimate" data-sveltekit-reload class:active={$page.url.pathname.startsWith('/ElecCalc/estimate')}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20v-8m0-4V4M4 12h16"/></svg>
  </a>
  <a href="/ElecCalc/" data-sveltekit-reload class:active={$page.url.pathname === '/ElecCalc' || $page.url.pathname === '/ElecCalc/'}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"/></svg>
  </a>
</nav>

<style>
  nav {
    display: none; /* Hidden by default on desktop */
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #101010;
    border-top: 1px solid #2f2f2f;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
  }

  a {
    color: #888888; /* Grey for inactive icons */
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }

  a.active {
    color: #f0f0f0; /* White for active icon */
  }

  /* Show the nav bar only on mobile screens */
  @media (max-width: 768px) {
    nav {
      display: flex;
    }
  }
</style>
