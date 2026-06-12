import Comment from "../models/Comment.js";
import Folder from "../models/Folder.js";
import Snippet from "../models/Snippet.js";
import { createFolderSchema, updateFolderSchema } from "../validators/folder.validator.js";


export const createFolder = async (req, res, next) => {
    try {

        const validatedData =
            createFolderSchema.parse(req.body);

        const folder = await Folder.create({
            name: validatedData.name,
            parentFolder:
                validatedData.parentFolder || null,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Folder created successfully",
            folder,
        });

    } catch (error) {
        next(error);
    }
};

export const getAllFolders = async (req, res, next) => {
    try {

        const folders = await Folder.find({
            createdBy: req.user._id,
        })
        .populate("parentFolder", "name")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: folders.length,
            folders,
        });

    } catch (error) {
        next(error);
    }
};

export const getFolderById = async (req, res, next) => {
    try {

        const folder = await Folder.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!folder) {
            return res.status(404).json({
                success: false,
                message: "Folder not found",
            });
        }

        res.status(200).json({
            success: true,
            folder,
        });

    } catch (error) {
        next(error);
    }
};

export const updateFolder = async (req, res, next) => {
    try {

        const validatedData =
            updateFolderSchema.parse(req.body);

        const folder = await Folder.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!folder) {
            return res.status(404).json({
                success: false,
                message: "Folder not found",
            });
        }

        folder.name = validatedData.name;

        await folder.save();

        res.status(200).json({
            success: true,
            message: "Folder updated successfully",
            folder,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteFolder = async (req, res, next) => {
    try {

        const folder = await Folder.findOne({
            _id: req.params.id,
            createdBy: req.user._id,
        });

        if (!folder) {
            return res.status(404).json({
                success: false,
                message: "Folder not found",
            });
        }

        await Snippet.updateMany(
            {
                folder: folder._id,
            },
            {
                $set: {
                    folder: null,
                },
            }
        );

        await folder.deleteOne();

        res.status(200).json({
            success: true,
            message: "Folder deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const getFolderSnippets = async (req, res, next) => {
    try {

        const snippets = await Snippet.find({
            folder: req.params.id,
            createdBy: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: snippets.length,
            snippets,
        });

    } catch (error) {
        next(error);
    }
};