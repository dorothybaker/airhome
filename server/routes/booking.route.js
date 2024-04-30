import { Router } from "express";
import { protectRoute } from "../utils/protectedRoute.js";
import {
  cancelBooking,
  createBooking,
  getBookingIds,
  getBookings,
} from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.post("/:id", protectRoute, createBooking);
bookingRouter.get("/", protectRoute, getBookings);
bookingRouter.get("/ids", protectRoute, getBookingIds);
bookingRouter.post("/cancel/:id", protectRoute, cancelBooking);

export default bookingRouter;
