import React, { useEffect, useState } from "react";
import "./Bookings.css";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import axios from "axios";
import { useUserContext } from "../../hooks/useUserContext";
import BookingCard from "../../components/BookingCard/BookingCard";
import noData from "../../assets/noData.svg";
import { BASE_URL } from "../../components/App/App";

const Bookings = () => {
  const { user } = useUserContext();
  const [bookingArray, setBookingArray] = useState([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/bookings`).then((response) => {
      const { data } = response;
      setBookingArray(data.reverse());

      if (data.filter((place) => place?.user === user?.email)?.length > 0) {
        setEmpty(false);
      }
    });
  }, []);

  return (
    <div className="bookings">
      <div className="profile-nav-parent">
        <ProfileNavbar />
      </div>
      <div className="booking-card-parent">
        {empty ? (
          <div className="no-data-found">
            <h2>No Bookings Found</h2>
            <img src={noData} alt="Empty...." />
          </div>
        ) : (
          bookingArray
            .filter((place) => place?.user === user?.email)
            .map((item, index) => <BookingCard key={index} user={item} />)
        )}
      </div>
    </div>
  );
};

export default Bookings;
