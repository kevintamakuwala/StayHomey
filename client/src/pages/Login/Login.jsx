import React, { useContext, useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useLogin } from "../../hooks/useLogin";
import LoginImg from "../../assets/login.svg";
import Home from "../Home/Home";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  if (
    localStorage.getItem("user") !== null &&
    localStorage.getItem("user") !== undefined
  ) {
    return <Home/>
  }

  return (
    <div className="login-parent">
      <div className="login-left">
        <img src={LoginImg} alt="" />
      </div>
      <div className="login-form">
        <h1>
          Hello! <p>Welcome</p> Back
        </h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          value={email}
          type="text"
          placeholder="Enter Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="Enter Password"
        />
        <div className="login-btn" onClick={handleSubmit}>
          Login
        </div>
        <div className="login-newhere">
          New Here?{" "}
          <Link className="login-register-redirect" to={"/register"}>
            {" "}
            Register
          </Link>
        </div>
        <div style={{ color: "red" }} className="login-newhere">
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;
