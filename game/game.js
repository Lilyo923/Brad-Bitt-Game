const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Petit test : dessiner Brad Bitt version pixel 😅
ctx.fillStyle = "#ff4d4d";
ctx.fillRect(50, 50, 50, 50); // bloc rouge = joueur test
ctx.font = "16px Arial";
ctx.fillStyle = "#fff";
ctx.fillText("Brad Bitt ?", 50, 45);

function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

if (isMobile()) {
  const joystickContainer = document.getElementById('joystick-container');
  joystickContainer.classList.remove('joystick-hidden');

  const joystick = document.getElementById('joystick');
  let origin = null;

  joystick.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    origin = { x: touch.clientX, y: touch.clientY };
  });

  joystick.addEventListener('touchmove', (e) => {
    if (!origin) return;

    const touch = e.touches[0];
    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;

    // Exemple : à adapter à tes déplacements plus tard
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20) console.log("Droite");
      else if (dx < -20) console.log("Gauche");
    } else {
      if (dy > 20) console.log("Bas");
      else if (dy < -20) console.log("Haut");
    }
  });

  joystick.addEventListener('touchend', () => {
    origin = null;
  });
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Adapter le canvas à l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Joueur (Brad Bitt)
const player = {
  x: 100,
  y: 100,
  width: 40,
  height: 40,
  color: '#ff4d4d',
  speed: 3,
  dx: 0,
  dy: 0
};

// Contrôles clavier
const keys = {};
window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

// Contrôle avec joystick (si présent)
function handleJoystick() {
  if (typeof joystick !== 'undefined') {
    const angle = joystick.angle;
    const distance = joystick.distance;

    const rad = angle * (Math.PI / 180);
    player.dx = Math.cos(rad) * distance * 0.1;
    player.dy = Math.sin(rad) * distance * 0.1;
  }
}

// Contrôle clavier
function handleKeys() {
  player.dx = 0;
  player.dy = 0;

  if (keys['ArrowRight'] || keys['d']) player.dx = player.speed;
  if (keys['ArrowLeft'] || keys['q']) player.dx = -player.speed;
  if (keys['ArrowUp'] || keys['z']) player.dy = -player.speed;
  if (keys['ArrowDown'] || keys['s']) player.dy = player.speed;
}

// Mise à jour du joueur
function movePlayer() {
  handleKeys();
  handleJoystick();

  player.x += player.dx;
  player.y += player.dy;
}

// Dessin du joueur
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Boucle principale
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  drawPlayer();
  requestAnimationFrame(update);
}

update();
