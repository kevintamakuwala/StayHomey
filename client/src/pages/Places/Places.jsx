import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import "./Places.css";
import Shimmer from "../../components/Shimmer/Shimmer";
import { BASE_URL } from "../../components/App/App";

const Places = () => {
  const [placesArray, setPlacesArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/places`).then((response) => {
      const { data } = response;
      setPlacesArray(data.reverse());
      setLoading(false);
    });
  }, []);

  const [search, setSearch] = useState("");

  let filtered = [];
  for (let i = 0; i < placesArray.length; i++) {
    if (placesArray[i].address.toLowerCase().includes(search.toLowerCase())) {
      filtered = [...filtered, placesArray[i]];
    }
  }

  return (
    <>
      {loading ? (
        <Shimmer />
      ) : (
        <>
          <div className="search-container">
            <input
              type="search"
              placeholder="Search By City"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="places">
            {filtered.map((item) => (
              <PlaceCard to={"/places"} key={item._id} place={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Places;
