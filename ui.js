class UI {
	constructor() {
		this.moviesContainer = document.querySelector(".movies-container");
		this.imgBaseUrl = "https://image.tmdb.org/t/p/original"; // Base URL for images
		this.appsContainer = document.querySelector(".apps-container");
		this.watchHistoryContainer = document.getElementById(
			"watch-history-container"
		); // Reference to watch history container
	}

	addMovies(movies, img_base_url) {
		this.moviesContainer.innerHTML = ""; // Clear previous movies
		movies.forEach((movie) => {
			const movieElement = this.createMovieElement(movie, img_base_url);
			this.moviesContainer.appendChild(movieElement);
		});
	}

	createMovieElement(movie, img_base_url) {
		const movieElement = document.createElement("div");
		movieElement.classList.add("movie");

		movieElement.innerHTML = `
            <img src="${img_base_url + movie.poster_path}" alt="${
			movie.title
		}" data-id="${movie.id}">
            <div class="movie-brief">
                <h1 class="movie-title">${movie.title}</h1>
                <h2 class="movie-rating">⭐ ${movie.vote_average}</h2>
            </div>
            <div class="movie-overview">
                ${movie.overview}
            </div>
            <button class="view-details-button" data-id="${
							movie.id
						}">View Details</button>
        `;

		// Click event for the entire movie card
		movieElement.addEventListener("click", () => {
			this.addToWatchHistory(movie.title, movie.poster_path); // Add to watch history on click
			window.location.href = `moviedetails.html?id=${movie.id}`;
		});

		// Click event specifically for the button (to ensure compatibility)
		movieElement
			.querySelector(".view-details-button")
			.addEventListener("click", (event) => {
				event.stopPropagation(); // Prevent triggering the parent click event
				window.location.href = `moviedetails.html?id=${movie.id}`;
			});

		return movieElement;
	}

	// Adds a movie to the watch history
	addToWatchHistory(title, image) {
		const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];
		if (!watchHistory.some((movie) => movie.title === title)) {
			watchHistory.push({ title, image }); // Push new movie object
			localStorage.setItem("watchHistory", JSON.stringify(watchHistory)); // Store updated history
			this.displayWatchHistory(); // Update displayed watch history
		}
	}

	// Fetches and displays watch history
	displayWatchHistory() {
		const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];
		this.watchHistoryContainer.innerHTML = ""; // Clear previous watch history

		if (watchHistory.length > 0) {
			// Display each movie in the watch history
			this.watchHistoryContainer.innerHTML = watchHistory
				.map(
					(movie) => `
                    <div>
                        <img src="${movie.image}" alt="${movie.title}" width="50" height="75"/> 
                        ${movie.title}
                    </div>
                `
				)
				.join("");
		} else {
			this.watchHistoryContainer.innerHTML = "No watch history available.";
		}
	}

	// Displays movie details, including trailer and scenes
	displayMovieDetails(movie, videoKey, scenes) {
		const container = document.querySelector(".movie-details-container");

		// Default image if poster path is not available
		const posterUrl = movie.poster_path
			? `${movie.img_base_url}${movie.poster_path}`
			: "path/to/default/image.jpg";

		// Production companies
		const productionCompanies = movie.production_companies
			? movie.production_companies.map((company) => company.name).join(", ")
			: "Unknown";

		// Tagline
		const tagline = movie.tagline
			? `<h2 class="movie-tagline">${movie.tagline}</h2>`
			: "";

		// Update HTML content
		container.innerHTML = `
        <div class="movie-header">
            <img src="${posterUrl}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h1 class="movie-title">${movie.title}</h1>
                ${tagline}
                <h2 class="movie-rating">⭐ ${movie.vote_average}</h2>
                <p class="movie-release-date"><strong>Release Date:</strong> ${
									movie.release_date
								}</p>
                <p class="movie-production-companies"><strong>Production Companies:</strong> ${productionCompanies}</p>
            </div>
        </div>
        <div class="movie-description">
            <h2>Description</h2>
            <p>${movie.overview}</p>
        </div>
        <div class="movie-details-text">
            <h2>Details</h2>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Genres:</strong> ${movie.genres
							.map((genre) => genre.name)
							.join(", ")}</p>
            <p><strong>Language:</strong> ${movie.original_language.toUpperCase()}</p>
            <p><strong>Budget:</strong> ${
							movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"
						}</p>
            <p><strong>Revenue:</strong> ${
							movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"
						}</p>
						<p><strong>Popularity:</strong> ${movie.popularity.toFixed(2)}</p>
        </div>
        </div>
        <div class="movie-videos">
            <h2>Trailer</h2>
            ${
							videoKey
								? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allowfullscreen></iframe>`
								: "<p>No trailer available.</p>"
						}
        </div>
        <div class="movie-scenes">
            <h2>Scenes</h2>
            ${
							scenes.length
								? scenes
										.map(
											(scene) =>
												`<iframe width="560" height="315" src="https://www.youtube.com/embed/${scene.key}" frameborder="0" allowfullscreen></iframe>`
										)
										.join("")
								: "<p>No scenes available.</p>"
						}
        </div>
    `;
	}

	// Adds apps to the container
	addApps(apps) {
		this.appsContainer.innerHTML = ""; // Clear previous apps
		apps.forEach((app) => {
			const appElement = this.createAppElement(app);
			this.appsContainer.appendChild(appElement);
		});
	}

	createAppElement(app) {
		const appElement = document.createElement("div");
		appElement.classList.add("app");
		appElement.innerHTML = `
            <img src="${app.img}" alt="${app.name}">
            <h3>${app.name}</h3>
            <a href="${app.link}" target="_blank">Download</a>
        `;
		return appElement;
	}
}

// Animated line effect
setInterval(() => {
	const line = document.querySelector(".animated-line");
	line.classList.toggle("glitch"); // Toggle glitch class
}, Math.random() * 7000 + 6000); // Randomly toggle every 6 to 13 seconds
