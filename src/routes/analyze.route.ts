import express from "express";
import { runAnalyzeHandler } from "../controllers/analyze.controller";

const router = express.Router();

// POST /api/analyze
router.post("/", runAnalyzeHandler);

export default router;
