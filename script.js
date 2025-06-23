const title = document.getElementById('gameTitle');
const subtitle = document.getElementById('gameSubtitle');
const menu = document.getElementById('menu');
const muteButton = document.getElementById('muteButton');

const audio = new Audio("https://raw.githubusercontent.com/Lilyo923/Brad-Bitt-Game-OST/main/menu.mp3");
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
      <p>Site imaginé par Brad Bitt.</p>
      <p>Musique : échantillons créés par Mixvibes, assemblés par Lilyo.</p>
    `;
    creditsText.style.display = 'block';
  } else {
    creditsText.style.display = 'none';
  }
});

document.getElementById('newGameBtn')?.addEventListener('click', () => {
  window.location.href = 'game/game.html';
});
