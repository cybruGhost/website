class Movie {
	constructor() {
		this.API_KEY = "5ff50c70add4da2df5"; // Your TMDb API key
		this.IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
	}

	async getNowPlayingMovies() {
		try {
			const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.API_KEY}&language=en-US&page=1`;
			const response = await fetch(url);
			if (!response.ok) throw new Error("Network response was not ok");
			const responseData = await response.json();
			return {
				movies: responseData.results,
				img_base_url: this.IMG_BASE_URL,
			};
		} catch (error) {
			console.error("Error fetching now playing movies:", error);
			return { movies: [], img_base_url: this.IMG_BASE_URL };
		}
	}

	async displayNowPlayingMovies() {
		const { movies, img_base_url } = await this.getNowPlayingMovies();
		const moviesContainer = document.getElementById("movies");

		if (movies.length === 0) {
			moviesContainer.innerHTML = "<p>No movies currently playing.</p>";
			return;
		}

		moviesContainer.innerHTML = ""; // Clear previous content

		movies.forEach((movie) => {
			const movieCard = document.createElement("div");
			movieCard.className = "movie-card";

			const movieImg = document.createElement("img");
			// Check if poster_path is available
			if (movie.poster_path) {
				movieImg.src = `${img_base_url}${movie.poster_path}`;
			} else {
				movieImg.src = "path/to/default/image.jpg"; // Use a default image if no poster is available
			}
			movieImg.alt = movie.title;

			const movieTitle = document.createElement("h3");
			movieTitle.textContent = movie.title;

			movieCard.appendChild(movieImg);
			movieCard.appendChild(movieTitle);
			moviesContainer.appendChild(movieCard);
		});
	}

	async searchMovies(query) {
		if (!query) {
			console.error("Search query is empty");
			return { movies: [], img_base_url: this.IMG_BASE_URL };
		}

		try {
			const url = `https://api.themoviedb.org/3/search/movie?api_key=${
				this.API_KEY
			}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
			const response = await fetch(url);
			if (!response.ok) throw new Error("Network response was not ok");
			const responseData = await response.json();
			return {
				movies: responseData.results,
				img_base_url: this.IMG_BASE_URL,
			};
		} catch (error) {
			console.error("Error searching movies:", error);
			return { movies: [], img_base_url: this.IMG_BASE_URL };
		}
	}

	async getMovieDetails(movieId) {
		try {
			const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.API_KEY}&language=en-US`;
			const response = await fetch(url);
			if (!response.ok) throw new Error("Network response was not ok");
			const responseData = await response.json();
			return {
				movie: responseData,
				img_base_url: this.IMG_BASE_URL,
			};
		} catch (error) {
			console.error(`Error fetching details for movie ${movieId}:`, error);
			return { movie: {}, img_base_url: this.IMG_BASE_URL };
		}
	}

	async getMovieVideo(movieId) {
		try {
			const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.API_KEY}&language=en-US`;
			const response = await fetch(url);
			if (!response.ok) throw new Error("Network response was not ok");
			const responseData = await response.json();
			const video = responseData.results.find(
				(video) => video.type === "Trailer"
			);
			return video ? video.key : null;
		} catch (error) {
			console.error(`Error fetching video for movie ${movieId}:`, error);
			return null;
		}
	}

	async getMovieScenes(movieId) {
		try {
			const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.API_KEY}&language=en-US`;
			const response = await fetch(url);
			if (!response.ok) throw new Error("Network response was not ok");
			const responseData = await response.json();
			return responseData.results.filter((video) => video.type === "Clip");
		} catch (error) {
			console.error(`Error fetching scenes for movie ${movieId}:`, error);
			return [];
		}
	}
}

// Initialize the Movie class and display the movies
const movieApp = new Movie();
movieApp.displayNowPlayingMovies();
