import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
	getAuth,
	updateProfile,
	deleteUser,
	onAuthStateChanged,
	updatePassword,
	signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: "-4",
storageBucket: "be-..com",
messagingSenderId: "",
appId: "",
measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
	const emailElement = document.getElementById("email");
	const nicknameElement = document.getElementById("nickname");
	const lastSeenElement = document.getElementById("last-seen");
	const watchHistoryContainer = document.getElementById(
		"watch-history-container"
	);
	const alertsContainer = document.getElementById("alerts-container");

	// Monitor authentication state
	onAuthStateChanged(auth, (user) => {
		if (user) {
			emailElement.innerText = user.email;
			nicknameElement.innerText = user.displayName || "UserNickname";
			lastSeenElement.innerText = getLastSeenTime();
			fetchWatchHistory();
			updateLastSeenTime();
		} else {
			alert("logged-out successfully😭. Redirecting to login page.");
			window.location.href = "index.html";
		}
	});

	// Change nickname
	document
		.getElementById("save-nickname-btn")
		.addEventListener("click", async () => {
			const newNickname = document.getElementById("new-nickname").value;
			const user = auth.currentUser;

			if (user) {
				try {
					await updateProfile(user, { displayName: newNickname });
					nicknameElement.innerText = newNickname; // Update displayed nickname
					showAlert("Nickname changed successfully.");
					closeModal("change-nickname-modal"); // Close modal after saving
				} catch (error) {
					showAlert(`Error updating nickname: ${error.message}`);
				}
			}
		});

	// Change password
	document
		.getElementById("save-password-btn")
		.addEventListener("click", async () => {
			const newPassword = document.getElementById("new-password").value;
			const user = auth.currentUser;

			if (user) {
				try {
					await updatePassword(user, newPassword);
					showAlert("Password changed successfully.");
					closeModal("change-password-modal"); // Close modal after saving
				} catch (error) {
					showAlert(`Error changing password: ${error.message}`);
				}
			}
		});

	// Delete account
	document
		.getElementById("confirm-delete-btn")
		.addEventListener("click", async () => {
			const user = auth.currentUser;

			if (user) {
				try {
					await deleteUser(user);
					showAlert("Account deleted successfully.");
					window.location.href = "index.html"; // Redirect after deletion
				} catch (error) {
					showAlert(`Error deleting account: ${error.message}`);
				}
			}
		});

	// Clear watch history
	document
		.getElementById("clear-watch-history-btn")
		.addEventListener("click", () => {
			localStorage.removeItem("watchHistory");
			watchHistoryContainer.innerHTML = ""; // Clear displayed history
			showAlert("Watch history cleared successfully.");
		});

	// Tab navigation
	const tabButtons = document.querySelectorAll(".tab-button");
	const tabContents = document.querySelectorAll(".tab-content");

	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			tabButtons.forEach((btn) => btn.classList.remove("active"));
			button.classList.add("active");
			const tabId = button.getAttribute("data-tab");
			tabContents.forEach((content) => {
				content.classList.remove("active");
				if (content.id === `tab-${tabId}`) {
					content.classList.add("active");
				}
			});
		});
	});

	// Logout button functionality
	const logoutButton = document.getElementById("logout-button");
	if (logoutButton) {
		logoutButton.addEventListener("click", () => {
			signOut(auth)
				.then(() => {
					// Sign-out successful.
					window.location.href = "index.html"; // Redirect to index.html after successful logout
				})
				.catch((error) => {
					// An error happened during logout.
					console.error("Logout error:", error);
					// Optionally, show an error message to the user
					showAlert(`Logout failed: ${error.message}`);
				});
		});
	}
});

// Fetch watch history from localStorage
function fetchWatchHistory() {
	const watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];
	watchHistoryContainer.innerHTML = ""; // Clear previous entries
	if (watchHistory.length === 0) {
		watchHistoryContainer.innerText = "No watch history available.";
	} else {
		watchHistory.forEach(({ title, image }) => {
			const movieElement = document.createElement("div");
			movieElement.innerHTML = `<img src="${image}" alt="${title}" width="50" height="75" /> ${title}`; // Show movie image and title
			watchHistoryContainer.appendChild(movieElement);
		});
	}
}

// Show alert messages
function showAlert(message) {
	const alert = document.createElement("div");
	alert.innerText = message;
	alert.classList.add("alert");
	alertsContainer.appendChild(alert);
	setTimeout(() => {
		alert.remove();
	}, 3000);
}

// Update last seen time
function updateLastSeenTime() {
	const lastSeenTime = new Date().toLocaleString();
	localStorage.setItem("lastSeen", lastSeenTime);
	document.getElementById("last-seen").innerText = lastSeenTime;
}

// Get last seen time
function getLastSeenTime() {
	return localStorage.getItem("lastSeen") || "Never";
}

// Close modal function
function closeModal(modalId) {
	document.getElementById(modalId).style.display = "none";
}

// Open modal functions
document.getElementById("change-nickname-btn").addEventListener("click", () => {
	document.getElementById("change-nickname-modal").style.display = "block";
});

document.getElementById("change-password-btn").addEventListener("click", () => {
	document.getElementById("change-password-modal").style.display = "block";
});

document.getElementById("delete-account-btn").addEventListener("click", () => {
	document.getElementById("delete-account-modal").style.display = "block";
});
