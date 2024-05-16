import { useState } from "react";
import { useUserContext } from "./useUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../components/App/App";

export const useRegister = () => {
  const [error, setError] = useState("");
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const register = async (name, email, password) => {
    setError(null);
    const user = { name, email, password };
    try {
      await axios.post(`${BASE_URL}/user/register`, user);
      navigate(`/verify/${email}`);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: { name, email } });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return { register, error };
};
