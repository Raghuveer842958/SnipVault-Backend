import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    getDashboardData,
    updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    getDashboardData
);

router.put(
    "/profile",
    authMiddleware,
    updateProfile
);

export default router;