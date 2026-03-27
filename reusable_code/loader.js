/**
 * FARJAR V2 — Cinematic Loader
 * A horizontal line sweeps across, then reveals brand name with clip-path animation.
 */
(function(){
  const loader = document.createElement('div');
  loader.className = 'f-loader';
  loader.id = 'fLoader';
  const isSubPage = location.pathname.includes('/pages/');
  const pre = isSubPage ? '../' : '';
  loader.innerHTML = `
    <div class="f-loader-line" id="fLoaderLine"></div>
    <img src="${pre}assets/images/logo/logo.png" alt="FARJAR" id="fLoaderLogo" style="width:160px;height:auto;opacity:0;filter:drop-shadow(0 12px 28px rgba(0,0,0,0.6));transition:opacity 0.8s ease,transform 0.8s ease;transform:scale(0.9);" />
    <div class="f-loader-sub" id="fLoaderSub">Construction & Development</div>
  `;
  document.body.prepend(loader);
  document.body.style.overflow = 'hidden';

  const line = document.getElementById('fLoaderLine');
  const logo = document.getElementById('fLoaderLogo');
  const sub  = document.getElementById('fLoaderSub');

  // Phase 1: Line sweep
  requestAnimationFrame(() => {
    line.style.transition = 'width 0.8s cubic-bezier(0.77,0,0.175,1)';
    line.style.width = '100%';
  });

  // Phase 2: Logo reveal
  setTimeout(() => {
    line.style.transition = 'opacity 0.4s ease';
    line.style.opacity = '0';
    logo.style.opacity = '1';
    logo.style.transform = 'scale(1)';
  }, 900);

  // Phase 3: Subtitle
  setTimeout(() => {
    sub.style.transition = 'opacity 0.5s ease';
    sub.style.opacity = '1';
  }, 1400);

  // Phase 4: Fade out
  function hide() {
    loader.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    loader.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    setTimeout(() => loader.remove(), 700);
  }

  if (document.readyState === 'complete') {
    setTimeout(hide, 2000);
  } else {
    const start = Date.now();
    window.addEventListener('load', () => {
      const elapsed = Date.now() - start;
      setTimeout(hide, Math.max(0, 2000 - elapsed));
    });
  }
})();
