/** Toggle language with fade animation **/
document.getElementById('toggle-lang').addEventListener('click', function() {
  const html = document.documentElement;
  const isFr = html.getAttribute('data-lang') === 'fr';
  const showClass = isFr ? 'lang-en' : 'lang-fr';
  const hideClass = isFr ? 'lang-fr' : 'lang-en';
  const showEls = document.querySelectorAll('.' + showClass);
  const hideEls = document.querySelectorAll('.' + hideClass);

  // 1) fade out current language
  hideEls.forEach(el => el.classList.add('hidden-lang'));

  // 2) after fade-out, swap visibility and fade in
  setTimeout(() => {
    hideEls.forEach(el => {
      el.classList.toggle('d-none');
      el.classList.remove('hidden-lang');
    });
    showEls.forEach(el => {
      el.classList.toggle('d-none');
      el.classList.add('hidden-lang');
      // force reflow to restart transition
      void el.offsetWidth;
      el.classList.remove('hidden-lang');
    });
    // 3) update attribute & button text
    html.setAttribute('data-lang', isFr ? 'en' : 'fr');
    this.textContent = isFr ? 'FR' : 'EN';
  }, 400);
});

/** Back to top button **/
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) backBtn.style.display = 'block';
  else backBtn.style.display = 'none';
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Animate admission bars on load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#admission .progress-bar').forEach(bar => {
    const target = bar.getAttribute('data-target') + '%';
    setTimeout(() => bar.style.width = target, 500);
  });
});

// Initialize Leaflet map
window.addEventListener('load', () => {
  var map = L.map('map').setView([43.34696802439427,  3.2221528491375926], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([43.34696802439427,  3.2221528491375926]).addTo(map)
    .bindPopup('IUT Béziers').openPopup();
});

// Effet Tilt sur toutes les cartes
document.addEventListener('DOMContentLoaded', () => {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 15,            // inclinaison max en degrés
    speed: 400,         // vitesse de retour à plat
    scale: 1.05,        // léger zoom au survol
    glare: true,        // effet “glare”
    'max-glare': 0.2    // intensité du glare
  });
});

