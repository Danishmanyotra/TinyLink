import express from "express";
import helmet from "helmet";
import cors from "cors";
import linkRoutes from "./routes/linkRoutes.js";
import { redirectHandler } from "./core/redirect.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});


app.use("/api/links", linkRoutes);


app.get("/:code", redirectHandler);


app.use((req, res, next) => {
  if (req.path.startsWith("/api/") || req.path === "/healthz") {
    
    return res.status(404).json({ error: "Not found" });
  }
  
  return res.status(404).send("Not found");
});

app.use(errorHandler);

export default app;
