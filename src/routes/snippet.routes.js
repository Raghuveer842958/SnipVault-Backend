import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    createSnippet,
    getAllSnippets,
    getSnippetById,
    updateSnippet,
    deleteSnippet,
    toggleLikeSnippet,
    moveSnippetToFolder,
    exploreSnippets,
} from "../controllers/snippet.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createSnippet);

router.get("/", authMiddleware, getAllSnippets);

router.get("/explore/all", authMiddleware, exploreSnippets);

router.get("/:id", authMiddleware, getSnippetById);

router.put("/:id", authMiddleware, updateSnippet);

router.delete("/:id", authMiddleware, deleteSnippet);

router.post("/:id/like", authMiddleware, toggleLikeSnippet);

router.put("/:id/move", authMiddleware, moveSnippetToFolder);

export default router;