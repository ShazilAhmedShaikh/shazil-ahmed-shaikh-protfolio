/**
 * SHAZIL AHMED SHAIKH PORTFOLIO ENGINE
 * Modern Vanilla JavaScript — Noir & Crimson Ambient Canvas, Interactive ResQ Explorer, Bento Filter & Clipboard
 */

(function () {
  'use strict';

  // ==========================================================================
  // RESQ - POI HUB (CORE FYP) 7-LAYER CONSTITUTIONAL STACK DATA
  // ==========================================================================
  const LAYER_DATA = {
    1: {
      badge: 'LAYER 01 // RF RECEIVER',
      title: '433 MHz LoRa Radio Broadcast Pipeline',
      desc: 'Long-range sub-GHz LoRa physical layer receiving emergency broadcast packets over 433 MHz frequency bands without dependence on cellular towers or internet infrastructure.',
      tags: ['433 MHz LoRa', 'Sub-GHz RF']
    },
    2: {
      badge: 'LAYER 02 // CRYPTOGRAPHIC CORE',
      title: 'Ed25519 Offline Digital Signature Verification',
      desc: 'Zero-trust cryptographic validation performing local Ed25519 signature checks on incoming alert payloads to ensure authenticity and prevent malicious spoofing in isolation.',
      tags: ['Ed25519 Signatures', 'Zero-Trust Security']
    },
    3: {
      badge: 'LAYER 03 // EMBEDDED SILICON',
      title: 'Raspberry Pi Zero 2 W Host Node',
      desc: 'Ultra-low-power ARM quad-core embedded host executing persistent background listening daemons, hardware UART telemetry, and power-efficient continuous duty cycles.',
      tags: ['RPi Zero 2 W', 'Embedded Linux']
    },
    4: {
      badge: 'LAYER 04 // ACCESS LAYER',
      title: 'Captive Portal Wi-Fi Distribution Gateway',
      desc: 'Automated DNS redirection and lightweight HTTP captive portal allowing nearby citizens with any smartphone to connect instantly without passwords or app installation.',
      tags: ['Captive Portal', 'Zero-Config Access']
    },
    5: {
      badge: 'LAYER 05 // API DISPATCH',
      title: 'Real-Time /alerts.json Public Feed',
      desc: 'Standardized JSON data endpoint continuously serving verified disaster alerts, map coordinates, evacuation routes, and shelter statuses to connected mobile devices.',
      tags: ['/alerts.json Feed', 'Real-Time State']
    },
    6: {
      badge: 'LAYER 06 // STORAGE & ENGINE',
      title: 'FastAPI & SQLite Local State Storage',
      desc: 'High-speed asynchronous Python backend with atomic SQLite transactions, ensuring zero data corruption and instant retrieval of historical alert logs across device reboots.',
      tags: ['FastAPI Engine', 'Atomic SQLite']
    },
    7: {
      badge: 'LAYER 07 // RESILIENCE PROTOCOL',
      title: 'Offline Disaster Mesh Relay',
      desc: 'Peer-to-peer forwarding protocol designed for multi-hop alert propagation across isolated station clusters when municipal communication backbones are severed.',
      tags: ['P2P Mesh Relay', '100% Offline-First']
    }
  };

  // ==========================================================================
  // AMBIENT NOIR & CRIMSON OP-ART CANVAS (Optimized with Hero IntersectionObserver)
  // ==========================================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId = null;
    let isRunning = false;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let frame = 0;

    // Atmospheric Crimson Orbs (Red & Noir focus)
    const orbs = [
      { x: 0.35, y: 0.40, radius: 0.50, vx: 0.0006, vy: 0.0004, color: 'rgba(239, 68, 68, 0.14)' }, // Crimson Red
      { x: 0.70, y: 0.45, radius: 0.42, vx: -0.0004, vy: 0.0005, color: 'rgba(185, 28, 28, 0.10)' }, // Deep Blood Red
      { x: 0.50, y: 0.80, radius: 0.48, vx: 0.0004, vy: -0.0003, color: 'rgba(255, 255, 255, 0.03)' }  // Ghost Monochrome
    ];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / width;
      mouse.targetY = e.clientY / height;
    }, { passive: true });

    function render() {
      if (!isRunning) return;
      frame++;

      // Ease mouse coordinates for smooth parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render subtle crimson orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;

        const px = (orb.x + (mouse.x - 0.5) * 0.06) * width;
        const py = (orb.y + (mouse.y - 0.5) * 0.06) * height;
        const r = orb.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle Op-Art Concentric Ambient Rings
      const centerX = width * 0.5 + (mouse.x - 0.5) * 20;
      const centerY = height * 0.45 + (mouse.y - 0.5) * 20;
      const baseR = (frame * 0.75) % 120;

      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const ringRadius = baseR + i * 140;
        const alpha = Math.max(0, 0.04 - (ringRadius / (Math.max(width, height) * 0.7)) * 0.04);
        if (alpha > 0.005) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    }

    function stopLoop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    startLoop();

    // Pause rendering when tab is hidden to conserve GPU/CPU
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    // Pause rendering when Hero is scrolled out of viewport
    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      }, { threshold: 0.02 });
      heroObserver.observe(heroSection);
    }
  }

  // ==========================================================================
  // 7-LAYER INTERACTIVE TAB SWITCHER (RESQ ARCHITECTURE)
  // ==========================================================================
  function initLayerTabs() {
    const tabs = document.querySelectorAll('.layer-tab');
    const badgeEl = document.getElementById('layer-inspect-id');
    const titleEl = document.getElementById('layer-inspect-title');
    const descEl = document.getElementById('layer-inspect-desc');
    const tagsEl = document.getElementById('layer-inspect-tags');
    const contentPane = document.getElementById('layer-content');

    if (!tabs.length || !titleEl) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const layerNum = tab.getAttribute('data-layer');
        const data = LAYER_DATA[layerNum];
        if (!data) return;

        // Update active tab styling
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Smooth content swap animation
        if (contentPane) {
          contentPane.style.opacity = '0';
          contentPane.style.transform = 'translateY(4px)';
          contentPane.style.transition = 'opacity 0.11s ease, transform 0.11s ease';

          setTimeout(() => {
            badgeEl.textContent = data.badge;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;

            // Render tags
            tagsEl.innerHTML = '';
            data.tags.forEach((tagText) => {
              const span = document.createElement('span');
              span.className = 'tech-tag';
              span.textContent = tagText;
              tagsEl.appendChild(span);
            });

            contentPane.style.opacity = '1';
            contentPane.style.transform = 'translateY(0)';
          }, 110);
        }
      });
    });
  }

  // ==========================================================================
  // BENTO GRID CATEGORY FILTERING
  // ==========================================================================
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    if (!filterButtons.length || !bentoCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Toggle active button state
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter cards
        bentoCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================================================
  // 1-CLICK EMAIL COPY TO CLIPBOARD WITH FLOATING TOAST
  // ==========================================================================
  function initCopyEmail() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = message;
      toast.classList.add('show');

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy') || 'shazilahmedshaikh@gmail.com';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              showToast(`Copied to clipboard: ${textToCopy}`);
            })
            .catch(() => {
              fallbackCopy(textToCopy);
            });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(`Copied to clipboard: ${text}`);
      } catch (err) {
        showToast(`Direct email: ${text}`);
      }
      document.body.removeChild(textarea);
    }
  }

  // ==========================================================================
  // ACTIVE NAVIGATION DOCK SECTION OBSERVER
  // ==========================================================================
  function initScrollObserver() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    if (!navItems.length || !sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach((item) => {
              if (item.getAttribute('href') === `#${id}`) {
                item.classList.add('active');
              } else {
                item.classList.remove('active');
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  // ==========================================================================
  // LIGHTWEIGHT HERO BUILD + SCROLL REVEALS
  // ==========================================================================
  function initMotionReveals() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroParts = document.querySelectorAll('.hero-flank, .hero-center-col');
    heroParts.forEach((part) => part.classList.add('hero-build'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => heroParts.forEach((part) => part.classList.add('is-built')));
    });

    const revealItems = document.querySelectorAll(
      '.section-header, .flagship-card, .subgrid-card, .bento-card, .stack-grid > .glass-card, .about-grid, .contact-card'
    );
    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    revealItems.forEach((item) => {
      item.classList.add('reveal-item');
      observer.observe(item);
    });
  }

  // ==========================================================================
  // BOOTSTRAP ALL MODULES ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initMotionReveals();
    initAuroraCanvas();
    initLayerTabs();
    initProjectFilters();
    initCopyEmail();
    initScrollObserver();
  });

})();
