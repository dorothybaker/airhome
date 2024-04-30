import { Link } from "react-router-dom";
import moment from "moment";
import { differenceInDays } from "date-fns";

function BookingCard({ booking }) {
  return (
    <div className="flex flex-col gap-1 shadow-md rounded-xl">
      <Link to={`/accommodations/${booking.place._id}`}>
        <div>
          <img
            src={booking.place.photos[0]}
            alt=""
            className="w-full h-[270px] object-cover rounded-t-xl"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-[1px] px-3 pb-3">
        <div className="flex flex-col gap-[1px]">
          <span className="text-lg line-clamp-1">
            <Link to={`/accommodations/${booking.place._id}`}>
              {booking.place.title}
            </Link>
          </span>
          <span className="text-xl text-primary">${booking.price}</span>
          <span className="text-sm text-gray-500">
            {moment(booking.dates[0]).format("MMM Do, YYYY")} &ndash;{" "}
            {moment(booking.dates[1]).format("MMM Do, YYYY")} &nbsp; (
            {differenceInDays(booking.dates[1], booking.dates[0])} nights)
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">{booking.fullName}</span>
          <span className="text-sm">{booking.email}</span>
          <span className="text-sm">{booking.phone}</span>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
