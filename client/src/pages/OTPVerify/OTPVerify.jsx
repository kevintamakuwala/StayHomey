import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./OTPVerify.css";
import { BASE_URL } from "../../components/App/App";

const OTPVerify = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const email = id;

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const code = {
    userId: email,
    otp: otp,
  };

  const getData = async (code) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/verifyOTP`, code);
      if (res.data.status == "verified") {
        toast("Verification Successful", {
          type: "success",
        });
        navigate("/");
      } else {
        setError(res.data.message);
        toast(error, {
          type: "error",
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    await getData(code);
  };

  return (
    <div className="otp-parent">
      <div className="otp-center">
        <div className="otp-input-parent">
          <h2>We Have Sent You A Code</h2>
          <h3>Enter it below to verify Email</h3>
          <p>{email}</p>
          <input
            className="otp-input"
            maxLength="4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
          />
        </div>
        <button onClick={handelSubmit}>SUBMIT</button>
      </div>
      <ToastContainer theme="colored" position="bottom-center" />
    </div>
  );
};

export default OTPVerify;
