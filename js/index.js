import UI from "./ui.js";
import Games from "./games.js";

const fetchAndDisplayGames = async (category) => {
  const games = new Games();
  UI.showLoader();
  const gameData = await games.fetchGames(category);
  UI.hideLoader();
  UI.displayGames(gameData);
};

const navigateCategory = () => {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      const category = e.target.innerHTML.toLowerCase();
      navLinks.forEach((navLink) => {
        navLink.classList.remove("active");
      });
      link.classList.add("active");
      await fetchAndDisplayGames(category);
    });
  });
};

const showDefaultCategory = (category) => {
  navigateCategory();
  fetchAndDisplayGames(category);
};

showDefaultCategory("mmorpg");
