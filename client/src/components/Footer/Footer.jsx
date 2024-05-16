import React from 'react'
import { Link } from 'react-router-dom'
import { LINKEDIN, TWITTER, GITHUB, INSTAGRAM, COMPANY_NAME_1, COMPANY_NAME_2, COPYRIGHT, NAVLINKS } from '../../utils/data'
import "./Footer.css"
import ICON from "../../assets/icon.svg"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-left">
        <div className="footer-logo">
          <div className="footer-logo-img"><img src={ICON}></img></div>
          <div className="footer-logo-name">{COMPANY_NAME_1}<p>{COMPANY_NAME_2}</p></div>
        </div>
        <div className="footer-copyright">{COPYRIGHT}</div>
        <div className="footer-socials">
          <a href={LINKEDIN} target={'blank'} className='linkedin'>
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href={TWITTER} target={'blank'} className='twitter'>
            <i className="fa-brands fa-twitter"></i>

          </a>
          <a href={GITHUB} target={'blank'} className='github'>
            <i className="fa-brands fa-github"></i>

          </a>
          <a href={INSTAGRAM} target={'blank'} className='instagram'>
            <i className="fa-brands fa-instagram"></i>
          </a>

        </div>
      </div>
      <div className="footer-right">
        <div className="quick-links">
          <h1>Quick Links</h1>
          {
            NAVLINKS.map((item) => (
              <Link key={item} to={`/${item}`} className='footer-quicklink'>{item}</Link>
            ))
          }
        </div>
        <div className="quick-links">
          <h1>Support</h1>
          <Link to={'/register'} className='footer-quicklink'>Register</Link>
          <Link to={'/login'} className='footer-quicklink'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer