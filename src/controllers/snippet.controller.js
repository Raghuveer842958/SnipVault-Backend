import Snippet from "../models/Snippet.js";
import { createSnippetSchema, updateSnippetSchema } from "../validators/snippet.validator.js";
import Folder from "../models/Folder.js";


export const createSnippet = async (req, res, next) => {
    try {

        const validatedData = createSnippetSchema.parse(req.body);

        const snippet = await Snippet.create({
            ...validatedData,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Snippet created successfully",
            snippet,
        });

    } catch (error) {
        next(error);
    }
};

export const getAllSnippets = async (req, res, next) => {
    try {

        const snippets = await Snippet.find({
            createdBy: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: snippets.length,
            snippets,
        });

    } catch (error) {
        next(error);
    }
};

export const exploreSnippets = async (req, res, next) => {
    try {

        const {
            search = "",
            language,
            sort = "newest",
            page = 1,
            limit = 10,
        } = req.query;

        const query = {
            visibility: "public",
        };

        // Search title or tags
        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    tags: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Language filter
        if (language) {
            query.language = language;
        }

        let sortOption = {
            createdAt: -1,
        };

        // Most liked
        if (sort === "likes") {
            sortOption = {
                likes: -1,
            };
        }

        const snippets = await Snippet.find(query)
            .populate("createdBy", "name")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalSnippets =
            await Snippet.countDocuments(query);

        res.status(200).json({
            success: true,
            currentPage: Number(page),
            totalPages: Math.ceil(
                totalSnippets / limit
            ),
            totalSnippets,
            snippets,
        });

    } catch (error) {
        next(error);
    }
};

export const getSnippetById = async (req, res, next) => {
    try {

        const snippet = await Snippet.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        res.status(200).json({
            success: true,
            snippet,
        });

    } catch (error) {
        next(error);
    }
};

export const updateSnippet = async (req, res, next) => {
    try {

        const validatedData = updateSnippetSchema.parse(req.body);

        const snippet = await Snippet.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        Object.assign(snippet, validatedData);

        await snippet.save();

        res.status(200).json({
            success: true,
            message: "Snippet updated successfully",
            snippet,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteSnippet = async (req, res, next) => {
    try {

        const snippet = await Snippet.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        await Snippet.findByIdAndDelete(snippet._id);

        res.status(200).json({
            success: true,
            message: "Snippet deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const toggleLikeSnippet = async (req, res, next) => {
    try {

        const snippet = await Snippet.findById(req.params.id);

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        const userId = req.user._id.toString();

        const alreadyLiked = snippet.likes.some(
            (id) => id.toString() === userId
        );

        if (alreadyLiked) {

            snippet.likes = snippet.likes.filter(
                (id) => id.toString() !== userId
            );

            await snippet.save();

            return res.status(200).json({
                success: true,
                message: "Snippet unliked successfully",
                likesCount: snippet.likes.length,
            });
        }

        snippet.likes.push(req.user._id);

        await snippet.save();

        res.status(200).json({
            success: true,
            message: "Snippet liked successfully",
            likesCount: snippet.likes.length,
        });

    } catch (error) {
        next(error);
    }
};

export const moveSnippetToFolder = async (req, res, next) => {
    try {

        const { folderId } = req.body;

        const snippet = await Snippet.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!snippet) {
            return res.status(404).json({
                success: false,
                message: "Snippet not found",
            });
        }

        const folder = await Folder.findOne({
            _id: folderId,
            createdBy: req.user._id,
        });

        if (!folder) {
            return res.status(404).json({
                success: false,
                message: "Folder not found",
            });
        }

        snippet.folder = folder._id;

        await snippet.save();

        res.status(200).json({
            success: true,
            message: "Snippet moved successfully",
            snippet,
        });

    } catch (error) {
        next(error);
    }
};