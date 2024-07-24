const params = new URLSearchParams(window.location.search);
const newId = params.get("movieid");

const id = newId;
const apiKey = "11ca62a738dc81495dca5a3cef42e8f5";
const baseUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

async function getMovieDetails() {
  try {
    const response = await fetch(movieDetailsUrl);
    if (!response.ok) {
      throw new Error("Error fetching details");
    }
    const details = await response.json();
    return details; // Return the details object directly
  } catch (error) {
    console.error("Error fetching details", error);
    throw error; // Re-throw the error to propagate it
  }
}
const dataContainer = document.querySelector(".movieName");
const overview = document.querySelector(".overview");
// const genre0 = document.querySelector(".adventure")
const genre1 = document.querySelector(".action");
const genre2 = document.querySelector(".thriller");
const starvote = document.querySelector(".star_vote");
const votecount = document.querySelector(".votecount")

async function fetchVideo() {
  try {
    // Fetch movie details first
    const movieDetails = await getMovieDetails();
    console.log(movieDetails);

    // Then fetch videos
    const response = await fetch(baseUrl);
  if (!response.ok) {;
      throw new Error("Error fetching movies");
    }
    const data = await response.json();
    const results = data.results;
    const filteredVideos = results.filter(
      (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
    );
    if (filteredVideos.length === 0) {
      throw new Error("No YouTube trailers found");
    }

    const randomTrailer =
      filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
    let trailerUrl;
    if (randomTrailer.site === "YouTube") {
      trailerUrl = `https://www.youtube.com/embed/${randomTrailer.key}?si=ebdoBZ2qB8a13ZGr`;
    } else {
      trailerUrl = `https://vimeo.com/${randomTrailer.key}`;
    }

    // Assuming there's an HTML element with tag 'iframe' where you want to display the video
    let video = document.querySelector("iframe");
    video.src = trailerUrl;

    // Update the title or any other details based on movieDetails

    

    console.log(movieDetails.genres);

    starvote.innerHTML = `${movieDetails.vote_average}`
    // genre0.innerHTML = `${movieDetails.genres[0].name}`
    genre1.innerHTML = `${movieDetails.genres[1].name}`
    genre2.innerHTML = `${movieDetails.genres[2].name}`
    votecount.innerHTML = `${movieDetails.vote_count}`
    overview.innerHTML = movieDetails.overview;
    dataContainer.innerHTML = `${movieDetails.title}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchVideo();