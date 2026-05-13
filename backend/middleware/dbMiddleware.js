import connectDB from "../database/db.js";

const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed: " + error.message
        });
    }
};

export default dbMiddleware;
