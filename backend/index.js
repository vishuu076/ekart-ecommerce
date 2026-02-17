import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import connectDB from './database/db.js';
import { connect } from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import CartRoutes from './routes/cartRoutes.js'
import orderRoute from './routes/orderRoute.js'





const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://YOUR_FRONTEND.vercel.app'
    ],
    credentials: true
}));



// Base Route
app.use("/api/auth", userRoute);
app.use("/api/product", productRoute)
app.use("/api/cart", CartRoutes)
app.use("/api/orders", orderRoute)


// ... after app.use("/api/auth", userRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        message,
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});