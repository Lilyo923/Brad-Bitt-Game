const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

muteBtn.addEventListener("click", () => {
  bgMusic.muted = !bgMusic.muted;
  muteBtn.textContent = bgMusic.muted ? "Unmute" : "Mute";
});

// BONUS : afficher les crédits quand on clique sur le bouton crédits
const creditsBtn = document.getElementById("creditsBtn");
creditsBtn.addEventListener("click", () => {
  alert("Site imaginé par Lilyo\nMusique : échantillons créés par Remixlive, assemblés par Lilyo");
});
