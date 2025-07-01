const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Joueur
const player = {
  x: 100,
  y: canvas.height - 140,
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

// Contrôles
const keys = { left: false, right: false };

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "q") keys.left = true;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
  if ([" ", "ArrowUp", "z"].includes(e.key)) jump();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "q") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

function jump() {
  if (!player.jumping) {
    player.vy = -10;
    player.jumping = true;
  }
}

const jumpButton = document.getElementById('jumpButton');
if (jumpButton) {
  jumpButton.addEventListener('click', jump);
}

// Plateformes élargies
const platforms = [
  { x: 250, y: canvas.height - 150, width: 180, height: 12 },
  { x: 500, y: canvas.height - 230, width: 180, height: 12, hasSpikes: true },
  { x: 800, y: canvas.height - 310, width: 200, height: 12 }
];

let spikesActive = true;

const button = { x: 400, y: ground.y - 30, width: 30, height: 30, pressed: false };

// Pièces rapprochées sur les plateformes
const coins = [
  { x: 270, y: canvas.height - 180, collected: false },
  { x: 520, y: canvas.height - 260, collected: false },
  { x: 820, y: canvas.height - 340, collected: false }
];
let coinCount = 0;

function update() {
  player.vx = 0;
  if (keys.left) player.vx = -player.speed;
  if (keys.right) player.vx = player.speed;

  if (window.joystick && window.joystick.distance > 10) {
    const angle = window.joystick.angle;
    if (angle > 135 && angle < 225) player.vx = -player.speed;
    if (angle < 45 || angle > 315) player.vx = player.speed;
  }

  player.x += player.vx;
  player.y += player.vy;
  player.vy += player.gravity;

  // Sol
  if (player.y + player.height >= ground.y) {
    player.y = ground.y - player.height;
    player.vy = 0;
    player.jumping = false;
  }

  // Plateformes
  platforms.forEach(p => {
    if (
      player.x + player.width > p.x &&
      player.x < p.x + p.width &&
      player.y + player.height > p.y &&
      player.y + player.height < p.y + p.height + 10 &&
      player.vy >= 0
    ) {
      player.y = p.y - player.height;
      player.vy = 0;
      player.jumping = false;
    }

    // ❗ Si pics actifs, vérifier collision mortelle
    if (p.hasSpikes && spikesActive) {
      const spikeHeight = 20;
      const spikeY = p.y - spikeHeight;
      if (
        player.x + player.width > p.x &&
        player.x < p.x + p.width &&
        player.y + player.height > spikeY &&
        player.y < p.y &&
        player.vy >= 0
      ) {
        // "Mort" => repositionner au départ
        player.x = 100;
        player.y = canvas.height - 140;
        player.vy = 0;
        player.jumping = false;
      }
    }
  });

  // Bouton
  if (
    player.x + player.width > button.x &&
    player.x < button.x + button.width &&
    player.y + player.height > button.y &&
    player.y < button.y + button.height
  ) {
    button.pressed = true;
    spikesActive = false;
  }

  // Pièces
  coins.forEach(coin => {
    if (
      !coin.collected &&
      player.x + player.width > coin.x &&
      player.x < coin.x + 20 &&
      player.y + player.height > coin.y &&
      player.y < coin.y + 20
    ) {
      coin.collected = true;
      coinCount++;
    }
  });

  // Transition
  if (player.x > 1000 && player.y < platforms[2].y) {
    console.log("Scène suivante !");
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sol
  ctx.fillStyle = ground.color;
  ctx.fillRect(0, ground.y, canvas.width, ground.height);

  // Plateformes
  platforms.forEach(p => {
    ctx.fillStyle = "#ccc";
    ctx.fillRect(p.x, p.y, p.width, p.height);

    if (p.hasSpikes && spikesActive) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.width / 2, p.y - 20);
      ctx.lineTo(p.x + p.width, p.y);
      ctx.fill();
    }
  });

  // Bouton
  ctx.fillStyle = button.pressed ? "green" : "orange";
  ctx.fillRect(button.x, button.y, button.width, button.height);

  // Pièces
  coins.forEach(coin => {
    if (!coin.collected) {
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, 10, 0, Math
