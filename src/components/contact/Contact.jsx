import React, { useContext, useRef, useState } from "react";
import "./contact.css";
import Phone from "../../img/phone-call.png";
import Email from "../../img/email.png";
import Address from "../../img/map.png";
import emailjs from "@emailjs/browser";
import { ThemeContext } from "../../context";

const Contact = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false);
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_wggal0m",
        "template_yuu9elc",
        formRef.current,
        "4QFN7_0-E4dVmMD8Y"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="c-title">Let's discuss your project</h1>
          <div className="c-info">
            <div className="c-info-item">
              <img src={Phone} alt="" className="c-icon" />
              <a
                href="tel:+1 647-607-0989"
                style={{ textDecoration: "none", color: "black" }}
              >
                +1 647-607-0989
              </a>
            </div>
            <div className="c-info-item">
              <img src={Email} alt="" className="c-icon" />
              <a
                href="mailto: parthdarji20@gmail.com"
                style={{ textDecoration: "none", color: "black" }}
              >
                parthdarji20@gmail
              </a>
            </div>
            <div className="c-info-item">
              <img src={Address} alt="" className="c-icon" />
              <a
                href="http://maps.google.com/?q=Krug street, Kitchener, ON, Canada"
                target={"_blank"}
                rel="noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                Krug street, Kitchener, ON, Canada
              </a>
            </div>
          </div>
        </div>
        <div className="c-right">
          <p className="c-desc">
            <b>What's your story?</b> Get in touch. Always available for coding
            if the right project comes along with me.
          </p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="name"
              name="userName"
            />
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="Subject"
              name="userSubject"
            />
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="email"
              name="userEmail"
            />
            <textarea
              style={{ backgroundColor: darkMode && "#333" }}
              rows="5"
              placeholder="Your message"
              name="message"
            />
            <button>Submit</button>
            {done && "   Thank you..."}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
