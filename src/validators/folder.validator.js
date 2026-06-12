// validators/folder.validator.js

import { z } from "zod";

export const createFolderSchema = z.object({
    name: z
        .string()
        .min(2, "Folder name must be at least 2 characters"),

    parentFolder: z.string().optional(),
});

export const updateFolderSchema = z.object({
    name: z
        .string()
        .min(2, "Folder name must be at least 2 characters"),
});