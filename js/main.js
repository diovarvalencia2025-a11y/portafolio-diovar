/**
 * Diovar Valencia | Portfolio Master Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Dual Hero Split Interactions
  const designerZone = document.getElementById('designerZone');
  const coderZone = document.getElementById('coderZone');
  const designerCard = document.getElementById('designerCard');
  const coderCard = document.getElementById('coderCard');
  const heroImg = document.getElementById('heroImg');

  if (designerZone && designerCard) {
    designerZone.addEventListener('mouseenter', () => {
      designerCard.style.transform = 'translateY(-8px) scale(1.02)';
      designerCard.style.borderColor = 'var(--designer-coral)';
      if (heroImg) heroImg.style.transform = 'scale(1.02) rotate(-0.5deg)';
    });

    designerZone.addEventListener('mouseleave', () => {
      designerCard.style.transform = 'none';
      designerCard.style.borderColor = 'var(--border-light)';
      if (heroImg) heroImg.style.transform = 'none';
    });
  }

  if (coderZone && coderCard) {
    coderZone.addEventListener('mouseenter', () => {
      coderCard.style.transform = 'translateY(-8px) scale(1.02)';
      coderCard.style.borderColor = 'var(--coder-cyan)';
      if (heroImg) heroImg.style.transform = 'scale(1.02) rotate(0.5deg)';
    });

    coderZone.addEventListener('mouseleave', () => {
      coderCard.style.transform = 'none';
      coderCard.style.borderColor = 'var(--border-light)';
      if (heroImg) heroImg.style.transform = 'none';
    });
  }

  // 2. Category Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
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

  // 3. Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Enviando mensaje...';

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        contactForm.reset();
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.');
      }, 700);
    });
  }
});
