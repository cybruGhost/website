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
        alert("You need to register or log in to download the app. You will be redirected to the registration page.");
        window.location.href = "index.html";
    }
});
