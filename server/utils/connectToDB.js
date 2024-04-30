import { config } from "dotenv";
import mongoose from "mongoose";

config();

const MONGO_URL = process.env.MONGO_URL;

export const connectToDB = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB!"));
};
