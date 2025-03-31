document.addEventListener("DOMContentLoaded", () => {
	const downloadButton = document.getElementById("downloadButton"); // Replace with the actual ID of your button

	function downloadUpdate() {
		const link = document.createElement("a");
		link.href = "Megan media/updata/Jennie.v.1.0.5.b.5.minSDK21.MultiPatch.apk"; // Replace with the actual path to your APK file
		link.download = "Jennie.v.1.0.5.b.5.minSDK21.MultiPatch.apk";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	if (downloadButton) {
		downloadButton.addEventListener("click", downloadUpdate);
	}
});
