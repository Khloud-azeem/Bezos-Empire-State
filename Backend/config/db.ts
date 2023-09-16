import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        const dbUri = process.env.MONGO_DB_URI
        if (dbUri)
            mongoose.connect(dbUri)
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('Connected to MongoDB database successfully!');
        });

        db.on('disconnected', () => {
            console.log('MongoDB connection disconnected');
        });

        db.on('reconnected', () => {
            console.log('MongoDB connection reconnected');
        });
    } catch (err) {
    }
}

export default connectDB
