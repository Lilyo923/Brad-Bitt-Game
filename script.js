// Lancer la musique
const audio = new Audio("https://www.dropbox.com/scl/fi/z4i33e10xspc5ip1xlvd3/menu.mp3?rlkey=0l8nvmfnqv7fkwiwt581l7j8y&raw=1");
audio.loop = true;
audio.play().catch(() => {
  // Certains navigateurs bloquent l'autoplay, on attend un clic
  document.body.addEventListener('click', () => audio.play(), { once: true });
});

// Mute / Unmute
const muteButton = document.getElementById('muteButton');
muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
});

// Gestion du titre et affichage du menu
const title = document.getElementById('gameTitle');
const subtitle = document.getElementById('gameSubtitle');
const menu = document.getElementById('menu');
const continueBtn = document.getElementById('continueBtn');

// Détection sauvegarde (simple exemple avec localStorage)
if (localStorage.getItem('saveExists')) {
  continueBtn.disabled = false;
}

title.addEventListener('click', () => {
  title.classList.add('small-title');
  subtitle.classList.add('small-subtitle');
  menu.style.display = 'block';
});
