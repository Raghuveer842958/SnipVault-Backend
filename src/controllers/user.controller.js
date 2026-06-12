import User from "../models/User.js";
import Snippet from "../models/Snippet.js";
import Folder from "../models/Folder.js";

import { updateProfileSchema } from "../validators/user.validator.js";


export const getDashboardData = async (
    req,
    res,
    next
) => {
    try {

        const userId = req.user._id;

        const totalSnippets =
            await Snippet.countDocuments({
                createdBy: userId,
            });

        const totalFolders =
            await Folder.countDocuments({
                createdBy: userId,
            });

        const snippets = await Snippet.find({
            createdBy: userId,
        });

        const totalLikesReceived =
            snippets.reduce(
                (acc, snippet) =>
                    acc + snippet.likes.length,
                0
            );

        const recentSnippets =
            await Snippet.find({
                createdBy: userId,
            })
                .sort({ createdAt: -1 })
                .limit(5);

        res.status(200).json({
            success: true,

            dashboard: {
                totalSnippets,
                totalFolders,
                totalLikesReceived,
                recentSnippets,
            },
        });

    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (
    req,
    res,
    next
) => {
    try {

        const validatedData =
            updateProfileSchema.parse(req.body);

        const user = await User.findById(
            req.user._id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (validatedData.name) {
            user.name = validatedData.name;
        }

        if (validatedData.avatar) {
            user.avatar = validatedData.avatar;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });

    } catch (error) {
        next(error);
    }
};