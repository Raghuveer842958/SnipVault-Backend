import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});

export default authLimiter;