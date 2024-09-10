import mongoose from "mongoose";

/**
 * @description - MongoDB connection function
 */
export default async function connectionDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("[Mongoose]: connected successfully");
    } catch (err) {
        console.error(err);
    }
}