import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, default: "No description provided" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Book', bookSchema);