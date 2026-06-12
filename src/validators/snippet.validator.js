import { z } from "zod";

export const createSnippetSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),

    code: z.string().min(1, "Code is required"),

    language: z.string().min(1, "Language is required"),

    description: z.string().optional(),

    tags: z.array(z.string()).optional(),

    visibility: z.enum(["public", "private"]),
});


export const updateSnippetSchema = z.object({
    title: z.string().min(3).optional(),

    code: z.string().optional(),

    language: z.string().optional(),

    description: z.string().optional(),

    tags: z.array(z.string()).optional(),

    visibility: z.enum(["public", "private"]).optional(),

    folder: z.string().optional(),
});