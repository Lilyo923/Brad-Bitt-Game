document.addEventListener("DOMContentLoaded", () => {
  const mainTitle = document.getElementById("main-title");
  const subTitle = document.getElementById("sub-title");
  const menu = document.getElementById("menu");

  function showMenu() {
    mainTitle.style.fontSize = "2em";
    subTitle.style.fontSize = "0.8em";
    menu.style.display = "flex";
  }

  // Un clic n'importe où pour commencer
  document.body.addEventListener("click", function handler() {
    showMenu();
    document.body.removeEventListener("click", handler);
  });

  // À terme : détecter si une sauvegarde existe (exemple)
  if (localStorage.getItem("brad_save")) {
    document.getElementById("continue").disabled = false;
  }
});
