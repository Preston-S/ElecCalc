<script>
  import { page } from '$app/stores';
</script>

<nav>
  <div class="nav-content">
    <a href="/ElecCalc/history" data-sveltekit-reload class:active={$page.url.pathname.startsWith('/ElecCalc/history')} aria-label="History">
      <img src="/ElecCalc/icons/history.svg" width="24" height="24" alt="" />
    </a>
    <a href="/ElecCalc/settings/materials" data-sveltekit-reload class:active={$page.url.pathname === '/ElecCalc/settings/materials' || $page.url.pathname === '/ElecCalc/'} aria-label="Settings">
      <img src="/ElecCalc/icons/settings.svg" width="24" height="24" alt="" />
    </a>
    <div class="center-button">
      <a href="/ElecCalc/estimate" data-sveltekit-reload class:active={$page.url.pathname.startsWith('/ElecCalc/estimate')} aria-label="New Estimate">
        <div class="plus-background">
          <img src="/ElecCalc/icons/plus.svg" width="24" height="24" alt="" />
        </div>
      </a>
    </div>
  </div>
</nav>

<style>
  nav {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background-color: #101010;
  }

  .nav-content {
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 16px;
    position: relative;
  }

  a {
    color: #888888;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 86px;
    height: 48px;
    border-radius: 50%;
  }

  .center-button {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .plus-background {
    width: 86px;
    height: 48px;
    background-color: #333333;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a.active {
    color: #ffffff;
  }

  img {
    filter: brightness(0) invert(1); /* Convert to white */
    opacity: 0.5; /* Faded when inactive */
    transition: opacity 0.2s ease;
  }

  a.active img {
    opacity: 1; /* Full white when active */
  }

  .center-button img {
    opacity: 1; /* Always full white */
  }

  /* Show the nav bar only on mobile screens */
  @media (max-width: 768px) {
    nav {
      display: block;
    }
  }
</style>
