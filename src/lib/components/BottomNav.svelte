<script>
  import { page } from '$app/stores';
</script>

<nav>
  <div class="nav-content">
    <a class="tab left" href="/history" class:active={$page.url.pathname.startsWith('/history')} aria-label="History">
      <img src="/icons/history.svg" width="22" height="22" alt="" />
    </a>

    <div class="center-button">
      <a href="/" class:active={$page.url.pathname.startsWith('/')} aria-label="New Estimate">
        <div class="plus-background">
          <img src="/icons/plus.svg" width="26" height="26" alt="" />
        </div>
      </a>
    </div>

    <a class="tab right" href="/settings" class:active={$page.url.pathname === '/settings'} aria-label="Settings">
      <img src="/icons/settings.svg" width="22" height="22" alt="" />
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
    background-color: #101010;
  }

  .nav-content {
    height: 64px; /* adjust to match Threads' nav scale */
    display: flex;
    justify-content: space-between;
    align-items: flex-end; /* align items to bottom so we can lift center */
    padding: 0 28px; /* balanced side padding */
    position: relative;
    max-width: 900px;
    margin: 0 auto;
  }

  /* make each slot take equal space */
  .nav-content > * {
    flex: 1 1 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a.tab {
    color: #ffffff;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
    border-radius: 999px;
  }

  .center-button {
    position: relative;
    transform: none; /* no lift */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .plus-background {
    width: 56px;
    height: 48px;
    background-color: #171717; /* slightly lighter than page to pop */
    border-radius: 12px;
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
    /* no vertical lift on active; keep subtle visual feedback via color/shadow only */
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
  }

  .plus-background img {
    filter: brightness(0) invert(1);
    opacity: 1;
    width: 18px;
    height: 18px;
  }

  /* Show the nav bar only on mobile screens */
  @media (max-width: 768px) {
    nav {
      display: block;
    }
  }
</style>
