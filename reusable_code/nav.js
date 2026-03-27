/**
 * FARJAR V2 — Standard Professional Navbar
 */
(function(){
  const isSubPage = location.pathname.includes('/pages/');
  const pre = isSubPage ? '../' : '';
  const page = location.pathname.split('/').pop().replace('.html','') || 'index';

  const links = [
    { label:'Home', href:`${pre}index.html`, id:'index' },
    { label:'About', href:`${pre}pages/about.html`, id:'about' },
    { label:'Services', href:`${pre}pages/services.html`, id:'services' },
    { label:'Projects', href:`${pre}pages/projects.html`, id:'projects' },
    { label:'Our Team', href:`${pre}pages/team.html`, id:'team' },
    { label:'Gallery', href:`${pre}pages/gallery.html`, id:'gallery' },
    { label:'Contact', href:`${pre}pages/contact.html`, id:'contact' },
  ];

  const header = document.createElement('header');
  header.className = 'f-navbar';
  
  // Use the actual main logo
  header.innerHTML = `
    <a href="${pre}index.html" class="f-navbar-logo">
      <img src="${pre}assets/images/logo/logo.png" alt="FARJAR"/>
    </a>
    <div class="f-navbar-links desktop-only">
      ${links.map(l => `<a href="${l.href}" class="${page===l.id?'active':''}">${l.label}</a>`).join('')}
    </div>
    
    <button class="f-nav-menu-btn mobile-only" id="fMenuBtn" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;

  // Mobile Menu Dropdown
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'f-mobile-dropdown';
  mobileMenu.innerHTML = links.map(l => `<a href="${l.href}" class="${page===l.id?'active':''}">${l.label}</a>`).join('');

  document.body.prepend(header);
  document.body.prepend(mobileMenu);

  const btn = document.getElementById('fMenuBtn');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Sticky behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Scroll-based active state for index page
  if (page === 'index') {
    const sections = [
      { selector: '#contact-section', navId: 'contact' },
      { selector: '#gallery-section', navId: 'gallery' },
      { selector: '#team-section', navId: 'team' },
      { selector: '.f-projects', navId: 'projects' },
      { selector: '.f-services', navId: 'services' },
      { selector: '.f-about', navId: 'about' },
    ];
    const allDesktopLinks = header.querySelectorAll('.f-navbar-links a');
    const allMobileLinks = mobileMenu.querySelectorAll('a');

    function updateActive(activeId) {
      allDesktopLinks.forEach(link => {
        const linkId = links.find(l => l.href === link.getAttribute('href'))?.id;
        link.classList.toggle('active', linkId === activeId);
      });
      allMobileLinks.forEach(link => {
        const linkId = links.find(l => l.href === link.getAttribute('href'))?.id;
        link.classList.toggle('active', linkId === activeId);
      });
    }

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 150;
      let found = false;
      for (const item of sections) {
        const el = document.querySelector(item.selector);
        if (el && scrollPos >= el.offsetTop) {
          updateActive(item.navId);
          found = true;
          break;
        }
      }
      if (!found) updateActive('index');
    });
  }

})();
