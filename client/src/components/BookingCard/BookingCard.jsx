import React, { useEffect, useState } from "react";
import "./BookingCard.css";
import { format } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ShimmerBookings from "../Shimmer/ShimmerBookings";
import { BASE_URL } from "../App/App";

const BookingCard = (props) => {
  const [place, setPlace] = useState({
    photos: [],
  });
  const booking = props.user;
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");

  const handelReviewSubmit = (e) => {
    e.preventDefault();
    if (review.length < 100) {
      toast("Minimum Length is 100 Characters", {
        type: "error",
      });
      return;
    }

    const data = { place: booking.place, review: review };

    try {
      axios.post(`${BASE_URL}/review/addReview`, data).then(() => {
        setReview("");
        toast("Review Submited", {
          type: "success",
        });
      });
    } catch (error) {}
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/places/${booking.place}`).then((response) => {
      const { data } = response;
      setPlace(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <ShimmerBookings />
      ) : (
        <div className="booking-card">
          <ToastContainer position="bottom-center" limit={5} theme="colored" />
          <div className="booking-card-left">
            <img src={place?.photos[0]} alt="Photo" />
          </div>
          <div className="booking-card-right">
            <div className="card-right-details">
              <div className="upper-text">
                <h2>{place?.title}</h2>
                <p>{place?.address}</p>
              </div>
              <div className="booking-timings">
                <div>
                  <i className="fa-regular fa-calendar-days"></i>{" "}
                  {format(new Date(booking?.checkIn), "dd/MM/yyyy")}
                </div>
                <div className="timing-arrow">
                  {" "}
                  <i className="fa-solid fa-arrow-right-long"></i>{" "}
                </div>
                <div>
                  <i className="fa-regular fa-calendar-days"></i>{" "}
                  {format(new Date(booking?.checkOut), "dd/MM/yyyy")}
                </div>
              </div>
              <div className="bottom-details">
                <div>
                  <i className="fa-solid fa-user-group"></i>{" "}
                  {booking?.numberOfGuests}
                </div>
                <div>₹{booking?.price}</div>
              </div>
            </div>
            <div className="add-review">
              <form onSubmit={handelReviewSubmit} action="">
                <input
                  value={review}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  minLength={100}
                  maxLength={500}
                  type="text"
                  placeholder="Write a Review"
                />
                <button>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
