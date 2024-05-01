import { useEffect, useState } from "react";
import { API } from "../utils/makeRequest";
import AccSkeleton from "../utils/acc.skelecton";
import BookingCard from "../components/BookingCard";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/bookings");
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
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      {loading ? (
        <AccSkeleton />
      ) : bookings.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:gap-6 sm:gap-3 lg:gap-3 sm:grid-cols-2 grid-cols-1 gap-3">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="sm:min-h-[400px] min-h-[400px] w-full flex items-center justify-center">
          <span className="md:text-4xl sm:text-3xl text-2xl text-gray-400 text-center">
            You don't have any bookings yet!
          </span>
        </div>
      )}
    </div>
  );
}

export default Bookings;
