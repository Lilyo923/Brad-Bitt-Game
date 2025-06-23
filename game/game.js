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
