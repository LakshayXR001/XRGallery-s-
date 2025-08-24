import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Health check route (Render ke liye zaroori)
app.get("/healthz", (req, res) => {
  res.send("ok");
});

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Instagram Downloader Proxy is Running!");
});

// Example download proxy
app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send("❌ Video URL missing!");

  try {
    const response = await fetch(videoUrl);
    res.setHeader("Content-Type", "video/mp4");
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("❌ Failed to fetch video");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
