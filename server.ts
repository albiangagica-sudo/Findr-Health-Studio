import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
  });

  // API Route: Image Proxy for Google Drive
  // Resolves mobile loading issues by bypassing cross-site tracking protections
  app.get("/api/image-proxy", async (req, res) => {
    const fileId = req.query.id as string;
    if (!fileId) return res.status(400).send("File ID required");

    try {
      // Use the thumbnail endpoint with w1600 for high resolution + compression
      const driveUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
      const response = await fetch(driveUrl);
      
      if (!response.ok) {
        // Fallback to basic view link if thumbnail fails
        const fallbackUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        const fallbackResponse = await fetch(fallbackUrl);
        if (!fallbackResponse.ok) throw new Error("Failed to fetch from Google Drive");
        
        const contentType = fallbackResponse.headers.get("content-type");
        if (contentType) res.setHeader("Content-Type", contentType);
        res.setHeader("Cache-Control", "public, max-age=86400"); // 24h cache
        const buffer = await fallbackResponse.arrayBuffer();
        res.send(Buffer.from(buffer));
        return;
      }
      
      const contentType = response.headers.get("content-type");
      if (contentType) res.setHeader("Content-Type", contentType);
      
      // Aggressive caching for performance
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      
      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (error) {
      console.error("Image proxy error:", error);
      res.status(500).send("Error proxying image");
    }
  });

  // API Route: Mock Payment Intent (Placeholder for Stripe)
  app.post("/api/create-payment-intent", (req, res) => {
    // In a real app, you would use the Stripe secret key here
    // Example: const intent = await stripe.paymentIntents.create({...})
    const { amount } = req.body;
    res.json({ 
      clientSecret: `mock_secret_${Math.random().toString(36).substring(7)}`,
      amount: amount 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
