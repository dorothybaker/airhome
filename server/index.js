import { config } from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./utils/connectToDB.js";
import placeRouter from "./routes/place.route.js";
import bookingRouter from "./routes/booking.route.js";

import path from "path";

config();

const app = express();
const PORT = process.env.PORT;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/places", placeRouter);
app.use("/api/bookings", bookingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});
