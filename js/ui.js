import Details from "./details.js";

export default class UI {
  static showLoader() {
    const loader = document.querySelector(".loading");
    loader.classList.remove("d-none");
  }

  static hideLoader() {
    const loader = document.querySelector(".loading");
    loader.classList.add("d-none");
  }

  static displayGames(gameData) {
    const rowContainer = document.querySelector(".game-row");
    rowContainer.innerHTML = "";

    gameData.forEach((game) => {
      const shortDesc = game.short_description.slice(0, 100) + "...";
      const mainCol = document.createElement("div");
      mainCol.classList.add("col-md-6", "col-lg-4", "col-xl-3", "g-4");
      mainCol.innerHTML = `
        <div class="game-card h-100">
          <div class="card h-100 bg-transparent" role="button">
            <div class="card-content">
              <div class="game-img">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-100">
              </div>
              <div class="game-caption mt-3">
                <div class="game-header d-flex align-items-center justify-content-between">
                  <h3 class="small text-white">${game.title}</h3>
                  <span class="badge p-2 text-bg-primary">${game.developer}</span>
                </div>
                <p class="text-center small opacity-50 mt-2">${shortDesc}</p>
              </div>
            </div>
            <div class="card-footer small d-flex justify-content-between align-items-center">
              <span class="badge badge-color">${game.genre}</span>
              <span class="badge badge-color">${game.platform}</span>
            </div>
          </div>
        </div>
      `;

      const gameCard = mainCol.querySelector(".game-card");
      if (gameCard) {
        gameCard.addEventListener("click", async () => {
          UI.showLoader();
          const details = new Details();
          const detailsData = await details.fetchDetails(game.id);
          UI.hideLoader();
          UI.displayDetails(detailsData);
        });
      }

      rowContainer.appendChild(mainCol);
    });
  }

  static displayDetails(detailsData) {
    const detailsContainer = document.querySelector(".game-details");
    const homeContainer = document.querySelector(".home");
    const homeHeader = document.querySelector(".games");
    detailsContainer.classList.remove("d-none");
    homeContainer.classList.add("d-none");
    homeHeader.classList.add("d-none");

    const detailsContent = document.querySelector(".details-content");
    detailsContent.innerHTML = "";

    const detailsHTML = `
      <div class="col-md-4">
        <img src="${detailsData.thumbnail}" alt="${detailsData.title}" class="img-fluid">
      </div>
      <div class="col-md-8">
        <h3>Title: ${detailsData.title}</h3>
        <p>Category: <span class="badge text-bg-info">${detailsData.genre}</span></p>
        <p>Platform: <span class="badge text-bg-info">${detailsData.platform}</span></p>
        <p>Status: <span class="badge text-bg-info">${detailsData.status}</span></p>
        <p class="small">${detailsData.description}</p>
        <a class="btn btn-outline-warning mb-3" target="_blank" href="${detailsData.game_url}">Show Game</a>
      </div>
    `;

    detailsContent.innerHTML = detailsHTML;

    const closeButton = detailsContainer.querySelector("span i");
    closeButton.addEventListener("click", () => {
      detailsContainer.classList.add("d-none");
      homeContainer.classList.remove("d-none");
      homeHeader.classList.remove("d-none");
    });
  }
}
