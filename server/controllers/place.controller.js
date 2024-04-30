import Place from "../models/place.model.js";

export const addPlace = async (req, res) => {
  const userId = req.user._id;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    const newPlace = new Place({
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      owner: userId,
    });

    if (newPlace) {
      await newPlace.save();
      res.status(200).json("Place created successfully!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOwnerPlaces = async (req, res) => {
  const userId = req.user._id;

  try {
    const ownerPlaces = await Place.find({ owner: userId }).sort({
      createdAt: -1,
    });

    if (ownerPlaces) res.status(200).json(ownerPlaces);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });

    if (places) res.status(200).json(places);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getPlace = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id).populate("owner");

    if (place) res.status(200).json(place);
  } catch (error) {
    res.status(500).json(error);
  }
};
