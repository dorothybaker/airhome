import { Schema, model } from "mongoose";

const BookingSchema = new Schema(
  {
    place: { type: Schema.Types.ObjectId, ref: "Place" },
    fullName: String,
    email: String,
    phone: String,
    price: Number,
    dates: [Date],
    guests: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Booking = model("Booking", BookingSchema);

export default Booking;
