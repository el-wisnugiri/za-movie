// click event for search button
document.querySelector(".search-button").addEventListener("click", function () {
  searchMovies();
});

// search function
function searchMovies() {
  const apiKey = "867a6158";
  let url = "http://www.omdbapi.com/";
  let inputValue = document.querySelector(".search-input").value;

  // TODO: make this async function
  fetch(`${url}?apikey=${apiKey}&s=${inputValue}`)
    .then((res) => res.json())
    .then((movies) => {
      movies.Search.forEach((movie) => {
        // console.log(movie.Title);
        let moviesWrapper = document.querySelector(".list-movies");
        moviesWrapper.innerHTML +=
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
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
