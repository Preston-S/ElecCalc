<script>
  import { page } from '$app/stores';
</script>

<nav>
  <div class="nav-content">
    <a class="tab left" href="/ElecCalc/history" data-sveltekit-reload class:active={$page.url.pathname.startsWith('/ElecCalc/history')} aria-label="History">
      <img src="/ElecCalc/icons/history.svg" width="22" height="22" alt="" />
    </a>

    <div class="center-button">
      <a href="/ElecCalc/estimate" data-sveltekit-reload class:active={$page.url.pathname.startsWith('/ElecCalc/estimate')} aria-label="New Estimate">
        <div class="plus-background">
          <img src="/ElecCalc/icons/plus.svg" width="26" height="26" alt="" />
        </div>
      </a>
    </div>

    <a class="tab right" href="/ElecCalc/settings/materials" data-sveltekit-reload class:active={$page.url.pathname === '/ElecCalc/settings/materials' || $page.url.pathname === '/ElecCalc/'} aria-label="Settings">
      <img src="/ElecCalc/icons/settings.svg" width="22" height="22" alt="" />
    </a>
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
    background-color: #010101;
  }

  .nav-content {
    height: 64px; /* adjust to match Threads' nav scale */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px; /* balanced side padding */
    position: relative;
    max-width: 900px;
    margin: 0 auto;
  }

  a.tab {
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 999px;
  }

  .center-button {
    position: absolute;
    left: 50%;
    top: 6px; /* slight lift */
    transform: translateX(-50%);
  }

  .plus-background {
    width: 64px;
    height: 56px;
    background-color: #171717; /* slightly lighter than page to pop */
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 22px rgba(0,0,0,0.6);
    pointer-events: auto;
    transition: transform 140ms ease, background-color 140ms ease, box-shadow 140ms ease;
  }

  .center-button a {
    display: block;
  }

  .center-button a:active .plus-background,
  .center-button a.active .plus-background {
    transform: translateY(-4px);
    box-shadow: 0 10px 26px rgba(0,0,0,0.65);
    background-color: #2a2a2a;
  }

  a.tab img {
    filter: brightness(0) invert(1);
    opacity: 0.55; /* faded white when inactive */
    transition: opacity 180ms ease, transform 120ms ease;
  }

  a.tab.active img {
    opacity: 1; /* full white when active */
    transform: translateY(-1px);
  }

  .plus-background img {
    filter: brightness(0) invert(1);
    opacity: 1;
    width: 20px;
    height: 20px;
  }

  /* Show the nav bar only on mobile screens */
  @media (max-width: 768px) {
    nav {
      display: block;
    }
  }
</style>
