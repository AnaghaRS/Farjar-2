/**
 * FARJAR V2 — GSAP + ScrollTrigger Animations + 3D Effects
 * Scroll-triggered reveals, parallax, 3D tilt, magnetic buttons, micro-interactions.
 */
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  /* ---- Hero Title Stagger ---- */
  const heroWords = document.querySelectorAll('.f-hero-title span em');
  if (heroWords.length) {
    gsap.to(heroWords, {
      y: 0, duration: 1.2, ease: 'power4.out',
      stagger: 0.12, delay: 2.2,
    });
  }

  const heroTag = document.querySelector('.f-hero-tag');
  if (heroTag) {
    gsap.to(heroTag, { opacity: 1, y: 0, duration: 0.8, delay: 2.8, ease: 'power3.out' });
    heroTag.style.opacity = '0';
    heroTag.style.transform = 'translateY(10px)';
  }

  const heroDesc = document.querySelector('.f-hero-desc');
  if (heroDesc) {
    gsap.to(heroDesc, { opacity: 1, y: 0, duration: 0.8, delay: 3, ease: 'power3.out' });
    heroDesc.style.opacity = '0';
    heroDesc.style.transform = 'translateY(20px)';
  }

  const heroCta = document.querySelector('.f-hero-cta');
  if (heroCta) {
    gsap.to(heroCta, { opacity: 1, y: 0, duration: 0.8, delay: 3.2, ease: 'power3.out' });
    heroCta.style.opacity = '0';
    heroCta.style.transform = 'translateY(20px)';
  }

  /* ---- Scroll-triggered section reveals ---- */
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    const type = el.dataset.reveal || 'up';
    const props = { opacity: 0 };
    if (type === 'up') props.y = 34;
    if (type === 'left') props.x = -34;
    if (type === 'right') props.x = 34;
    if (type === 'scale') { props.scale = 0.96; props.y = 20; }

    gsap.from(el, {
      ...props,
      duration: 0.42,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 94%',
        toggleActions: 'play none none none',
      }
    });
  });

  /* ---- Staggered children reveals ---- */
  gsap.utils.toArray('[data-stagger]').forEach(container => {
    const children = container.children;
    gsap.from(children, {
      opacity: 0, y: 28,
      duration: 0.65, ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: container,
        start: 'top 92%',
      }
    });
  });

  /* ---- Counter Animation ---- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.textContent.includes('%') ? '%' : '+';
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          }
        });
      },
      once: true,
    });
  });

  /* ---- About Section Text + Image Stagger Animation ---- */
  const aboutSection = document.querySelector('.f-about');
  if (aboutSection) {
    const aboutLabel = aboutSection.querySelector('.f-label');
    const aboutH2 = aboutSection.querySelector('.f-about-content h2');
    const aboutParagraphs = aboutSection.querySelectorAll('.f-about-content > p');
    const aboutValues = aboutSection.querySelector('.f-about-values');
    const aboutImg = aboutSection.querySelector('.f-about-visual img');

    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top 70%',
        toggleActions: 'play none none none',
      }
    });

    if (aboutImg) {
      aboutTl.from(aboutImg, {
        scale: 1.3,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
      });
    }
    if (aboutLabel) {
      aboutTl.from(aboutLabel, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.9');
    }
    if (aboutH2) {
      aboutTl.from(aboutH2, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.6');
    }
    if (aboutParagraphs.length) {
      aboutTl.from(aboutParagraphs, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.5');
    }
    if (aboutValues) {
      aboutTl.from(aboutValues.children, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      }, '-=0.4');
    }
  }

  /* ---- Parallax images ---- */
  gsap.utils.toArray('[data-parallax]').forEach(img => {
    gsap.to(img, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });

  /* ---- Subtle Hover Lift on Cards ---- */
  function addLiftEffect(selector) {
    document.querySelectorAll(selector).forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -4,
          duration: 0.35,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });
  }

  addLiftEffect('.f-about-value');
  addLiftEffect('.f-stat');

  /* ---- Subtle Magnetic Button Effect ---- */
  if (supportsHover && !prefersReducedMotion) {
    document.querySelectorAll('.f-hero-cta a, .f-cta a, .f-form-submit').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.05,
        y: y * 0.05,
        duration: 0.22,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.28,
        ease: 'power3.out',
      });
    });
  });
  }

  /* ---- Section Heading Animations (Slide + Clip) ---- */
  gsap.utils.toArray('h2').forEach(h2 => {
    if (h2.hasAttribute('data-reveal')) return;
    if (h2.closest('.f-hero') || h2.closest('.f-about')) return;
    gsap.from(h2, {
      scrollTrigger: {
        trigger: h2,
        start: 'top 96%',
        toggleActions: 'play none none none',
      },
      y: 18,
      opacity: 0,
      duration: 0.4,
      ease: 'power4.out',
    });
  });

  /* ---- Services Slider (homepage only) ---- */
  const serviceSlider = document.getElementById('serviceSlider');
  const serviceDotsContainer = document.getElementById('serviceDots');
  const serviceItems = serviceSlider
    ? Array.from(serviceSlider.querySelectorAll(':scope > .f-service-item'))
    : [];
  const servicePrev = document.getElementById('servicePrev');
  const serviceNext = document.getElementById('serviceNext');
  let serviceIndex = 0;

  if (serviceSlider) {
    serviceSlider.style.left = '0px';
  }

  function syncServiceDots() {
    if (!serviceDotsContainer) return;
    serviceDotsContainer.querySelectorAll('.f-service-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === serviceIndex);
    });
  }

  function goToService(index) {
    const n = serviceItems.length;
    if (!serviceSlider || !n) return;
    serviceIndex = ((index % n) + n) % n;
    const w = serviceItems[0].offsetWidth;
    serviceSlider.style.left = -(w * serviceIndex) + 'px';
    syncServiceDots();
  }

  let serviceAutoplayId = null;
  function scheduleServiceAutoplay() {
    if (!serviceSlider || !serviceItems.length) return;
    if (serviceAutoplayId !== null) clearInterval(serviceAutoplayId);
    serviceAutoplayId = setInterval(() => goToService(serviceIndex + 1), 3000);
  }

  if (serviceSlider && serviceDotsContainer && serviceItems.length) {
    serviceDotsContainer.innerHTML = '';
    serviceItems.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'f-service-dot' + (i === 0 ? ' active' : '');
      btn.dataset.index = String(i);
      btn.setAttribute('aria-label', 'Service slide ' + (i + 1) + ' of ' + serviceItems.length);
      btn.textContent = String(i + 1);
      btn.addEventListener('click', () => {
        goToService(i);
        scheduleServiceAutoplay();
      });
      serviceDotsContainer.appendChild(btn);
    });
  }

  if (serviceNext && serviceSlider && serviceItems.length) {
    serviceNext.addEventListener('click', () => {
      goToService(serviceIndex + 1);
      scheduleServiceAutoplay();
    });
  }
  if (servicePrev && serviceSlider && serviceItems.length) {
    servicePrev.addEventListener('click', () => {
      goToService(serviceIndex - 1);
      scheduleServiceAutoplay();
    });
  }

  if (serviceSlider && serviceItems.length) {
    window.addEventListener(
      'resize',
      () => {
        serviceSlider.style.left = -(serviceItems[0].offsetWidth * serviceIndex) + 'px';
      },
      { passive: true }
    );

    scheduleServiceAutoplay();
  }

  /* ---- Services 3D tilt effect ---- */
  if (supportsHover && !prefersReducedMotion) {
    serviceItems.forEach(item => {
      const inner = item.querySelector('.f-service-item-inner');
      if (!inner) return;

      item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const isGridCard = !!item.closest('.f-services--card-grid');
        const mult = isGridCard ? 1.5 : 1;
        const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -5 * mult;
        const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6 * mult;
        const zLift = isGridCard ? 22 : 14;
        gsap.to(item, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: isGridCard ? 1500 : 1100,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: true,
        });
        gsap.to(inner, {
          z: zLift,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: true,
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.28,
          ease: 'power3.out',
          overwrite: true,
        });
        gsap.to(inner, {
          z: 0,
          duration: 0.28,
          ease: 'power3.out',
          overwrite: true,
        });
      });
    });
  }

  /* ---- Project Cards Mask Reveal Animation ---- */
  const projectCards = document.querySelectorAll('.f-project-card');
  projectCards.forEach((card, i) => {
    const imgWrapper = card.querySelector('.f-project-img-wrapper');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 95%',
      },
      opacity: 0,
      y: 24,
      duration: 0.65,
      delay: i * 0.08,
      ease: 'power3.out',
    });

    if (img) {
      gsap.from(img, {
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
        },
        y: 60,
        scale: 1.08,
        duration: 1.1,
        delay: i * 0.08 + 0.2,
        ease: 'power4.out',
      });
    }
  });

  /* ---- Stats Strip Entrance ---- */
  gsap.utils.toArray('.f-stat').forEach((stat, i) => {
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  /* ---- Gallery Items Entrance Effect ---- */
  const galSection = document.querySelector('.f-gallery');
  if (galSection) {
    gsap.utils.toArray('.f-gal-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: galSection,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 26,
        scale: 0.98,
        duration: 0.65,
        delay: i * 0.08,
        ease: 'power3.out',
      });
    });
  }

  /* ---- Team Members Entrance ---- */
  const teamSection = document.querySelector('.f-team');
  gsap.utils.toArray('.f-team-member').forEach((member, i) => {
    gsap.from(member, {
      scrollTrigger: {
        trigger: teamSection || member,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 20,
      scale: 0.97,
      duration: 0.65,
      delay: i * 0.1,
      ease: 'power3.out',
    });
  });

  /* ---- Smooth Parallax Sections ---- */
  gsap.utils.toArray('.f-about-visual, .f-contact-map-side').forEach(el => {
    gsap.to(el, {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  });

  /* ---- CTA Section Depth Effect ---- */
  const ctaSection = document.querySelector('.f-cta');
  if (ctaSection) {
    gsap.from(ctaSection, {
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  /* ---- Horizontal drag scroll for projects ---- */
  const projectsScroll = document.querySelector('.f-projects-scroll');
  if (projectsScroll) {
    let isDown = false, startX, scrollLeft;
    let projectAutoplay = null;

    const projectCards = projectsScroll.querySelectorAll('.f-project-card');
    const cardWidth = () => {
      if (!projectCards.length) return 0;
      const firstCard = projectCards[0];
      const gap = parseFloat(getComputedStyle(projectsScroll).columnGap || getComputedStyle(projectsScroll).gap || '0') || 0;
      return firstCard.offsetWidth + gap;
    };

    const startProjectAutoplay = () => {
      if (projectAutoplay || !projectCards.length) return;
      projectAutoplay = setInterval(() => {
        const step = cardWidth();
        if (!step) return;
        const maxScroll = projectsScroll.scrollWidth - projectsScroll.clientWidth;
        const atEnd = projectsScroll.scrollLeft + step >= maxScroll - 2;
        projectsScroll.scrollTo({
          left: atEnd ? 0 : projectsScroll.scrollLeft + step,
          behavior: 'smooth'
        });
      }, 3800);
    };

    const stopProjectAutoplay = () => {
      if (!projectAutoplay) return;
      clearInterval(projectAutoplay);
      projectAutoplay = null;
    };

    startProjectAutoplay();

    projectsScroll.addEventListener('mouseenter', stopProjectAutoplay);
    projectsScroll.addEventListener('mouseleave', startProjectAutoplay);
    projectsScroll.addEventListener('touchstart', stopProjectAutoplay, { passive: true });
    projectsScroll.addEventListener('touchend', startProjectAutoplay, { passive: true });

    projectsScroll.addEventListener('mousedown', e => {
      stopProjectAutoplay();
      isDown = true;
      startX = e.pageX - projectsScroll.offsetLeft;
      scrollLeft = projectsScroll.scrollLeft;
    });
    projectsScroll.addEventListener('mouseleave', () => { isDown = false; startProjectAutoplay(); });
    projectsScroll.addEventListener('mouseup', () => { isDown = false; startProjectAutoplay(); });
    projectsScroll.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - projectsScroll.offsetLeft;
      const walk = (x - startX) * 2;
      projectsScroll.scrollLeft = scrollLeft - walk;
    });
  }

  /* ---- Gallery fullscreen view (all pages) ---- */
  const galleryItems = document.querySelectorAll('.f-gal-item');
  let galleryView = document.getElementById('fGalleryView');
  let galleryImg = document.getElementById('fGalleryImg');
  let galClose = document.getElementById('fGalClose');
  let galPrev = document.getElementById('fGalPrev');
  let galNext = document.getElementById('fGalNext');
  let galleryImages = [];
  let galleryIdx = 0;

  if (!galleryView) {
    galleryView = document.createElement('div');
    galleryView.className = 'f-gallery-view';
    galleryView.id = 'fGalleryView';
    galleryView.innerHTML = `
      <button class="f-gallery-view-close" id="fGalClose" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <button class="f-gallery-view-nav prev" id="fGalPrev" aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      </button>
      <img id="fGalleryImg" src="" alt="Gallery Preview">
      <button class="f-gallery-view-nav next" id="fGalNext" aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    `;
    document.body.appendChild(galleryView);
  }

  galleryImg = document.getElementById('fGalleryImg');
  galClose = document.getElementById('fGalClose');
  galPrev = document.getElementById('fGalPrev');
  galNext = document.getElementById('fGalNext');

  if (galleryView && galleryImg && galleryItems.length) {
    galleryImages = Array.from(galleryItems)
      .map(item => item.querySelector('img')?.src)
      .filter(Boolean);

    const updateGalleryImage = () => {
      galleryImg.src = galleryImages[galleryIdx];
    };

    const closeGallery = () => {
      galleryView.classList.remove('open');
      document.body.style.overflow = '';
    };

    galleryItems.forEach((item, idx) => {
      // 3D tilt interaction for gallery cards
      item.addEventListener('mousemove', e => {
        if (prefersReducedMotion) return;
        const rect = item.getBoundingClientRect();
        const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
        const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        item.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });

      item.addEventListener('click', () => {
        galleryIdx = idx;
        updateGalleryImage();
        galleryView.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    galClose?.addEventListener('click', closeGallery);
    galNext?.addEventListener('click', () => {
      galleryIdx = (galleryIdx + 1) % galleryImages.length;
      updateGalleryImage();
    });
    galPrev?.addEventListener('click', () => {
      galleryIdx = (galleryIdx - 1 + galleryImages.length) % galleryImages.length;
      updateGalleryImage();
    });

    galleryView.addEventListener('click', e => {
      if (e.target === galleryView) closeGallery();
    });

    document.addEventListener('keydown', e => {
      if (!galleryView.classList.contains('open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') galNext?.click();
      if (e.key === 'ArrowLeft') galPrev?.click();
    });
  }

  /* ---- Smooth Scroll Progress Indicator ---- */
  const scrollProgress = document.createElement('div');
  scrollProgress.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--orange),var(--brown));z-index:10001;transition:width 0.1s ease;width:0%;';
  document.body.appendChild(scrollProgress);
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrolled + '%';
  });

  /* ---- Navbar Logo Subtle Hover ---- */
  const navLogo = document.querySelector('.f-navbar-logo');
  if (navLogo) {
    navLogo.addEventListener('mouseenter', () => {
      gsap.to(navLogo, {
        scale: 1.04,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    navLogo.addEventListener('mouseleave', () => {
      gsap.to(navLogo, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }

  /* ---- Refresh ScrollTrigger after all animations registered ---- */
  ScrollTrigger.refresh();

  // Refresh again after images and fonts load to recalculate positions
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
    // Safety fallback: ensure all animated elements become visible
    setTimeout(() => {
      ScrollTrigger.refresh();
      document.querySelectorAll('.f-gal-item, .f-team-member, .f-stat, h2, [data-reveal], .f-about-value').forEach(el => {
        if (getComputedStyle(el).opacity === '0') {
          // Only clear animation props; keep inline design styles (color/alignment/etc.).
          gsap.set(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            clearProps: 'opacity,transform,x,y,scale,rotateX,rotateY'
          });
        }
      });
    }, 3500);
  });

});
