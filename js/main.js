/**
 * Diovar Valencia | Portfolio Master Interactive Engine (2026 Edition)
 * Silicon Valley / Awwwards Grade Micro-Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DUAL HERO SPLIT INTERACTIONS
  // =========================================================================
  const designerZone = document.getElementById('designerZone');
  const coderZone = document.getElementById('coderZone');
  const designerCard = document.getElementById('designerCard');
  const coderCard = document.getElementById('coderCard');
  const heroImg = document.getElementById('heroImg');

  if (designerZone && designerCard) {
    designerZone.addEventListener('mouseenter', () => {
      designerCard.style.transform = 'translateY(-10px) scale(1.02)';
      designerCard.style.borderColor = 'var(--designer-coral)';
      designerCard.style.boxShadow = '0 20px 40px rgba(224, 83, 76, 0.15)';
      document.body.classList.add('cursor-designer');
      if (heroImg) heroImg.style.transform = 'scale(1.03) rotate(-0.7deg)';
      playTactileSound(440, 'sine', 0.05);
    });

    designerZone.addEventListener('mouseleave', () => {
      designerCard.style.transform = 'none';
      designerCard.style.borderColor = 'var(--border-light)';
      designerCard.style.boxShadow = 'none';
      document.body.classList.remove('cursor-designer');
      if (heroImg) heroImg.style.transform = 'none';
    });
  }

  if (coderZone && coderCard) {
    coderZone.addEventListener('mouseenter', () => {
      coderCard.style.transform = 'translateY(-10px) scale(1.02)';
      coderCard.style.borderColor = 'var(--coder-cyan)';
      coderCard.style.boxShadow = '0 20px 40px rgba(0, 210, 255, 0.15)';
      document.body.classList.add('cursor-coder');
      if (heroImg) heroImg.style.transform = 'scale(1.03) rotate(0.7deg)';
      playTactileSound(520, 'sine', 0.05);
    });

    coderZone.addEventListener('mouseleave', () => {
      coderCard.style.transform = 'none';
      coderCard.style.borderColor = 'var(--border-light)';
      coderCard.style.boxShadow = 'none';
      document.body.classList.remove('cursor-coder');
      if (heroImg) heroImg.style.transform = 'none';
    });
  }

  // =========================================================================
  // 2. CUSTOM REACTIVE CURSOR
  // =========================================================================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
      cursorRing.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, input, textarea, .project-card, .filter-tab, .sub-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // =========================================================================
  // 3. DYNAMIC SPOTLIGHT HOVER EFFECT
  // =========================================================================
  document.querySelectorAll('.spotlight-card, .project-card, .sub-card, .skill-box').forEach(card => {
    card.classList.add('spotlight-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =========================================================================
  // 4. 3D TILT CARD EFFECT
  // =========================================================================
  document.querySelectorAll('.project-card, .sub-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      const xRot = -(y / (rect.height / 2)) * 6;
      const yRot = (x / (rect.width / 2)) * 6;
      card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // =========================================================================
  // 5. AWWWARDS-GRADE SCROLL REVEAL & STATS COUNTER
  // =========================================================================
  const revealElements = document.querySelectorAll(
    '.section-header, .project-card, .sub-card, .stat-item, .saas-grid, .flagship-grid, .skill-box, .contact-card-box, .contact-form'
  );

  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Numbers Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.innerText.trim();
        if (text.includes('100%')) {
          animateCount(el, 0, 100, '%');
        } else if (text.includes('+10') || text === '10') {
          animateCount(el, 0, 10, '+', true);
        } else if (text === '3') {
          animateCount(el, 0, 3, '');
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(st => counterObserver.observe(st));

  function animateCount(element, start, end, suffix = '', prefixPlus = false) {
    let current = start;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        element.innerText = prefixPlus ? `+${end}${suffix}` : `${end}${suffix}`;
        clearInterval(timer);
      } else {
        const val = Math.ceil(current);
        element.innerText = prefixPlus ? `+${val}${suffix}` : `${val}${suffix}`;
      }
    }, stepTime);
  }

  // =========================================================================
  // 6. CATEGORY FILTER TABS
  // =========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileSound(580, 'triangle', 0.04);

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // =========================================================================
  // 7. LIVE CODE TERMINAL IN SCADOSAI SECTION
  // =========================================================================
  const codeSnippets = {
    fastapi: `<span class="code-comment"># backend/main.py • FastAPI Microservice Architecture</span>
<span class="code-keyword">from</span> fastapi <span class="code-keyword">import</span> FastAPI, Depends, HTTPException, status
<span class="code-keyword">from</span> sqlalchemy.orm <span class="code-keyword">import</span> Session
<span class="code-keyword">from</span> app.core.security <span class="code-keyword">import</span> get_current_user, create_jwt_token
<span class="code-keyword">from</span> app.database <span class="code-keyword">import</span> get_db

app = FastAPI(title=<span class="code-str">"ScaDosai AI Core Engine"</span>, version=<span class="code-str">"2.4.0"</span>)

<span class="code-keyword">@app.post</span>(<span class="code-str">"/api/v1/projects/generate"</span>, status_code=status.HTTP_201_CREATED)
<span class="code-keyword">async def</span> <span class="code-fn">generate_scaffold</span>(payload: dict, db: Session = Depends(get_db)):
    <span class="code-comment"># Multi-tenant execution with async task queue</span>
    task_id = <span class="code-keyword">await</span> engine.dispatch_async_build(payload)
    <span class="code-keyword">return</span> {<span class="code-str">"status"</span>: <span class="code-str">"success"</span>, <span class="code-str">"latency_ms"</span>: 24, <span class="code-str">"task_id"</span>: task_id}`,

    react: `<span class="code-comment">// frontend/src/components/AnalyticsDashboard.tsx</span>
<span class="code-keyword">import</span> React, { useState, useEffect } <span class="code-keyword">from</span> <span class="code-str">'react'</span>;
<span class="code-keyword">import</span> { motion } <span class="code-keyword">from</span> <span class="code-str">'framer-motion'</span>;
<span class="code-keyword">import</span> { useScaDosaiMetrics } <span class="code-keyword">from</span> <span class="code-str">'@scadosai/sdk-react'</span>;

<span class="code-keyword">export const</span> <span class="code-fn">AnalyticsDashboard</span> = () =&gt; {
  <span class="code-keyword">const</span> { telemetry, latency, status } = useScaDosaiMetrics();

  <span class="code-keyword">return</span> (
    &lt;<span class="code-keyword">motion.div</span> initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=<span class="code-str">"saas-hud"</span>&gt;
      &lt;<span class="code-keyword">TelemetryGauge</span> value={telemetry.throughput} latency={<span class="code-str">\`\${latency}ms\`</span>} /&gt;
    &lt;/<span class="code-keyword">motion.div</span>&gt;
  );
};`,

    sql: `<span class="code-comment">-- database/schema.sql • Scalable Multi-Tenant Relational Schema</span>
<span class="code-keyword">CREATE TABLE</span> <span class="code-fn">tenants</span> (
    id <span class="code-keyword">VARCHAR(36) PRIMARY KEY</span>,
    organization_name <span class="code-keyword">VARCHAR(100) NOT NULL</span>,
    tier <span class="code-keyword">ENUM</span>(<span class="code-str">'PRO'</span>, <span class="code-str">'ENTERPRISE'</span>) <span class="code-keyword">DEFAULT</span> <span class="code-str">'PRO'</span>,
    created_at <span class="code-keyword">TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span>
);

<span class="code-keyword">CREATE TABLE</span> <span class="code-fn">api_logs</span> (
    id <span class="code-keyword">BIGINT AUTO_INCREMENT PRIMARY KEY</span>,
    tenant_id <span class="code-keyword">VARCHAR(36) REFERENCES</span> tenants(id),
    endpoint <span class="code-keyword">VARCHAR(255) NOT NULL</span>,
    response_time_ms <span class="code-keyword">FLOAT NOT NULL</span>,
    <span class="code-keyword">INDEX</span> idx_tenant_time (tenant_id, created_at)
);`
  };

  const terminalCodeBody = document.getElementById('terminalCodeBody');
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const terminalRunBtn = document.getElementById('terminalRunBtn');
  const terminalStatusBadge = document.getElementById('terminalStatusBadge');

  if (terminalCodeBody && terminalTabs.length > 0) {
    terminalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        terminalTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const lang = tab.getAttribute('data-lang');
        terminalCodeBody.innerHTML = codeSnippets[lang] || '';
        playTactileSound(600, 'sine', 0.03);
      });
    });
  }

  if (terminalRunBtn && terminalStatusBadge) {
    terminalRunBtn.addEventListener('click', () => {
      playTactileSound(880, 'triangle', 0.08);
      terminalRunBtn.innerHTML = '⚡ Ejecutando...';
      terminalStatusBadge.innerText = 'STATUS: BUILDING ⏳';
      terminalStatusBadge.style.color = '#F59E0B';

      setTimeout(() => {
        terminalRunBtn.innerHTML = '✓ 200 OK (24ms)';
        terminalStatusBadge.innerText = 'STATUS: 200 OK • ONLINE 🚀';
        terminalStatusBadge.style.color = '#10B981';

        setTimeout(() => {
          terminalRunBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Test API Endpoint';
        }, 3500);
      }, 700);
    });
  }

  // =========================================================================
  // 8. RICH PROJECT MODAL / DRAWER (LIGHTBOX DETAIL PREVIEW)
  // =========================================================================
  const projectDataModal = {
    scadosai: {
      title: "ScaDosai — Plataforma SaaS Multi-Tenant",
      category: "Full-Stack SaaS • Python FastAPI & React",
      img: "assets/img/scadosai-dashboard.png",
      desc: "Plataforma SaaS en producción diseñada para gestión automatizada, despliegues y telemetría de microservicios con autenticación JWT, roles granulares y base de datos relacional optimizada.",
      tech: ["Python", "FastAPI", "React", "TypeScript", "MySQL", "Docker", "Tailwind CSS"],
      metrics: ["Latencia API <25ms", "Arquitectura Multi-Tenant", "100% Type-Safe"],
      github: "https://github.com/diovarvalencia2025-a11y/scadosai"
    },
    burdina: {
      title: "BURDINA Asador — Gastronomía de Alto Nivel",
      category: "Experiencia Gastronómica & Video 4K",
      img: "assets/img/burdina-carnes.png",
      desc: "Portal web para asador gastronómico en Bilbao. Integra un reproductor de video HTML5 cinematográfico, carta digital de cortes madurados Dry-Aged y sistema de reservas online.",
      tech: ["HTML5", "CSS3 Vanilla", "JavaScript", "Video 4K", "Design System"],
      metrics: ["Carga Ultra Rápida", "Experiencia Inmersiva", "Reserva de Mesas Directa"],
      github: "https://github.com/diovarvalencia2025-a11y/burdina"
    },
    villalumina: {
      title: "Villa Lumina — Residencia de Ultra Lujo (28.5M €)",
      category: "Real Estate de Alta Gama & FPV Scrollytelling",
      img: "assets/img/villalumina.png",
      desc: "Showcase inmobiliario de ultra lujo para una mansión valorada en 28.500.000 €. Cuenta con un recorrido FPV scrollytelling en 4K, planos arquitectónicos con hotspots interactivos y calculadora financiera de ROI.",
      tech: ["Framer Motion", "React / Vite", "Tailwind CSS", "Scrollytelling", "Web Audio API"],
      metrics: ["Tour Pinned 450vh", "Calculadora ROI UHNW", "Hotspots 3D"],
      demo: "mansion-aura-luxury/index.html"
    }
  };

  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalTechChips = document.getElementById('modalTechChips');
  const modalMetrics = document.getElementById('modalMetrics');
  const modalActionLink = document.getElementById('modalActionLink');

  function openProjectModal(key) {
    const data = projectDataModal[key] || projectDataModal['scadosai'];
    if (!modalBackdrop) return;

    if (modalTitle) modalTitle.innerText = data.title;
    if (modalCategory) modalCategory.innerText = data.category;
    if (modalImg) modalImg.src = data.img;
    if (modalDesc) modalDesc.innerText = data.desc;

    if (modalTechChips) {
      modalTechChips.innerHTML = data.tech.map(t => `<span class="tech-pill">${t}</span>`).join('');
    }

    if (modalMetrics) {
      modalMetrics.innerHTML = data.metrics.map(m => `
        <div style="background: rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); font-size: 0.8rem; font-family: var(--font-mono); color: #38BDF8;">
          ✓ ${m}
        </div>
      `).join('');
    }

    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    playTactileSound(500, 'sine', 0.05);
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // Attach modal trigger to project cards with data-modal-key
  document.querySelectorAll('[data-modal-key]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-modal-key');
      openProjectModal(key);
    });
  });

  // =========================================================================
  // 9. WEB AUDIO API TACTILE SYNTHESIZER
  // =========================================================================
  let audioCtx = null;
  let soundEnabled = true;

  function playTactileSound(freq = 440, type = 'sine', duration = 0.05) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context silently ignored if blocked
    }
  }

  const soundToggleBtn = document.getElementById('soundToggleBtn');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.innerHTML = soundEnabled 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
      if (soundEnabled) playTactileSound(600, 'sine', 0.08);
    });
  }

  // =========================================================================
  // 10. CONTACT FORM HANDLER
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Enviando mensaje...';
      playTactileSound(520, 'sine', 0.08);

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        contactForm.reset();
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo en menos de 2 horas.');
      }, 700);
    });
  }
});
