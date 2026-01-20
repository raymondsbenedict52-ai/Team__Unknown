import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/ai.routes.js";
import mealRoutes from "./routes/meal.routes.js";
import waterRoutes from "./routes/water.routes.js";
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/water", waterRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("🚀 Medi-AI Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
