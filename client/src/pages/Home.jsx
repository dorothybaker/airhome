import { useEffect, useState } from "react";
import Header from "../components/Header";
import { API } from "../utils/makeRequest";
import AccSkeleton from "../utils/acc.skelecton";
import Card from "../components/Card";

function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/places");
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
    <div>
      <Header search={search} setSearch={setSearch} />
      <div className="max-w-7xl w-full mx-auto p-4">
        {loading ? (
          <AccSkeleton />
        ) : (
          <div>
            <div className="grid lg:grid-cols-4 md:gap-6 sm:gap-3 lg:gap-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {places
                .filter(
                  (place) =>
                    place.title.toLowerCase().includes(search.toLowerCase()) ||
                    place.address.toLowerCase().includes(search.toLowerCase())
                )
                ?.map((place) => (
                  <Card key={place._id} place={place} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
