import { Link } from "react-router-dom";

function Card({ place }) {
  return (
    <div className="flex flex-col gap-1 shadow-md rounded-xl">
      <Link to={`/accommodations/${place._id}`}>
        <div>
          <img
            src={place.photos[0]}
            alt=""
            className="w-full h-[270px] object-cover rounded-t-xl"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-[3px] px-3 pb-3">
        <span className="text-[17px] line-clamp-1">
          <Link to={`/accommodations/${place._id}`}>{place.title}</Link>
        </span>
        <span className="text-[13px] text-gray-500 line-clamp-1">
          {place.address}
        </span>
        <p className="text-gray-600 text-sm">
          <span className="text-[21px] text-black">${place.price}</span> / per
          night
        </p>
      </div>
    </div>
  );
}

export default Card;
