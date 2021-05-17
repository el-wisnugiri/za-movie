// click event for search button
let searchBar = document.querySelector(".search-bar");
let searchBtn = document.querySelector(".search-button");
if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    baseGlobalVars();
    renderMoviesCard();
    renderPagination();
  });
}

// search when the user click enter on input field
if (searchBar) {
  searchBar.onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == "Enter") {
      // Enter pressed
      baseGlobalVars();
      renderMoviesCard();
      renderPagination();
    }
  };
}

// asynchronously fetch the data everytime the user click on search
async function getMovies() {
  let url = "http://www.omdbapi.com/";
  const apiKey = "867a6158";
  // get the value of input field which has search-input class
  let inputValue = document.querySelector(".search-input").value;

  try {
    let res = await fetch(`${url}?apikey=${apiKey}&s=${inputValue}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// asynchrounously render cards containing data of movies by search filter
async function renderMoviesCard() {
  let movies = await getMovies();
  let listElement = document.querySelector(".list-movies");
  let html = "";

  if (movies.Response === "True") {
    listElement.classList.add("row");
    movies.Search.forEach((movie) => {
      let hmtlSegment =
        movie.Poster != "N/A"
          ? `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
          <div class="card movie-card" style="width: 18rem;">
            <img src="${movie.Poster}" class="card-img-top" height="300px">
              <div class="card-body"><h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year : ${movie.Year}</p>
              <div class="d-flex align-items-center justify-content-center">
                <a href="#" class="btn btn-secondary button-details" id="${movie.imdbID}" data-id="${movie.imdbID}" data-toggle="modal" data-target="#exampleModal">Show Details</a>
              </div>
            </div>
          </div>
        </div>`
          : `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
          <div class="card movie-card" style="width: 18rem;">
            <img src="uploads/no-image.png" class="card-img-top" height="300px">
              <div class="card-body"><h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year : ${movie.Year}</p>
              <div class="d-flex align-items-center justify-content-center">
                <a href="#" class="btn btn-secondary button-details" id="${movie.imdbID}" data-id="${movie.imdbID}" data-toggle="modal" data-target="#exampleModal">Show Details</a>
              </div>
            </div>
          </div>
        </div>`;
      html += hmtlSegment;
    });
  } else {
    listElement.classList.remove("row");
    let hmtlSegment = `<div class="no-movie d-flex justify-content-center align-items-center text-secondary">${movies.Error}</div>`;
    html += hmtlSegment;
  }
  let moviesWrapper = document.querySelector(".list-movies");
  moviesWrapper.innerHTML = html;
}

// callback executed when card was found
// get all the buttons and store them in array
function handleCards(card) {
  var buttonArray = document.getElementsByClassName("movie-card");
  for (i = 0; i < buttonArray.length; i++) {
    if (document.addEventListener) {
      buttonArray[i].addEventListener("click", cardFunction);
    } else {
      if (document.attachEvent) {
        buttonArray[i].attachEvent("onclick", cardFunction);
      }
    }
  }
}

// set up the mutation observer and keep observing cards result
var observer = new MutationObserver(function (mutations, me) {
  // `mutations` is an array of mutations that occurred
  var card = document.querySelector(".movie-card");
  if (card) {
    handleCards(card);
    //me.disconnect(); // stop observing
    return;
  }
});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true,
});

// pass the id of card's button
async function cardFunction(e) {
  // get pop-up details when card button is clicked
  getDetails(e.target.id);
}

// asynchronously fetch data by their id and display it on modal popup
async function getDetails(movieId) {
  let url = "http://www.omdbapi.com/";
  const apiKey = "867a6158";
  let id = movieId;
  let html = "";

  try {
    fetch(`${url}?apikey=${apiKey}&i=${id}`).then((response) =>
      response
        .json()
        .then((data) => ({
          movieDetails: data,
          status: response.status,
        }))
        .then((res) => {
          // console.log(res.status, res.movieDetails)
          favorites = res.movieDetails;
          console.log(favorites);
          let hmtlSegment =
            res.movieDetails.Poster != "N/A"
              ? `<div class="details-image col-12 mb-md-5 d-flex justify-content-center">
            <img src="${res.movieDetails.Poster}" alt="details - image" />
            </div >
            <div class="movie-details col-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class="d-flex justify-content-center">${res.movieDetails.Title}</h4>
                </li>
                <li class="list-group-item"><b>Released:</b> ${res.movieDetails.Released}</li>
                <li class="list-group-item"><b>Genre:</b> ${res.movieDetails.Genre}</li>
                <li class="list-group-item"><b>Writer:</b> ${res.movieDetails.Writer}</li>
                <li class="list-group-item"><b>Actors:</b> ${res.movieDetails.Actors}</li>
                <li class="list-group-item"><b>Rated:</b> ${res.movieDetails.Rated}</li>
                <li class="list-group-item"><b>Plot:</b> ${res.movieDetails.Plot}</li>
              </ul>
            </div>`
              : `<div class="details-image col-12 mb-md-5 d-flex justify-content-center">
            <img src="uploads/no-image.png" alt="details - image" />
            </div >
            <div class="movie-details col-12">
              <ul class="list-group">
                <li class="list-group-item">
                  <h4 class="d-flex justify-content-center">${res.movieDetails.Title}</h4>
                </li>
                <li class="list-group-item"><b>Released:</b> ${res.movieDetails.Released}</li>
                <li class="list-group-item"><b>Genre:</b> ${res.movieDetails.Genre}</li>
                <li class="list-group-item"><b>Writer:</b> ${res.movieDetails.Writer}</li>
                <li class="list-group-item"><b>Actors:</b> ${res.movieDetails.Actors}</li>
                <li class="list-group-item"><b>Rated:</b> ${res.movieDetails.Rated}</li>
                <li class="list-group-item"><b>Plot:</b> ${res.movieDetails.Plot}</li>
              </ul>
            </div>`;
          html += hmtlSegment;

          let modalWrapper = document.querySelector(".modal-body");
          modalWrapper.innerHTML = html;
        })
    );
  } catch (error) {
    console.log(error);
  }
}

// change global var to default
function baseGlobalVars() {
  paginationBtn = [];
  defaultPage = 1;
  prevClicked = 0;
}
// global variable for pagination button
let paginationBtn = [];
let defaultPage = 1;
let prevClicked = 0;

// display pagination
async function renderPagination() {
  let movies = await getMovies();
  let totalResults = movies.totalResults;
  let pages = totalResults / 10;
  let totalPages = pages.toFixed(0) >= 15 ? 15 : pages.toFixed(0);

  try {
    if (movies.Response === "True") {
      for (let i = 1; i <= totalPages; i++) {
        paginationBtn.push(
          `<li class="page-item"><a class="page-link" href="#" id="${i}">${i}</a></li>`
        );
      }
      paginationBtn[0] = `<li class="page-item active"><a class="page-link" href="#" id="${defaultPage}">${defaultPage}</a></li>`;
    }
    let modalWrapper = document.querySelector(".pagination");
    modalWrapper.innerHTML = paginationBtn.join("");
  } catch (error) {
    console.log(error);
  }
}

// detect which button is being clicked
function handlePagination(paginationBtn) {
  var buttonArray = document.getElementsByClassName("page-item");
  for (i = 0; i < buttonArray.length; i++) {
    if (document.addEventListener) {
      buttonArray[i].addEventListener("click", buttonFunction);
    } else {
      if (document.attachEvent) {
        buttonArray[i].attachEvent("onclick", buttonFunction);
      }
    }
  }
}

// set up the mutation observer and keep observing button array for pagination
var paginationObserver = new MutationObserver(function (mutations, me) {
  // `mutations` is an array of mutations that occurred
  var button = document.querySelector(".page-item");
  if (button) {
    handlePagination(button);
    //me.disconnect(); // stop observing
    return;
  }
});

// start observing
paginationObserver.observe(document, {
  childList: true,
  subtree: true,
});

// pass the id of pagination button
async function buttonFunction(e) {
  // store id to pageNumber variable
  let pageNumber = e.target.id;
  let pageIndex = pageNumber - 1;
  let prevPage = prevClicked + 1;
  // these handle active class of the pagination button
  paginationBtn[
    prevClicked
  ] = `<li class="page-item"><a class="page-link" href="#" id="${prevPage}">${prevPage}</a></li>`;
  paginationBtn[
    pageIndex
  ] = `<li class="page-item active"><a class="page-link" href="#" id="${pageNumber}">${pageNumber}</a></li>`;
  // update global array of pagination
  let modalWrapper = document.querySelector(".pagination");
  modalWrapper.innerHTML = paginationBtn.join("");
  // render cards according to the page number
  prevClicked = pageIndex;
  getPaginationMovies([pageNumber]);
}

// api url will be let paginationResult = await fetch(`${url}?apikey=${apiKey}&s=${inputValue}&page={pageNumber}`);
// get movies by passing page number id
async function getPaginationMovies(pageId) {
  let url = "http://www.omdbapi.com/";
  const apiKey = "867a6158";
  // get the value of input field which has search-input class
  let inputValue = document.querySelector(".search-input").value;
  let pageNumber = pageId;
  let html = "";

  try {
    fetch(`${url}?apikey=${apiKey}&s=${inputValue}&page=${pageNumber}`).then(
      (response) =>
        response
          .json()
          .then((data) => ({
            movies: data,
            status: response.status,
          }))
          .then((res) => {
            res.movies.Search.forEach((movie) => {
              let hmtlSegment =
                movie.Poster != "N/A"
                  ? `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
                      <div class="card movie-card" style="width: 18rem;">
                        <img src="${movie.Poster}" class="card-img-top" height="300px">
                          <div class="card-body"><h5 class="card-title">${movie.Title}</h5>
                          <p class="card-text">Year : ${movie.Year}</p>
                          <div class="d-flex align-items-center justify-content-center">
                            <a href="#" class="btn btn-secondary button-details" id="${movie.imdbID}" data-id="${movie.imdbID}" data-toggle="modal" data-target="#exampleModal">Show Details</a>
                          </div>
                        </div>
                      </div>
                    </div>`
                  : `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
                      <div class="card movie-card" style="width: 18rem;">
                        <img src="uploads/no-image.png" class="card-img-top" height="300px">
                          <div class="card-body"><h5 class="card-title">${movie.Title}</h5>
                          <p class="card-text">Year : ${movie.Year}</p>
                          <div class="d-flex align-items-center justify-content-center">
                            <a href="#" class="btn btn-secondary button-details" id="${movie.imdbID}" data-id="${movie.imdbID}" data-toggle="modal" data-target="#exampleModal">Show Details</a>
                          </div>
                        </div>
                      </div>
                    </div>`;
              html += hmtlSegment;
              let moviesWrapper = document.querySelector(".list-movies");
              moviesWrapper.innerHTML = html;
            });
          })
    );
  } catch (error) {
    console.log(error);
  }
}

// TODO: get started with favorites page, things to consider:
// a json file called favorites to store favorites movies as an object
// might need to create a class? not really, display favorites in different style.
// consider to have an option to remove from favoritess
const fs = require("fs");

// create favorites movie object
let favorites = {};

let favBtn = document.querySelector(".favorites-btn");
if (favBtn) {
  favBtn.addEventListener("click", function () {
    // write JSON string to a file
    addFavorites();
  });
}
// convert JSON object to string
const data = JSON.stringify(favorites);

function addFavorites() {
  fs.writeFile("favorites.json", data, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}
// TODO: FIX FS.WRITEFILE IS NOT A FUNCTION
