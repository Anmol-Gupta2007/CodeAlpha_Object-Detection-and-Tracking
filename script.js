const videoInput = document.getElementById("videoInput");
const videoPlayer = document.getElementById("videoPlayer");
const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("status");

let animationId;

// Upload Video
videoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const url = URL.createObjectURL(file);
        videoPlayer.src = url;
    }
});

// Simulated Detection Visualization
function detectObjects() {

    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;

    ctx.drawImage(
        videoPlayer,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Dummy Bounding Box
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 3;

    ctx.strokeRect(100, 80, 150, 120);

    ctx.fillStyle = "lime";
    ctx.font = "18px Arial";
    ctx.fillText("Person ID: 1", 100, 70);

    animationId = requestAnimationFrame(detectObjects);
}

startBtn.addEventListener("click", () => {

    statusText.textContent =
        "Detection Running...";

    videoPlayer.play();

    detectObjects();
});

stopBtn.addEventListener("click", () => {

    statusText.textContent =
        "Stopped";

    cancelAnimationFrame(animationId);
});
