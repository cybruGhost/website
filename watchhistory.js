// scripts/watchHistory.js

const WATCH_HISTORY_KEY = "watchHistory";

// Function to retrieve watch history
export function getWatchHistory() {
	return JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY)) || [];
}

// Function to store a movie in watch history
export function storeWatchHistory(title, image) {
	const watchHistory = getWatchHistory();

	// Check if the movie is already in watch history
	if (!watchHistory.some((movie) => movie.title === title)) {
		watchHistory.push({ title, image });
		localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(watchHistory));
	}
}

// Function to clear watch history (optional)
export function clearWatchHistory() {
	localStorage.removeItem(WATCH_HISTORY_KEY);
}

// Function to display watch history in a given container
export function displayWatchHistory(container) {
	const watchHistory = getWatchHistory();
	container.innerHTML = ""; // Clear previous watch history

	if (watchHistory.length > 0) {
		container.innerHTML = watchHistory
			.map(
				({ title, image }) => `
                <div>
                    <img src="${image}" alt="${title}" width="50" height="75" />
                    ${title}
                </div>
            `
			)
			.join("");
	} else {
		container.innerHTML = "No watch history available.";
	}
}
