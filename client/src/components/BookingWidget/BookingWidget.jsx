import React, { useState } from "react";
import "./BookingWidget.css";
import { useUserContext } from "../../hooks/useUserContext";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

import { useNavigate } from "react-router-dom";
import "./BookingWidget.css";
import { BASE_URL } from "../App/App";

const BookingWidget = (props) => {
  const place = props.place;
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useUserContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    if (!user) {
      setError("Login or Signup First");
    } else {
      const response = await axios.post(`${BASE_URL}/bookings`, {
        checkIn: checkIn,
        checkOut: checkOut,
        numberOfGuests: numberOfGuests,
        name: name,
        phone: phone,
        user: user.email,
        place: place._id,
        price: numberOfNights * place.price,
      });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const bookingId = response.data._id;
        navigate(`/profile/bookings`);
      }
    }
  };

  return (
    <div className="widget-parent">
      <div className="widget-price">Price: ₹{place.price} / per night</div>
      <div className="widget-detail-parent">
        <div className="widget-details">
          <div className="widget-check">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              required={true}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="widget-check">
            <label>Check out:</label>
            <input
              type="date"
              required={true}
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="widget-max-guest">
          <label>
            <i className="fa-solid fa-people-group"> </i> Number of guests:
          </label>
          <input
            type="number"
            required={true}
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="extra-details">
            <div className="widget-extra">
              <label>
                <i className="fa-solid fa-user"> </i>Your full name:
              </label>
              <input
                type="text"
                required={true}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="widget-extra">
              <label>
                <i className="fa-solid fa-phone"> </i> Phone number:
              </label>
              <input
                type="tel"
                placeholder="+919876543210"
                required={true}
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <button onClick={bookThisPlace}>
        Book Now
        {numberOfNights > 0 && <span> at ₹{numberOfNights * place.price}</span>}
      </button>
      <div className="error">
        <span>{error}</span>
      </div>
    </div>
  );
};

export default BookingWidget;
