import "./Profile.css";
import ProfileNavbar from "../../components/ProfileNavbar/ProfileNavbar";
import profilePic from "../../assets/profilePic.png";
import { useUserContext } from "../../hooks/useUserContext";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Profile = () => {
  const { logout } = useLogout();
  const [owner, setOwner] = useState("");
  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();
  const getuser = async () => {
    const { user } = await useUserContext();
    if (!user) {
      navigate("/");
    }
    setOwner(user.email);
  };
  getuser();

  return (
    <div className="profile">
      <div className="profile-nav-parent">
        <ProfileNavbar />
      </div>
      <div className="profile-parent">
        <img src={profilePic} alt="" />
        <h1>Your Profile</h1>
        <p>Email: {owner}</p>
        <div onClick={handleLogout} className="logout-btn">
          Logout
        </div>
      </div>
    </div>
  );
};

export default Profile;
