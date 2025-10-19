import express from "express";
import { chatWithAI, aiHealth } from "../controllers/aiController.js";

const router = express.Router();

router.get("/health", aiHealth);

router.post("/chat", chatWithAI);
export default router;