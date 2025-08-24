import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

// Health check (Render ke liye)
app.get("/healthz", (req, res) => {
  res.send("ok");
});

// Root test
app.get("/", (req, res) => {
  res.send("🚀 Video Downloader Proxy is Running!");
});

// Download proxy route
app.get("/download", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).send("❌ Video URL missing!");
  }

  try {
    const response = await fetch(videoUrl);
    if (!response.ok) throw new Error("Fetch failed");

    res.setHeader("Content-Type", "video/mp4");
    response.body.pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("❌ Failed to fetch video");
  }
});

// Port for Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
