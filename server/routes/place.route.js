import { Router } from "express";
import { protectRoute } from "../utils/protectedRoute.js";
import {
  addPlace,
  getAllPlaces,
  getOwnerPlaces,
  getPlace,
} from "../controllers/place.controller.js";

const placeRouter = Router();

placeRouter.post("/add", protectRoute, addPlace);
placeRouter.get("/owner", protectRoute, getOwnerPlaces);
placeRouter.get("/", getAllPlaces);
placeRouter.get("/:id", getPlace);

export default placeRouter;
