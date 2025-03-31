const movie = new Movie();
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const movieId = urlParams.get("id");

	if (movieId) {
		// Fetch movie details
		movie
			.getMovieDetails(movieId)
			.then((response) => {
				const movieDetails = response.movie;

				// Fetch movie video (trailer)
				movie
					.getMovieVideo(movieId)
					.then((videoKey) => {
						// Fetch movie scenes
						movie
							.getMovieScenes(movieId)
							.then((scenes) => {
								// Display movie details, video, and scenes
								ui.displayMovieDetails(movieDetails, videoKey, scenes);
							})
							.catch((err) =>
								console.error("Error fetching movie scenes:", err)
							);
					})
					.catch((err) => console.error("Error fetching movie video:", err));
			})
			.catch((err) => console.error("Error fetching movie details:", err));
	} else {
		console.error("No movie ID found in URL.");
	}
});
