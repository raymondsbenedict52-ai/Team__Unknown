// models/Water.js
import mongoose from "mongoose";

export default mongoose.model(
    "Water",
    new mongoose.Schema({
        user: mongoose.Schema.Types.ObjectId,
        amount: Number,
        date: { type: Date, default: Date.now },
    })
);
