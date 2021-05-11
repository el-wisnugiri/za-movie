// click event for search button
document.querySelector(".search-button").addEventListener("click", function () {
  renderMoviesCard();
});

// asynchronously fetch the data everytime the user click on search
async function getMovies() {
  let url = "http://www.omdbapi.com/";
  const apiKey = "867a6158";
  let inputValue = document.querySelector(".search-input").value;

  try {
    let res = await fetch(`${url}?apikey=${apiKey}&s=${inputValue}`);
    //console.log(res.json());
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
// asynchrounously render cards containing data of movies by search filter
async function renderMoviesCard() {
  let movies = await getMovies();
  let html = "";

  movies.Search.forEach((movie) => {
    let hmtlSegment =
      `<div class="col-md-4 mb-3 mt-3">
    <div class="card" style="width: 18rem;">
    <img src="` +
      movie.Poster +
      `" class="card-img-top" height="300px">
    <div class="card-body"><h5 class="card-title">` +
      movie.Title +
      `</h5>
    <p class="card-text">Year : ` +
      movie.Year +
      `</p>
    <a href="#" class="btn btn-primary" id="btn-details" data-id="` +
      movie.imdbID +
      `"
    data-toggle="modal" data-target="#exampleModal">Show Details</a>
    </div></div></div>`;

    html += hmtlSegment;
  });

  let moviesWrapper = document.querySelector(".list-movies");
  moviesWrapper.innerHTML = html;
}
