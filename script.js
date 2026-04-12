// =============================================
//  ENGITOM — Engenharia e Construções
//  script.js
// =============================================

// ─── Animações de entrada ao fazer scroll ────

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// ─── Navegação suave para âncoras ────────────

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Galeria de projetos com filtros e lightbox ───

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightboxOverlay = document.querySelector('.project-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentGalleryIndex = 0;

const getVisibleGalleryItems = () => galleryItems.filter((item) => !item.hidden);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    galleryItems.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });
});

const updateLightbox = () => {
  const current = galleryItems[currentGalleryIndex];
  if (!current) {
    return;
  }

  const img = current.querySelector('img');
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt || '';
  lightboxCaption.textContent = current.dataset.caption || '';
};

const openLightbox = (index) => {
  currentGalleryIndex = index;
  updateLightbox();
  lightboxOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

const showLightboxItem = (direction) => {
  const visible = getVisibleGalleryItems();
  if (!visible.length) {
    return;
  }

  const currentVisibleIndex = visible.indexOf(galleryItems[currentGalleryIndex]);
  const nextVisibleIndex = (currentVisibleIndex + direction + visible.length) % visible.length;
  const nextItem = visible[nextVisibleIndex];
  currentGalleryIndex = galleryItems.indexOf(nextItem);
  updateLightbox();
};

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxOverlay?.addEventListener('click', (event) => {
  if (event.target === lightboxOverlay) {
    closeLightbox();
  }
});
lightboxNext?.addEventListener('click', () => showLightboxItem(1));
lightboxPrev?.addEventListener('click', () => showLightboxItem(-1));
document.addEventListener('keydown', (event) => {
  if (!lightboxOverlay?.classList.contains('active')) {
    return;
  }

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowRight') {
    showLightboxItem(1);
  }

  if (event.key === 'ArrowLeft') {
    showLightboxItem(-1);
  }
});

// ─── Formulário de contacto ───────────────────
//  Para ativar o envio real de emails, regista-te
//  em https://formspree.io e substitui o endpoint
//  abaixo pelo teu próprio (ex: https://formspree.io/f/XXXXXXXX)

const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'A enviar...';
    btn.disabled = true;

    // ── Substitui este URL pelo teu endpoint do Formspree ──
    const FORMSPREE_URL = 'https://formspree.io/f/SEU_ID_AQUI';

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        btn.textContent = 'Mensagem enviada!';
        form.reset();
      } else {
        btn.textContent = 'Erro — tenta novamente';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Erro — tenta novamente';
      btn.disabled = false;
    }
  });
}
