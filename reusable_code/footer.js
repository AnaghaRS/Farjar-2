/**
 * FARJAR V2 — Minimal Footer
 */
(function(){
  const isSubPage = location.pathname.includes('/pages/');
  const pre = isSubPage ? '../' : '';

  const footer = document.createElement('footer');
  footer.className = 'f-footer';
  footer.innerHTML = `
    <div class="f-footer-top">
      <div class="f-footer-brand">
        <img src="${pre}assets/images/logo/logo.png" alt="FARJAR"/>
        <p>Premium interior design and fitout company in Oman, delivering exceptional commercial spaces.</p>
      </div>
      <div class="f-footer-col">
        <h5>Navigate</h5>
        <a href="${pre}index.html">Home</a>
        <a href="${pre}pages/about.html">About</a>
        <a href="${pre}pages/services.html">Services</a>
        <a href="${pre}pages/projects.html">Projects</a>
      </div>
      <div class="f-footer-col">
        <h5>Explore</h5>
        <a href="${pre}pages/team.html">Our Team</a>
        <a href="${pre}pages/gallery.html">Gallery</a>
        <a href="${pre}pages/contact.html">Contact</a>
      </div>
      <div class="f-footer-col">
        <h5>Reach Us</h5>
        <a href="connect@farjarinteriors.com">connect@farjarinteriors.com</a>
        <a href="https://api.whatsapp.com/send?phone=96893930050">+968 9393 0050</a>
        <a>Building no 164, way 3305
Dohat Al Adab street, Al Khuwair st
Muscat, Oman</a>
 <div class="f-footer-social">
         <a href="https://www.instagram.com/farjar.om?igsh=YWgxenp6aTJ0emhy" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
     </div>
      </div>
    </div>
    <div class="f-footer-bottom">
      <p>&copy; 2026 FARJAR Construction & Development LLC</p>
      <!-- Bottom social icons (disabled)
      <div class="f-footer-social">
        <a href="https://www.instagram.com/farjarinteriors/" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="https://www.linkedin.com/company/farjarinteriors/" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
        <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
       </div>
      --> 
    </div>
  `;
  document.body.appendChild(footer);
})();
