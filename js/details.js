export default class Details {
  async fetchDetails(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "17addaafb5msh6189abb7fbf91c5p116327jsnd9c4a6765742",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const detailsData = await response.json();
    return detailsData;
  }
}
