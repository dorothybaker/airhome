import {
  Button,
  Checkbox,
  Loader,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { API } from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";

function NewPlace() {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djin7iczh",
        uploadPreset: "e3xcyubv",
        maxFiles: 10,
      },
      (err, result) => {
        if (result.event === "success") {
          setPhotos((prev) => [...prev, result.info.secure_url]);
        }
      }
    );
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await API.post("/places/add", {
        title,
        address,
        description,
        photos,
        perks,
        checkIn,
        checkOut,
        extraInfo,
        maxGuests,
        price,
      });

      if (res.status === 200) {
        setLoading(false);
        setTitle("");
        setAddress("");
        setDescription("");
        setExtraInfo("");
        setCheckIn("");
        setCheckOut("");
        setMaxGuests("");
        setPrice("");
        setPhotos([]);
        setPerks([]);
        navigate("/accommodations");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      <span className="text-[17px] text-black mb-3">
        Create your property listing.
      </span>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          label="Title"
          description="The title of your place. It should be catchy!"
          placeholder="your_title_here"
          size="md"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextInput
          label="Address"
          description="The address to your place!"
          placeholder="your_address_here"
          size="md"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <span className="text-[14px] leading-[15px]">Photos</span>
          <span className="text-sm text-[#868e96]">
            The look of your place. More = Better!
          </span>
          <div className="h-[150px] w-full flex items-center justify-center border-2 border-dashed border-[#868e96]">
            <Button onClick={() => widgetRef.current?.open()}>
              {photos.length > 0
                ? `${photos.length} photos uploaded`
                : "Upload Photos"}
            </Button>
          </div>
        </div>
        <Textarea
          label="Description"
          description="The description of your place!"
          placeholder="your_description_here"
          autosize
          required
          size="lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <span className="text-[14px] leading-[15px]">Perks</span>
          <span className="text-sm text-[#868e96]">
            Select all perks of your place.
          </span>
          <div className="grid md:grid-cols-3 sm:gap-4 sm:grid-cols-2 grid-cols-1 gap-2">
            <Checkbox
              color="#FF385C"
              label="Wi-Fi"
              size="sm"
              value="Wi-Fi"
              onChange={(e) => setPerks((prev) => [...prev, e.target.value])}
            />
            <Checkbox
              color="#FF385C"
              label="Free parking spot"
              size="sm"
              value="Free parking spot"
              onChange={(e) => setPerks((prev) => [...prev, e.target.value])}
            />
            <Checkbox
              color="#FF385C"
              label="TV with DVD player"
              size="sm"
              value="TV with DVD player"
              onChange={(e) => setPerks((prev) => [...prev, e.target.value])}
            />
            <Checkbox
              color="#FF385C"
              label="Kitchen"
              size="sm"
              value="Kitchen"
              onChange={(e) => setPerks((prev) => [...prev, e.target.value])}
            />
            <Checkbox
              color="#FF385C"
              label="Pets allowed"
              size="sm"
              value="Pets allowed"
              onChange={(e) => setPerks((prev) => [...prev, e.target.value])}
            />
            <Checkbox
              color="#FF385C"
              label="Private outdoor pool"
              size="sm"
              value="Private outdoor pool"
              onChange={(e) => setPerks((prev) => [...prev, e.target.value])}
            />
          </div>
        </div>
        <Textarea
          label="Extra Info"
          description="Your house rules, etc!"
          placeholder="extra_info_here"
          autosize
          required
          size="lg"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <div className="flex items-center gap-5 md:flex-row flex-col">
          <TextInput
            label="Check-in time"
            description="Time guests check in!"
            placeholder="12:00 PM"
            size="md"
            required
            className="flex-1 w-full"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <TextInput
            label="Check-out time"
            description="Time guests check out!"
            placeholder="11:00 AM"
            size="md"
            required
            className="flex-1 w-full"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-5 md:flex-row flex-col">
          <NumberInput
            label="Max number of guests"
            description="Guests allowed!"
            placeholder="1"
            min={1}
            size="md"
            required
            className="flex-1 w-full"
            value={maxGuests}
            onChange={setMaxGuests}
          />
          <NumberInput
            label="Price per night"
            description="Cost per night!"
            placeholder="40"
            min={30}
            size="md"
            required
            className="flex-1 w-full"
            value={price}
            onChange={setPrice}
          />
        </div>
        <Button
          color="#FF385C"
          variant="filled"
          className="mt-2"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <Loader size={"sm"} color="#FF385C" />
          ) : (
            "Airhome your home"
          )}
        </Button>
      </form>
    </div>
  );
}

export default NewPlace;
