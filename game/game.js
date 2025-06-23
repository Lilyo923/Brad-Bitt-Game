const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adapter le canvas à l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Représentation du joueur (Brad Bitt)
const player = {
  x: 100,
  y: canvas.height - 100,
  width: 40,
  height: 40,
  color: '#ff4d4d',
  speed: 3,
  vx: 0,
  vy: 0,
  gravity: 0.5,
  jumping: false
};

// Touches clavier
const keys = {
  left: false,
  right: false,
  up: false
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

// Saut
function jump() {
  if (!player.jumping) {
    player.vy = -10;
    player.jumping = true;
  }
}

// Joystick (si mobile)
if (/Mobi|Android/i.test(navigator.userAgent)) {
  window.joystick = { angle: 0, distance: 0 };

  const joystickZone = document.getElementById('joystickZone');
  const manager = nipplejs.create({
    zone: joystickZone,
    mode: 'static',
    position: { left: '60px', bottom: '60px' },
    color: 'red'
  });

  manager.on('move', (evt, data) => {
    if (data && data.angle) {
      window.joystick.angle = data.angle.degree;
      window.joystick.distance = data.distance;
    }
  });

  manager.on('end', () => {
    window.joystick.angle = 0;
    window.joystick.distance = 0;
  });
}

// Bouton saut mobile
const jumpButton = document.getElementById('jumpButton');
if (jumpButton) {
  jumpButton.addEventListener('click', jump);
}

// Mouvements
function handleMovement() {
  player.vx = 0;

  // Clavier
  if (keys.left) player.vx = -player.speed;
  if (keys.right) player.vx = player.speed
