// Toggle del menú móvil (desplegable con animación)
const btn = document.getElementById('menuBtn');
const drawer = document.getElementById('mobileMenu');

btn?.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  const next = !open;
  btn.setAttribute('aria-expanded', String(next));
  drawer.hidden = !next; // mostrar/ocultar realmente el contenedor
  drawer.classList.toggle('open', next);
});

const header = document.getElementById('siteHeader');

// Sombra en header al hacer scroll
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 4);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Cerrar menú móvil al navegar
drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  btn.setAttribute('aria-expanded', 'false');
  drawer.hidden = true;
  drawer.classList.remove('open');
}));

// ===== Envío del formulario sin recargar (mensaje de enviado) =====
(function () {
  const f = document.getElementById('contactForm');
  if (!f) return;
  const status = document.getElementById('formStatus');
  const submitBtn = f.querySelector('button[type="submit"]');

  function setErr(id, msg) {
    const el = f.querySelector(`[data-err-for="${id}"]`);
    if (el) el.textContent = msg || '';
  }
  const validEmail = v => /.+@.+\..+/.test(v);

  f.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita scroll al inicio/recarga

    // Limpia errores previos
    setErr('name'); setErr('email'); setErr('message');
    status.textContent = '';

    const data = Object.fromEntries(new FormData(f).entries());
    let ok = true;

    if (!data.name || data.name.trim().length < 2) { setErr('name', 'Ingresá tu nombre.'); ok = false; }
    if (!validEmail(data.email || '')) { setErr('email', 'Ingresá un email válido.'); ok = false; }
    if (!data.message || data.message.trim().length < 5) { setErr('message', 'Escribí un mensaje.'); ok = false; }

    if (!ok) return;

    // Simulación de envío
    submitBtn.disabled = true;
    status.textContent = 'Enviando…';
    setTimeout(() => {
      status.textContent = '¡Mensaje enviado! Te responderemos a la brevedad.';
      submitBtn.disabled = false;
      f.reset();
    }, 700);
  });
})();
