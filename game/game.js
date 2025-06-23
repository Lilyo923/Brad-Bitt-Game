const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Petit test : dessiner Brad Bitt version pixel 😅
ctx.fillStyle = "#ff4d4d";
ctx.fillRect(50, 50, 50, 50); // bloc rouge = joueur test
ctx.font = "16px Arial";
ctx.fillStyle = "#fff";
ctx.fillText("Brad Bitt ?", 50, 45);
