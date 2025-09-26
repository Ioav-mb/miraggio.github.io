// Poblar galería con assets/galeria (sin captions)
const gallery = document.getElementById('gallery');

// Archivos según tu carpeta
const images = [
  'hero-principal.jpg',
  'fachada-01.jpg',
  // interiores 01..27
  ...Array.from({length:27}, (_,i)=>`interior-${String(i+1).padStart(2,'0')}.jpg`)
];

function renderGallery(){
  const frag = document.createDocumentFragment();
  images.forEach(file => {
    const fig = document.createElement('figure');
    fig.className = 'g-item';
    fig.innerHTML = `<img src="assets/galeria/${file}" alt="Imagen de galería" loading="lazy" decoding="async">`;
    frag.appendChild(fig);
  });
  gallery.appendChild(frag);
}
renderGallery();

// Lightbox (solo imagen)
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('.lb-img');
const lbClose = lb.querySelector('.lb-close');

gallery.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;
  lbImg.src = img.src;
  lb.removeAttribute('hidden');
});
lbClose.addEventListener('click', () => lb.setAttribute('hidden',''));
lb.addEventListener('click', (e) => { if (e.target === lb) lb.setAttribute('hidden',''); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !lb.hasAttribute('hidden')) lb.setAttribute('hidden',''); });
