import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRouter from "./routes/user.routes.js";
import snippetRouter from "./routes/snippet.routes.js";
import commentRouter from "./routes/comment.routes.js";
import foldersRouter from "./routes/folder.routes.js";

import errorHandler from "./middleware/error.middleware.js";


dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);


app.use('/api/auth', authRouter)
app.use("/api/snippets", snippetRouter);
app.use("/api/comments", commentRouter);
app.use("/api/folders", foldersRouter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SnipVault API Running",
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});