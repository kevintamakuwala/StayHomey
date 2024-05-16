import React, { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { COMPANY_NAME_1, COMPANY_NAME_2 } from '../../utils/data';
import Icon from "../../assets/icon.svg"

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state)
  }
  return (
    <div className='navbar-parent'>
      <div className="nav-left">
        <Link to={'/'} className='logo-link'>
          <img className='logo-img' src={Icon} alt="" />
          <div className="logo-name">{COMPANY_NAME_1}<p>{COMPANY_NAME_2}</p></div>
        </Link>
      </div>
      {/*  */}
      <div className={state ? "nav-center active" : "nav-center"}>
        <div className="navlink" onClick={handleClick} ><Link className='navlink-link' to={`/places`}>Explore</Link></div>
        <div className="navlink" onClick={handleClick} ><Link className='navlink-link' to={`/about`}>About</Link></div>
        <div className="navlink" onClick={handleClick} ><Link className='navlink-link' to={`/contact`}>Contact</Link></div>
      </div>

      <div className="nav-right">

        {user && (
          <Link to={'./profile'} className='user-nav'>
            <div className='user-icon'><i className="fa-solid fa-user"></i></div>
          </Link>
        )}
        {!user && (
          <div className="login-btn"><Link className='navbar-login-link' to={'/login'}>Login</Link></div>
        )}
        <div className="hamburger-icon" onClick={handleClick}><i className={state ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i></div>
      </div>
    </div>
  )
}

export default Navbar