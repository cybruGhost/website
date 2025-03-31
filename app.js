const movie = new Movie();
const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
	movie
		.getNowPlayingMovies()
		.then((response) => ui.addMovies(response.movies, response.img_base_url))
		.catch((err) => console.error("Error fetching now playing movies:", err));

	const apps = [
		{ name: "App One", img: "app1.png", link: "#" },
		{ name: "App Two", img: "app2.png", link: "#" },
		{ name: "App Three", img: "app3.png", link: "#" },
	];
	ui.addApps(apps);

	// Display watch history when the profile page loads
	ui.displayWatchHistory();
});

// Function to add movie to watch history
function addToWatchHistory(movie) {
	let watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];

	if (!watchHistory.includes(movie)) {
		watchHistory.push(movie);
		localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
	}
}

// Function to fetch watch history
function fetchWatchHistory() {
	return JSON.parse(localStorage.getItem("watchHistory")) || [];
}

// Function to display watch history
function displayWatchHistory() {
	const watchHistoryContainer = document.getElementById(
		"watch-history-container"
	);
	const watchHistory = fetchWatchHistory();

	// Clear loading message
	watchHistoryContainer.innerHTML = "";

	// Check if there are any entries in the watch history
	if (watchHistory.length > 0) {
		// Display each movie in the watch history
		watchHistoryContainer.innerHTML = watchHistory
			.map((movie) => `<div>${movie}</div>`)
			.join("");
	} else {
		watchHistoryContainer.innerHTML = "No watch history available.";
	}
}

// Call this function on the profile page load to display history
document.addEventListener("DOMContentLoaded", () => {
	displayWatchHistory();
});

const form = document.querySelector("#movie-form");
form.addEventListener("submit", searchMoviesAdd);

function searchMoviesAdd(event) {
	event.preventDefault();
	const searchTerm = document.querySelector("#search").value.trim();
	if (searchTerm === "") {
		alert("Please enter a search term.");
		return;
	}

	window.location.href = `searched_movies.html?search=${encodeURIComponent(
		searchTerm
	)}`;
}

// Clear movies function
function clearMovies() {
	document.querySelectorAll(".movie").forEach((current) => current.remove());
}

// Update movie click event to add to watch history
document.querySelectorAll(".movie").forEach((movieElement) => {
	movieElement.addEventListener("click", () => {
		const movieTitle = movieElement.querySelector(".movie-title").innerText;
		addToWatchHistory(movieTitle);
		window.location.href = `moviedetails.html?id=${movieElement.dataset.id}`;
	});
});
