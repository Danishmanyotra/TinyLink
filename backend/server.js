import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
