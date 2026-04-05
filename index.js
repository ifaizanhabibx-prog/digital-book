import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import Book from "./models/Book.js";

// Initialize Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Middleware (Must come BEFORE routes)
app.use(cors({
    origin: "https://faizan-virid.vercel.app/",
})); 
app.use(express.json()); 

// Routes
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
    res.send("Digital Library API is running...");
});

// Database Connection Logic
const connectDB = async () => {
    try {
        if (!mongoURI) {
            throw new Error("MONGO_URI is missing from your .env file!");
        }
        
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB Atlas');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server is sprinting on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Error connecting to MongoDB:', err.message);
        console.log('👉 Tip: Check if your Cluster is PAUSED or if your IP is whitelisted.');
        process.exit(1); // Stop the server if DB fails
    }
};

connectDB();