const title = document.getElementById('gameTitle');
const subtitle = document.getElementById('gameSubtitle');
const menu = document.getElementById('menu');
const settingsMenu = document.getElementById('settingsMenu');
const muteButton = document.getElementById('muteButton');
const backToMenu = document.getElementById('backToMenu');
const creditsBtn = document.getElementById('creditsBtn');
const creditsText = document.getElementById('creditsText');
const achievementsBtn = document.getElementById('achievementsBtn');
const achievementsText = document.getElementById('achievementsText');
const settingsBtn = document.getElementById('settingsBtn');

const audio = new Audio("https://raw.githubusercontent.com/Lilyo923/Brad-Bitt-Game-OST/main/menu.mp3");
audio.loop = true;

// Lancer la musique au clic sur le titre
title.addEventListener('click', () => {
  title.classList.add('small-title');
  subtitle.classList.add('small-subtitle');
  menu.classList.remove('hidden');

  audio.play().catch(() => {
    document.body.addEventListener('click', () => audio.play(), { once: true });
  });
});

// Mute
muteButton.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteButton.textContent = audio.muted ? 'Unmute' : 'Mute';
});

// Navigation entre menus
settingsBtn.addEventListener('click', () => {
  menu.classList.add('hidden');
  settingsMenu.classList.remove('hidden');
});

backToMenu.addEventListener('click', () => {
  settingsMenu.classList.add('hidden');
  creditsText.classList.add('hidden');
  achievementsText.classList.add('hidden');
  menu.classList.remove('hidden');
});

// Crédits
creditsBtn.addEventListener('click', () => {
  creditsText.classList.toggle('hidden');
  achievementsText.classList.add('hidden');
});

// Succès
achievementsBtn.addEventListener('click', () => {
  achievementsText.classList.toggle('hidden');
  creditsText.classList.add('hidden');
});

// Lancement du jeu
document.getElementById('newGameBtn')?.addEventListener('click', () => {
  window.location.href = 'game/game.html';
});
