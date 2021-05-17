// click event for search button
let searchBar = document.querySelector('.search-bar');
let searchBtn = document.querySelector('.search-button');
if (searchBtn) {
  searchBtn.addEventListener("click", function () {
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
      renderMoviesCard();
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
  console.log(movies);
  let listElement = document.querySelector('.list-movies');
  let html = "";

  if (movies.Response === "True") {
    listElement.classList.add('row')
    movies.Search.forEach((movie) => {
      let hmtlSegment = (movie.Poster != 'N/A') ?
        `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
          <div class="card movie-card" style="width: 18rem;">
            <img src="${movie.Poster}" class="card-img-top" height="300px">
              <div class="card-body"><h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year : ${movie.Year}</p>
              <div class="d-flex align-items-center justify-content-center">
                <a href="#" class="btn btn-secondary button-details" id="${movie.imdbID}" data-id="${movie.imdbID}" data-toggle="modal" data-target="#exampleModal">Show Details</a>
              </div>
            </div>
          </div>
        </div>` :
        `<div class="col-md-4 mb-3 mt-3 d-flex justify-content-center">
          <div class="card movie-card" style="width: 18rem;">
            <img src="uploads/no-image.png" class="card-img-top" height="300px">
              <div class="card-body"><h5 class="card-title">${movie.Title}</h5>
              <p class="card-text">Year : ${movie.Year}</p>
              <div class="d-flex align-items-center justify-content-center">
                <a href="#" class="btn btn-secondary button-details" id="${movie.imdbID}" data-id="${movie.imdbID}" data-toggle="modal" data-target="#exampleModal">Show Details</a>
              </div>
            </div>
          </div>
        </div>`
        ;

      html += hmtlSegment;
    });

  } else {
    listElement.classList.remove('row')
    let hmtlSegment = `<div class="no-movie d-flex justify-content-center align-items-center text-secondary">${movies.Error}</div>`
    html += hmtlSegment;
  }
  let moviesWrapper = document.querySelector(".list-movies");
  moviesWrapper.innerHTML = html;
}

// callback executed when card was found
// get all the buttons and store them in array
function handleCards(card) {
  var buttonArray = document.getElementsByClassName('movie-card');
  for (i = 0; i < buttonArray.length; i++) {
    if (document.addEventListener) {
      buttonArray[i].addEventListener("click", myFunction);
    }
    else {
      if (document.attachEvent) {
        buttonArray[i].attachEvent("onclick", myFunction);
      }
    }
  }
}

// set up the mutation observer and keep observing cards result
var observer = new MutationObserver(function (mutations, me) {
  // `mutations` is an array of mutations that occurred
  var card = document.querySelector('.movie-card');
  if (card) {
    handleCards(card);
    //me.disconnect(); // stop observing
    return;
  }
});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true
})

// pass  the id
async function myFunction(e) {
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
    fetch(`${url}?apikey=${apiKey}&i=${id}`).then(response =>
      response.json().then(data => ({
        movieDetails: data,
        status: response.status
      })
      ).then(res => {
        // console.log(res.status, res.movieDetails)
        let hmtlSegment = (res.movieDetails.Poster != 'N/A') ?
          `<div class="details-image col-12 mb-md-5 d-flex justify-content-center">
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
            </div>` :
          `<div class="details-image col-12 mb-md-5 d-flex justify-content-center">
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
            </div>`
          ;

        html += hmtlSegment;

        let modalWrapper = document.querySelector(".modal-body");
        modalWrapper.innerHTML = html;
      }));
  } catch (error) {
    console.log(error);
  }
}

// TODO: ADD PAGINATION TO SEARCH RESULT
// logic = total pages =  total result / 10, if it decimal rounds the result
// api url will be let paginationResult = await fetch(`${url}?apikey=${apiKey}&s=${inputValue}&page={pageNumber}`);
// use boostrap pagination
async function renderPagination() {
  let movies = await getMovies()
  let totalResults = movies.totalResults;
  let pages = totalResults / 10;
  let totalPages = pages.toFixed(0);
  let html = ''

  try {
    if (totalPages != null) {
      for (let totalPages = 1; totalPages < array.length; totalPages++) {
        let hmtlSegment = + `<li class="page-item"><a class="page-link" href="#" id="${totalPages}">${totalPages}</a></li>`
      }
    }
  } catch (error) {
    console.log(error)
  }
}