import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo connected ${conn.connection.host}`);
    }
    catch (error)
    {
        console.log("Error connecting to mongo", error.message);
        process.exit(1);
    }
}