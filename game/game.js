const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adapter le canvas à l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Représentation du joueur
const player = {
  x: 100,
  y: canvas.height - 140, // un peu au-dessus du sol
  width: 40,
  height: 40,
  color: '#ff4d4d',
  speed: 3,
  vx: 0,
  vy: 0,
  gravity: 0.5,
  jumping: false
};

// Sol
const ground = {
  y: canvas.height - 100,
  height: 100,
  color: '#333'
};

// Touches clavier
const keys = {
  left: false,
  right: false
};

// Gestion du clavier
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "q") keys.left = true;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
  if (e.key === " " || e.key === "ArrowUp" || e.key === "z") jump();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "q") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

// Fonction saut
function jump() {
  if (!player.jumping) {
    player.vy = -12;
    player.jumping = true;
  }
}

// Bouton saut mobile
const jumpButton = document.getElementById('jumpButton');
if (jumpButton) {
  jumpButton.addEventListener('click', jump);
}

// Mouvement + gravité
function update() {
  // Gérer les touches clavier
  player.vx = 0;
  if (keys.left) player.vx = -player.speed;
  if (keys.right) player.vx = player.speed;

  // Gérer le joystick mobile
  if (window.joystick && window.joystick.distance > 10) {
    const angle = window.joystick.angle;
    if (angle > 135 && angle < 225) player.vx = -player.speed; // gauche
    if (angle < 45 || angle > 315) player.vx = player.speed;  // droite
  }

  // Appliquer le mouvement
  player.x += player.vx;
  player.y += player.vy;
  player.vy += player.gravity;

  // Collision avec le sol
  if (player.y + player.height >= ground.y) {
    player.y = ground.y - player.height;
    player.vy = 0;
    player.jumping = false;
  }
}

// Affichage
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sol
  ctx.fillStyle = ground.color;
  ctx.fillRect(0, ground.y, canvas.width, ground.height);

  // Joueur
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Boucle principale
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
