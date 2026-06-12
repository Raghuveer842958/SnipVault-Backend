import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import {
    createFolder,
    getAllFolders,
    getFolderById,
    updateFolder,
    deleteFolder,
    getFolderSnippets
} from "../controllers/folder.controller.js";


const router = express.Router();


router.post("/", authMiddleware, createFolder);

router.get("/", authMiddleware, getAllFolders);

router.get("/:id", authMiddleware, getFolderById);

router.put("/:id", authMiddleware, updateFolder);

router.delete("/:id", authMiddleware, deleteFolder);

router.get("/:id/snippets", authMiddleware, getFolderSnippets);

export default router;