document.addEventListener("DOMContentLoaded", () => {
	const updates = [
		{
			title: "THE CUBE APK Update",
			description: "New features and bug fixes.",
			date: "2024-07-20",
		},
		{
			title: "THE.CUBE.v.2.0.19.apk",
			description: "Improved performance and UI changes. Removed ads.",
			date: "2024-08-12",
		},
		{
			title: "NO Update",
			description: "Added support for new devices. Please sign up.",
			date: "2024-07-10",
		},
	];

	const updatesContainer = document.querySelector(".updates-container");

	if (updatesContainer) {
		updates.forEach((update) => {
			const updateElement = document.createElement("div");
			updateElement.classList.add("update");
			updateElement.innerHTML = `
                <h2>${update.title}</h2>
                <p>${update.description}</p>
                <small>${update.date}</small>
            `;
			updatesContainer.appendChild(updateElement);
		});

		// Function to hide updates on small screens
		function hideUpdatesOnSmallScreens() {
			const windowWidth = window.innerWidth;
			const updateElements = document.querySelectorAll(".update");

			updateElements.forEach((element) => {
				if (windowWidth < 300) {
					element.style.display = "none";
				} else {
					element.style.display = "block";
				}
			});
		}

		// Initial check for hiding updates
		hideUpdatesOnSmallScreens();

		// Listen for window resize to hide updates accordingly
		window.addEventListener("resize", hideUpdatesOnSmallScreens);
	}

	// Download update
	function downloadUpdate() {
		const link = document.createElement("a");
		link.href = "updates/THE.CUBE.v.2.0.19.apk"; // Replace with the actual path to your APK file
		link.download = "THE.CUBE.v.2.0.19.apk";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// Attach event listener to the download button
	const downloadButton = document.getElementById("download-button");
	if (downloadButton) {
		downloadButton.addEventListener("click", downloadUpdate);
	}

	// Open modal
	window.openModal = function (modalId) {
		const modal = document.getElementById(modalId);
		if (modal) {
			modal.style.display = "block";
		}
	};

	// Close modal
	window.closeModal = function (modalId) {
		const modal = document.getElementById(modalId);
		if (modal) {
			modal.style.display = "none";
		}
	};

	// Close modals when clicking outside of them
	window.addEventListener("click", (event) => {
		const signinModal = document.getElementById("signin-modal");
		const aboutModal = document.getElementById("about-modal");

		if (event.target === signinModal) {
			closeModal("signin-modal");
		} else if (event.target === aboutModal) {
			closeModal("about-modal");
		}
	});
});
