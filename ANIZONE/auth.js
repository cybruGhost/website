// Import the auth object from firebaseConfig.js
import { auth } from './firebaseConfig.js';

// Function to handle download button click
document.getElementById("downloadBtn").addEventListener("click", () => {
    const user = auth.currentUser;

    if (user) {
        // User is authenticated, proceed with download
        window.location.href = "apk/anizone.apk";
    } else {
        // User is not authenticated, show notification and redirect
        const modal = document.getElementById("notificationModal");
        const closeBtn = document.querySelector(".close");

        // Show the modal
        modal.style.display = "block";

        // Close the modal when the user clicks on <span> (x)
        closeBtn.onclick = function() {
            modal.style.display = "none";
            window.location.href = "index.html";
        };

        // Close the modal when the user clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                window.location.href = "index.html";
            }
        };
    }
});
