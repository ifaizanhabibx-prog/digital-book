import express from "express";
import Book from "../models/Book.js";
const router = express.Router();

// 1. Get All Books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Delete a Book
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Update a Book (Fixes applied here!)
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate( // FIX: 'f' must be lowercase
            req.params.id,
            req.body, // FIX: changed 'request.body' to 'req.body'
            { new: true, runValidators: true } // Added runValidators for security
        );
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;