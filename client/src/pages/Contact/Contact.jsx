import React, { useRef, useState } from "react";
import "./Contact.css";
import Animation from "../../components/Animation/Animation";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact_IMG from "../../assets/Contact.svg";

const Contact = () => {
  const PUBLIC_USER_KEY = import.meta.env.VITE_REACT_APP_PUBLIC_USER_KEY;
  const SERVICE_ID = import.meta.env.VITE_REACT_APP_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_REACT_APP_TEMPLATE_ID;

  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  var templateParams = {
    sender: name,
    email: email,
    subject: subject,
    message: message,
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_USER_KEY,
      })
      .then(
        () => {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          toast("Message Sent Successfully", {
            type: "success",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <>
      <Animation />
      <div className="contact-container">
        <div className="contact-top-parent">
          <div className="contact-top-left">
            <p>Get in Touch</p>
            <h2>Visit our Agency or Contact us Today</h2>
            <div className="contact-left-bottom">
              <p>
                <i className="fa-regular fa-map"></i> Address - Surat, India
              </p>
              <p>
                <i className="fa-regular fa-envelope"></i> Email -
                contact@stayhomey.com
              </p>
              <p>
                <i className="fa-solid fa-phone"></i> Ph No. - +91 1234567890
              </p>
              <p>
                <i className="fa-regular fa-clock"></i> Timings - Monday-Friday:
                9AM to 6PM
              </p>
            </div>
          </div>
          <div className="contact-top-right">
            <img src={Contact_IMG} alt="Contact" />
          </div>
        </div>
        <div className="contact-parent">
          <div className="section-heading">Send a Message</div>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-left">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                placeholder="Your Name"
              />
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-input"
                placeholder="Your Email"
              />
              <input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="form-input"
                placeholder="Subject"
              />
            </div>
            <div className="form-right">
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-textarea"
                placeholder="Your Message"
              />
              <button className="form-btn">Send</button>
            </div>
          </form>
          <ToastContainer position="bottom-center" theme={"colored"} />
        </div>
      </div>
    </>
  );
};

export default Contact;
