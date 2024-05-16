import React from 'react'
import "./ProfileNavbar.css"
import { Link, useLocation } from "react-router-dom";

const ProfileNavbar = () => {
    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[2];
    if (subpage === undefined) {
        subpage = 'profile';
    }
    function linkClasses(type = null) {
        let classes = 'p-navlink';
        if (type === subpage) {
            classes += ' p-active';
        } else {
            classes += ' p-inactive';
        }
        return classes;
    }
    return (
        <nav className='profile-navbar'>
            <Link className={linkClasses('profile')} to={'/profile'}>
                <i className="fa-regular fa-user"></i>
                Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/profile/bookings'}>
                <i className="fa-regular fa-bookmark"></i>
                Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/profile/places'}>
                <i className="fa-regular fa-building"></i>
                My Places
            </Link>
        </nav>)
}

export default ProfileNavbar