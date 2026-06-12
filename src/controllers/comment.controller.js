import Comment from "../models/Comment.js";
import Snippet from "../models/Snippet.js";
import { createCommentSchema } from "../validators/comment.validator.js";

export const createComment = async (req, res, next) => {
    try {

        const validatedData = createCommentSchema.parse(req.body);

        const snippet = await Snippet.findById(req.params.snippetId);

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        const comment = await Comment.create({
            text: validatedData.text,
            snippetId: snippet._id,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment,
        });

    } catch (error) {
        next(error);
    }
};


export const getCommentsBySnippet = async (req, res, next) => {
    try {

        const comments = await Comment.find({
            snippetId: req.params.snippetId,
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteComment = async (req, res, next) => {
    try {

        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        if (
            comment.createdBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own comments",
            });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};