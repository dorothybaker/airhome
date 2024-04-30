import { Link } from "react-router-dom";

function Place({ place }) {
  return (
    <div className="flex flex-col gap-1 shadow-md rounded-xl">
      <div>
        <img
          src={place.photos[0]}
          alt=""
          className="w-full h-[270px] object-cover rounded-t-xl"
        />
      </div>
      <div className="flex flex-col gap-[1px] px-3 pb-3">
        <span className="text-[15.5px] line-clamp-1">
          <Link to={`/accommodations/${place._id}`}>{place.title}</Link>
        </span>
        <span className="text-[13px] text-gray-500 line-clamp-3">
          {place.description}
        </span>
      </div>
    </div>
  );
}

export default Place;
