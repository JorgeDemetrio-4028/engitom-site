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
