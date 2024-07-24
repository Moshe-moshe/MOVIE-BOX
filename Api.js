
const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2E3YTY5MWMyMDI3YzM5ZjJjYjg2ZDQ2OWVlY2NjNSIsIm5iZiI6MTcxOTA1NjIyNy43MjE2MTUsInN1YiI6IjY2NzVmODA0YWM5ZjZjMzExNTg3OTNlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gmLvr5yAaH2F9NaaACurJYKDJpBiSLaBDFUfd--MZBw'
    }
};


const fetchData = async () => {
    try {
        const res = await fetch(apiUrl, options);
        if (!res.ok) {
            throw new Error("Error fetching movies");
        }
        const data = await res.json();
        const results = data.results;
        displaymovies(results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displaymovies = async (movies) => {
    const movieContainer = document.getElementById("movies");
    movieContainer.innerHTML = "";

    movies.slice(0, 24).forEach((movie, index) => {
        const content = document.createElement("div");
        content.classList.add("movie-content");
        content.innerHTML = `
        <a href=${`testing.html?movieid=${movie.id}`}>
      <img src=${`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=${movie.original_title}>
      <div class="former"><h1 class="title">${movie.original_title}</h1>
      <p>Rating: ${movie.vote_average}</p></div>
    `;
        movieContainer.appendChild(content);
    });
};

fetchData(); // Call fetchData to initiate fetching and displaying movies


