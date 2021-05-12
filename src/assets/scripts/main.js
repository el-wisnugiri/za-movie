// click event for search button
document.querySelector(".search-button").addEventListener("click", function () {
  renderMoviesCard();
});

// search when the user click enter on input field
document.querySelector(".search-bar").onkeypress = function (e) {
  if (!e) e = window.event;
  var keyCode = e.code || e.key;
  if (keyCode == "Enter") {
    // Enter pressed
    renderMoviesCard();
  }
};

// asynchronously fetch the data everytime the user click on search
async function getMovies() {
  let url = "http://www.omdbapi.com/";
  const apiKey = "867a6158";
  // get the value of input field which has search-input class
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
      `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
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
      <div class="d-flex align-items-center justify-content-center">
    <a href="#" class="btn btn-secondary button-details" id="btn-details" data-id="` +
      movie.imdbID +
      `"
    data-toggle="modal" data-target="#exampleModal">Show Details</a>
    </div></div></div></div>`;

    html += hmtlSegment;
  });

  let moviesWrapper = document.querySelector(".list-movies");
  moviesWrapper.innerHTML = html;
}

async function cardId() {
  try {
    let buttonDetails = await document.querySelector(".button-details");
    let movieId = buttonDetails.getAttribute("data-id");
    console.log(movieId);
    //return movieId
  } catch (error) {
    console.log(error);
  }
}

// asynchronously fetch data by their id
async function getDetails(movieId) {
  let url = "http://www.omdbapi.com/";
  const apiKey = "867a6158";
  let id = movieId;

  console.log(id);

  try {
    let res = await fetch(`${url}?apikey=${apiKey}&i=${id}`);
    console.log(res.json());
    //return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// TODO: show movies details on modal with the correct IMDB ID
