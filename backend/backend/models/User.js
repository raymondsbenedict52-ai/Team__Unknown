import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
            name: {
                    type: String,
                    required: true,
            },

            email: {
                    type: String,
                    required: true,
                    unique: true,
            },

            passwordHash: {
                    type: String,
                    required: true,
            },

            age: Number,

            gender: String,

            dietPreference: String,

            medicalConditions: {
                    type: [String],
                    default: [],
            },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
