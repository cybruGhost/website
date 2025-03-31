import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	sendEmailVerification,
	isSignInWithEmailLink,
	signInWithEmailLink,
	applyActionCode,
	setPersistence,
	browserLocalPersistence,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
apiKey: "",
authDomain: "",
projectId: "-4",
storageBucket: "be-..com",
messagingSenderId: "",
appId: "",
measurementId: "",
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set auth persistence to LOCAL to keep the user signed in even after browser closure
setPersistence(auth, browserLocalPersistence).catch((error) => {
	console.error("Error setting persistence:", error);
});

function showSection(sectionId) {
	document.querySelectorAll(".auth-section").forEach((section) => {
		section.style.display = section.id === sectionId ? "block" : "none";
	});
}

document
	.getElementById("show-sign-in")
	.addEventListener("click", () => showSection("sign-in-section"));
document
	.getElementById("show-sign-up")
	.addEventListener("click", () => showSection("sign-up-section"));
document
	.getElementById("show-forgot-password")
	.addEventListener("click", () => showSection("forgot-password-section"));
document
	.getElementById("show-sign-up-from-forgot")
	.addEventListener("click", () => showSection("sign-up-section"));
document
	.getElementById("show-sign-in-from-forgot")
	.addEventListener("click", () => showSection("sign-in-section"));

// Handle sign-up form submission
document
	.getElementById("sign-up-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const email = document.getElementById("sign-up-email").value;
		const password = document.getElementById("sign-up-password").value;

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			await sendEmailVerification(user);
			document.getElementById("sign-up-success-message").innerText =
				"Sign-up successful! Please verify your email.";
		} catch (error) {
			document.getElementById(
				"sign-up-error-message"
			).innerText = `Error: ${error.message}`;
		}
	});

// Handle sign-in form submission
document
	.getElementById("sign-in-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const email = document.getElementById("sign-in-email").value;
		const password = document.getElementById("sign-in-password").value;

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			if (user.emailVerified) {
				alert("Sign-in successful!");
				window.location.href = "cub4.html"; // Redirect to cub4.html after successful sign-in
			} else {
				document.getElementById("sign-in-error-message").innerText =
					"Please verify your email first.";
			}
		} catch (error) {
			document.getElementById(
				"sign-in-error-message"
			).innerText = `Error: ${error.message}`;
		}
	});

// Handle password reset
document
	.getElementById("forgot-password-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		const email = document.getElementById("forgot-password-email").value;

		try {
			await sendPasswordResetEmail(auth, email);
			document.getElementById("forgot-password-message").innerText =
				"Password reset email sent!";
		} catch (error) {
			document.getElementById(
				"forgot-password-message"
			).innerText = `Error: ${error.message}`;
		}
	});

// Handle email link sign-in and verification
window.addEventListener("load", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const oobCode = urlParams.get("oobCode");
	const email = urlParams.get("email");

	if (oobCode && isSignInWithEmailLink(auth, window.location.href)) {
		try {
			await applyActionCode(auth, oobCode);
			document.getElementById("email-verified-section").style.display = "block";
			document
				.getElementById("continue-button")
				.addEventListener("click", () => {
					window.location.href = "https://thecub4.netlify.app"; // Redirect to main site after verification
				});
		} catch (error) {
			console.error("Error verifying email:", error);
		}
	}
});

// Automatically redirect if the user is already signed in
onAuthStateChanged(auth, (user) => {
	if (user && user.emailVerified) {
		window.location.href = "cub4.html";
	}
});

// Toggle password visibility for Sign Up
document
	.getElementById("toggle-sign-up-password")
	.addEventListener("click", function () {
		const passwordField = document.getElementById("sign-up-password");
		const isPasswordVisible = passwordField.type === "text";
		passwordField.type = isPasswordVisible ? "password" : "text";
		this.textContent = isPasswordVisible ? "👁️" : "👁️"; // Optionally, change icon to indicate visibility
	});

// Toggle password visibility for Sign In
document
	.getElementById("toggle-sign-in-password")
	.addEventListener("click", function () {
		const passwordField = document.getElementById("sign-in-password");
		const isPasswordVisible = passwordField.type === "text";
		passwordField.type = isPasswordVisible ? "password" : "text";
		this.textContent = isPasswordVisible ? "👁️" : "👁️"; // Optionally, change icon to indicate visibility
	});

// Add logout functionality
document.getElementById("logout-button").addEventListener("click", () => {
	signOut(auth)
		.then(() => {
			window.location.href = "index.html"; // Redirect to the login page after logout
		})
		.catch((error) => {
			console.error("Error signing out:", error);
		});
});
