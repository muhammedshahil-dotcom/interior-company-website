import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Load environment variables from the backend .env (includes Atlas URI, email creds, etc.)
dotenv.config({ path: path.join(__dirname, ".env") });

import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/reviews.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";
import { seedProjects } from "./utils/seedProjects.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MongoDB URI loaded:", MONGO_URI ? "YES" : "NO");

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

async function start() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing");
    }
    // Single Mongo connection reused across routes
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB Atlas");
    await seedProjects();
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Server failed to start", err);
    process.exit(1);
  }
}

start();
