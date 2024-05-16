import React, { useState } from "react";
import RegisterIMG from "../../assets/signup.gif";
import { Link } from "react-router-dom";
import "./Register.css";
import { useRegister } from "../../hooks/useRegister";
import Home from "../Home/Home";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
  };

  if (
    localStorage.getItem("user") !== null &&
    localStorage.getItem("user") !== undefined
  ) {
    return <Home />;
  }

  return (
    <div className="register-parent">
      <div className="register-left">
        <img src={RegisterIMG} className="register-image" alt="Sign Up" />
      </div>
      <div className="register-right">
        <h1>
          Create an <p>Account</p>
        </h1>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />

        <div className="register-btn" onClick={handleSubmit}>
          Register
        </div>
        <div className="register-olduser">
          Already have an account?{" "}
          <Link className="register-login-redirect" to={"/login"}>
            {" "}
            Login
          </Link>
        </div>
        <div style={{ color: "red" }} className="register-olduser">
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Register;
