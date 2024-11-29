const form = document.getElementById("videoForm");
const videoUrlInput = document.getElementById("videoUrl");
const loadingDiv = document.getElementById("loading");
const resultDiv = document.getElementById("result");
const downloadButton = document.getElementById("downloadButton");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const videoUrl = videoUrlInput.value.trim();
  if (!videoUrl) {
    alert("Please enter a valid video URL!");
    return;
  }

  // Show loading animation
  loadingDiv.classList.remove("hidden");
  resultDiv.classList.add("hidden");

  try {
    // Make API request
    const response = await fetch("https://social-media-video-dowloader-api.onrender.com/api/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_url: videoUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch video. Please try again!");
    }

    const data = await response.json();

    // Hide loading animation and show result
    loadingDiv.classList.add("hidden");
    resultDiv.classList.remove("hidden");

    // Programmatically download the video
    downloadButton.onclick = () => {
      const a = document.createElement("a");
      a.href = data.data.url;
      a.download = "video.mp4"; // Force download with filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  } catch (error) {
    loadingDiv.classList.add("hidden");
    alert(error.message);
  }
});
