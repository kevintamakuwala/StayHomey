import React from 'react'
import "./About.css"
import { ABOUT, FACT_CARDS } from '../../utils/data'
import Animation from '../../components/Animation/Animation'

const About = () => {
  return (
    <div className="about-page">
      <Animation/>
      <div className="about">
        <h2><i className="fa-solid fa-quote-left"></i> About us</h2>
        <p>{ABOUT}</p>
      </div>

      <div className="about-stats">
        <h2><i className="fa-solid fa-quote-right"> </i> Fast Facts</h2>
        <div className="about-card-container">
          {
            FACT_CARDS.map((item, index) => (
              <div key={index} className="about-card">
                <div className="about-card-top">
                  <h1>{item.stat}</h1>
                  <h3>{item.desc}</h3>
                </div>
                <p>-{item.date}</p>
              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default About