import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  const { fullName, email, phone, price, dates, guests } = req.body;

  try {
    const booking = await Booking.findOne({ place: id, user: userId });
    if (booking)
      return res.status(403).json("The place is already booked by you!");

    const newBooking = new Booking({
      fullName,
      place: id,
      email,
      phone,
      price,
      dates,
      guests,
      user: userId,
    });

    if (newBooking) {
      await newBooking.save();
      res.status(200).json("Place booked successfully!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBookings = async (req, res) => {
  const userId = req.user._id;

  try {
    const bookings = await Booking.find({ user: userId }).populate("place");

    if (bookings) res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBookingIds = async (req, res) => {
  const userId = req.user._id;

  try {
    const bookings = await Booking.find({ user: userId }).populate("place");

    if (bookings) {
      const bookingIds = bookings.map((booking) => booking.place._id);
      res.status(200).json(bookingIds);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const cancelBooking = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const booking = await Booking.findOneAndDelete({ place: id, user: userId });

    if (booking) res.status(200).json("Booking successfully cancelled");
  } catch (error) {
    res.status(500).json(error);
  }
};
