import { Schema, model } from "mongoose";

const PlaceSchema = new Schema(
  {
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Place = model("Place", PlaceSchema);

export default Place;
