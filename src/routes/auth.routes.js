import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../controllers/auth.controller.js";
import authLimiter from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", authLimiter, registerUser);

router.post("/login", authLimiter, loginUser);

router.post("/logout", logoutUser);

router.get("/me", authMiddleware, getCurrentUser);

export default router;