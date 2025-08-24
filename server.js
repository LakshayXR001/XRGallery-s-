import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// API: user se video link lo aur return karo
app.get("/download", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "❌ URL required" });

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36",
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: "❌ Failed to fetch video" });
    }

    // Instagram video hoga to content-type check karo
    res.set("Content-Type", "video/mp4");
    response.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Something went wrong" });
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Instagram Downloader Proxy is Running!");
});

app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));