const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// API URL
const externalApiUrl = 'https://api.pexels.com/v1/';

// Static files (HTML, CSS, JS) serve karne ke liye
app.use(express.static(__dirname));

// Proxy setup for Pexels API
app.use('/api', createProxyMiddleware({
  target: externalApiUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    // API key ko header me add karein, jise hum Render ke environment variable se le rahe hain
    proxyReq.setHeader('Authorization', process.env.PEXELS_API_KEY);
  }
}));

// Route to serve your main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'deepseek_html_20250821_53126d (2).html'));
});

// Server ko start karein
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
