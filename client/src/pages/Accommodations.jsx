import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/makeRequest";
import Place from "../components/Place";
import AccSkeleton from "../utils/acc.skelecton";

function Accommodations() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/places/owner");
        if (res.status === 200) {
          setPlaces(res.data);
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
      <div className="flex flex-col gap-3">
        <button
          className="bg-primary w-max mx-auto text-white flex items-center gap-2 px-5 py-2 rounded-full"
          onClick={() => navigate("/accommodations/new")}
        >
          <IoAddOutline size={20} />
          <span className="text-[15.5px]">Add new place</span>
        </button>
        {loading ? (
          <AccSkeleton />
        ) : places.length > 0 ? (
          <div className="grid lg:grid-cols-4 md:gap-6 sm:gap-3 lg:gap-3 sm:grid-cols-2 grid-cols-1 gap-3">
            {places.map((place) => (
              <Place place={place} key={place._id} />
            ))}
          </div>
        ) : (
          <div className="sm:min-h-[400px] min-h-[400px] w-full flex items-center justify-center">
            <span className="md:text-4xl sm:text-3xl text-2xl text-gray-400 text-center">
              You don't have any accommodations yet!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accommodations;
