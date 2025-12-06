import express from "express";
import helmet from "helmet";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import { redirectHandler } from "./core/redirect.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: "https://tinylink-frontend-k0cg.onrender.com",
  methods: "GET,POST,DELETE",
}));
app.use(express.json());

// healthcheck
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// API routes
app.use("/api/links", linkRoutes);

// Redirect route MUST be below API routes (so /api/... doesn't get matched)
app.get("/:code", redirectHandler);

// 404 for other API endpoints
app.use((req, res, next) => {
  if (req.path.startsWith("/api/") || req.path === "/healthz") {
    // Let errorHandler handle 404s for API
    return res.status(404).json({ error: "Not found" });
  }
  // For any other non-API frontend route (if using single-page frontend), you may want to serve index.html here.
  return res.status(404).send("Not found");
});

app.use(errorHandler);

export default app;
