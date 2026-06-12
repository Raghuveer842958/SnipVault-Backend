import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    createComment,
    getCommentsBySnippet,
    deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:snippetId", authMiddleware, createComment);

router.get("/:snippetId", authMiddleware, getCommentsBySnippet);

router.delete("/:commentId", authMiddleware, deleteComment);

export default router;