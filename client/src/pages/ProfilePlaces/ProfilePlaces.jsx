import React, { useEffect, useState } from "react";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import "./ProfilePlaces.css";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import { useUserContext } from "../../hooks/useUserContext";
import noPlace from "../../assets/noPlaces.svg";
import { BASE_URL } from "../../components/App/App";

const ProfilePlaces = () => {
  const { user } = useUserContext();
  const [empty, setEmpty] = useState(true);
  const [placesArray, setPlacesArray] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/places`).then((response) => {
      const { data } = response;
      setPlacesArray(data);

      if (data.filter((place) => place?.owner === user?.email)?.length > 0) {
        setEmpty(false);
      }
    });
  }, [user?.email]);

  return (
    <div className="profile-places">
      <div className="profile-nav-parent">
        <ProfileNavbar />
      </div>
      <div className="profile-places-parent">
        <Link to={"/profile/places/new"} className="add-btn">
          <i className="fa-solid fa-plus"></i>
          <p>Add Places </p>
        </Link>
      </div>
      <div className="my-places">
        {empty ? (
          <div className="no-data-found">
            <h2>Nothing Here Yet</h2>
            <img src={noPlace} alt="Nothing Here Yet" />
          </div>
        ) : (
          placesArray
            .filter((place) => place?.owner === user?.email)
            .map((item) => (
              <PlaceCard to={"/profile/places"} key={item?._id} place={item} />
            ))
        )}
      </div>
    </div>
  );
};

export default ProfilePlaces;
