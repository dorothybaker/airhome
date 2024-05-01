import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../utils/makeRequest";

import {
  IoChevronForwardOutline,
  IoImageOutline,
  IoLocationOutline,
} from "react-icons/io5";
import SingleSkeleton from "../utils/single.skeleton";
import { Button, Loader, Modal, NumberInput, TextInput } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { DatePickerInput } from "@mantine/dates";

import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";

function SinglePlace() {
  const { id } = useParams();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("airhomeUser"))
  );
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("airhomeUser")));
  }, []);

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([]);
  const [guests, setGuests] = useState(1);

  const [desc, setDesc] = useState(false);

  const [nights, setNights] = useState(0);

  const [name, setName] = useState(user?.fullName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState("");

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/places/${id}`);
        if (res.status) {
          setPlace(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (date.length > 1) {
      setNights(differenceInDays(date[1], date[0]));
    }
  }, [date]);

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/bookings/ids");
        if (res.status === 200) {
          setBookings(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const [bLoad, setBLoad] = useState(false);

  const navigate = useNavigate();
  const handleBooking = async () => {
    setBLoad(true);
    try {
      const res = await API.post(`/bookings/${place._id}`, {
        fullName: name,
        email,
        phone,
        guests,
        price: place.price * nights,
        dates: date,
      });

      if (res.status === 200) {
        toast.success("Reservation successfully made!");
        navigate("/bookings");
        setPhone("");
      }
    } catch (error) {
      console.log(error);
      setBLoad(false);
    } finally {
      setBLoad(false);
    }
  };

  const [cLoad, setCLoad] = useState(false);
  const handleCancel = async () => {
    setCLoad(true);
    try {
      const res = await API.post(`/bookings/cancel/${place?._id}`, {});

      if (res.status === 200) {
        toast.success("Booking successfully cancelled!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setCLoad(false);
    } finally {
      setCLoad(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      {loading ? (
        <SingleSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-[#111]">{place?.title}</h1>
            <div className="flex items-center gap-[2px] text-[#222]">
              <div>
                <IoLocationOutline size={20} />
              </div>
              <Link
                to={`https://www.google.com/maps?q=${place?.address}`}
                target="_blank"
                className="text-sm"
              >
                {place?.address}
              </Link>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-5 sm:h-[400px] h-[320px] gap-2">
            <div
              className="lg:col-span-2 col-span-3 sm:h-[400px] h-[320px] cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <img
                src={place?.photos[0]}
                alt=""
                className="object-cover w-full h-full rounded-l-2xl"
              />
            </div>
            <div className="lg:col-span-1 col-span-2 lg:flex hidden flex-col gap-2">
              <div
                className="sm:h-[196px] h-[156px] cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <img
                  src={place?.photos[3]}
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
              <div
                className="sm:h-[196px] h-[156px] cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <img
                  src={place?.photos[4]}
                  alt=""
                  className="object-cover h-full w-full"
                />
              </div>
            </div>
            <div className="lg:col-span-1 col-span-2 flex flex-col gap-2">
              <div
                className="sm:h-[196px] h-[156px] cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <img
                  src={place?.photos[1]}
                  alt=""
                  className="object-cover h-full w-full rounded-tr-2xl"
                />
              </div>
              <div className="sm:h-[196px] h-[156px] relative">
                <img
                  src={place?.photos[2]}
                  alt=""
                  className="object-cover h-full w-full rounded-br-2xl"
                />
                <div className="absolute top-0 left-0 h-full w-full flex items-end justify-end sm:px-2 sm:py-4 p-2">
                  <button
                    className="text-white bg-primary px-3 py-2 text-sm rounded-lg text-[14.5px] flex items-center gap-1"
                    onClick={() => setOpen(true)}
                  >
                    <div>
                      <IoImageOutline size={20} />
                    </div>
                    <span className="sm:hidden block">See More</span>
                    <span className="sm:block hidden">Show all photos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:grid flex flex-col grid-cols-3 lg:gap-7 gap-3">
            <div className="flex flex-col gap-3.5 col-span-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-sm text-gray-500 capitalize">hosted by</h2>
                <div className="flex items-center gap-1.5">
                  <div>
                    <div className="w-[37px]">
                      <img
                        src={`https://avatar.iran.liara.run/username?username=${
                          place?.owner.fullName.split(" ")[0]
                        }+${place?.owner.fullName.split(" ")[1]}`}
                        alt=""
                        width={37}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px]">{place?.owner.fullName}</span>
                    <span className="text-sm text-gray-500">
                      Superhost <span className="text-primary">&#9733;</span>{" "}
                      4.5{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-sm text-gray-500">Description</h2>
                <p className="leading-7 text-[15px] sm:text-justify line-clamp-6">
                  {place?.description.split(".").map((s, id) => (
                    <span className="block" key={id}>
                      {s}.
                    </span>
                  ))}
                </p>
                <button
                  className="w-max flex items-center gap-0.5 text-sm text-primary"
                  onClick={() => setDesc(true)}
                >
                  <span className="underline underline-offset-2 mb-1">
                    Show more
                  </span>
                  <IoChevronForwardOutline size={13} />
                </button>
              </div>
              <Modal
                title="ABOUT THIS PLACE"
                centered
                opened={desc}
                onClose={setDesc}
                size={"lg"}
              >
                <div>
                  <p className="text-[15px] leading-7">
                    {place?.description.split(".").map((s, id) => {
                      if (s !== "") {
                        return (
                          <span className="block" key={id}>
                            {s}.
                          </span>
                        );
                      }
                    })}
                  </p>
                </div>
              </Modal>
              <div className="flex flex-col gap-1">
                <h2 className="text-sm text-gray-500">
                  What this place offers
                </h2>
                <p className="text-[15px]">{place?.perks.join(", ")}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-sm text-gray-500">Things to know</h2>
                <div className="flex flex-col gap-2">
                  <p className="text-[15px]">
                    <span className="mr-1">Check-in:</span> {place?.checkIn}
                  </p>
                  <p className="text-[15px]">
                    <span className="mr-1">Check-out:</span> {place?.checkOut}
                  </p>
                  <p className="text-[15px]">
                    <span className="mr-1">Max number of guests:</span>{" "}
                    {place?.maxGuests}
                  </p>
                  <p className="text-[15px]">
                    <span className="mr-1">Price per night:</span> $
                    {place?.price}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-gray-100 p-3 rounded-xl shadow-sm h-max flex flex-col gap-5">
              <h1 className="text-3xl">
                ${place?.price}{" "}
                <span className="text-sm text-gray-500">/ per night</span>
              </h1>
              <div className="border border-gray-300 rounded-xl px-2 py-3 flex flex-col gap-3">
                <div>
                  <DatePickerInput
                    type="range"
                    clearable
                    label="Your check-in and check-out dates"
                    placeholder={
                      bookings.includes(place?._id)
                        ? "Reservation already made"
                        : "Check in - Check out"
                    }
                    minDate={new Date()}
                    value={date}
                    onChange={setDate}
                    size="md"
                    disabled={bookings.includes(place?._id)}
                  />
                </div>
                <NumberInput
                  min={1}
                  label="Number of guests"
                  size="md"
                  value={guests}
                  onChange={setGuests}
                  disabled={bookings.includes(place?._id)}
                />
              </div>
              {nights > 0 && (
                <div className="flex items-center justify-between px-2">
                  <span>
                    ${place.price} * {nights}{" "}
                    <span className="text-sm">nights</span>
                  </span>
                  <span className="text-xl">${place.price * nights}</span>
                </div>
              )}

              {user && nights > 0 && (
                <div className="flex flex-col gap-1">
                  <TextInput
                    value={user?.fullName}
                    onChange={(e) => setName(e.target.value)}
                    label="Full Name"
                    size="md"
                    required
                  />
                  <TextInput
                    value={user?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email Address"
                    size="md"
                    required
                    type="email"
                  />
                  <TextInput
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    label="Phone Number"
                    type="tel"
                    placeholder="+123 - 456 - 7890"
                    size="md"
                    required
                  />
                </div>
              )}
              {bookings.includes(place?._id) ? (
                <Button
                  color="red"
                  size="md"
                  disabled={cLoad}
                  onClick={handleCancel}
                >
                  {cLoad ? (
                    <Loader size={"sm"} color="red" />
                  ) : (
                    "Cancel your reservation"
                  )}
                </Button>
              ) : user ? (
                <button
                  className={`h-10 bg-primary text-white text-[15px] w-full rounded-2xl ${
                    bLoad ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={user && nights > 0 ? handleBooking : null}
                  disabled={bLoad}
                >
                  {bLoad ? (
                    <Loader size={"sm"} color="white" />
                  ) : (
                    "Reserve this place"
                  )}
                </button>
              ) : (
                <button
                  className="h-10 bg-primary text-white text-[15px] w-full rounded-2xl"
                  onClick={(e) => {
                    e.preventDefault;
                    setLoginOpen(true);
                  }}
                >
                  Reserve this place
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <h2 className="text-sm text-gray-500 capitalize">extra info</h2>
            <p className="leading-7 text-[15px]">{place?.extraInfo}</p>
          </div>
        </div>
      )}
      <Modal
        centered
        opened={open}
        onClose={setOpen}
        title="ALL PHOTOS"
        size={"lg"}
      >
        <Carousel withIndicators className="sm:h-[450px] h-[350px] w-full">
          {place?.photos.map((photo, id) => (
            <Carousel.Slide key={id}>
              <img
                src={photo}
                className="w-full h-[350px] sm:h-[450px] object-cover"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </Modal>
      <LoginModal
        open={loginOpen}
        setOpen={setLoginOpen}
        setRegister={setRegisterOpen}
      />
      <RegisterModal
        open={registerOpen}
        setLogin={setLoginOpen}
        setOpen={setRegisterOpen}
      />
    </div>
  );
}

export default SinglePlace;
