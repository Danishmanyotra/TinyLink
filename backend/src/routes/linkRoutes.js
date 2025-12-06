import express from "express";
import { createLink, listLinks, getLink, deleteLink } from "../controllers/linkController.js";

const router = express.Router();

// POST /api/links
router.post("/", createLink);

// GET /api/links
router.get("/", listLinks);

// GET /api/links/:code
router.get("/:code", getLink);

// DELETE /api/links/:code
router.delete("/:code", deleteLink);

export default router;
