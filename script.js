const title = document.getElementById('gameTitle');
const subtitle = document.getElementById('gameSubtitle');
const menu = document.getElementById('menu');
const muteButton = document.getElementById('muteButton');

const audio = new Audio("https://www.dropbox.com/scl/fi/z4i33e10xspc5ip1xlvd3/menu.mp3?rlkey=0l8nvmfnqv7fkwiwt581l7j8y&raw=1");
audio.loop = true;

title.addEventListener('click', () => {
  // Réduire le titre
  title.classList.add('small-title');
  subtitle.classList.add('small-subtitle');

  // Afficher menu + mute
  menu.style.display = 'block';
  muteButton.style.display = 'inline-block';

  // Lancer musique
  audio.play().catch(() => {
    // Fallback si autoplay bloqué
    document.body.addEventListener('click', () => audio.play(), { once: true });
  });
});

muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
});

const creditsBtn = document.getElementById('creditsBtn');
const creditsText = document.getElementById('creditsText');

creditsBtn.addEventListener('click', () => {
  if (creditsText.style.display === 'none') {
    creditsText.innerHTML = `
      <p>Site imaginé par Hippolyte & Brad Bitt.</p>
      <p>Musique : échantillons créés par Mixvibes, assemblés par Lilyo.</p>
    `;
    creditsText.style.display = 'block';
  } else {
    creditsText.style.display = 'none';
  }
});
