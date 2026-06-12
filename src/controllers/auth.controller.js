import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import {
    registerSchema,
    loginSchema,
} from "../validators/auth.validator.js";



export const registerUser = async (req, res, next) => {
    try {
        const validatedData = registerSchema.parse(req.body);

        const { name, email, password } = validatedData;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
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

export const loginUser = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);

        const { email, password } = validatedData;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordMatched = await user.matchPassword(password);

        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
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

export const logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
};

