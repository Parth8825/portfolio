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
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [regexError, setRegexError] = useState(false);
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(false);
    setRegexError(false);
    if (
      name.length === 0 ||
      email.length === 0 ||
      message.length === 0 ||
      subject.length === 0
    ) {
      setError(true);
    } else if (!email.match(emailRegex)) {
      setRegexError(true);
    } else {
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
            e.target.reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
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
                style={{
                  textDecoration: "none",
                  color: darkMode ? "white" : "#222",
                }}
              >
                +1 647-607-0989
              </a>
            </div>
            <div className="c-info-item">
              <img src={Email} alt="" className="c-icon" />
              <a
                href="mailto: parthdarji20@gmail.com"
                style={{
                  textDecoration: "none",
                  color: darkMode ? "white" : "#222",
                }}
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
                style={{
                  textDecoration: "none",
                  color: darkMode ? "white" : "#222",
                }}
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
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              {error && name.length <= 0 ? (
                <label style={{ color: "red" }}> Name is empty!!</label>
              ) : (
                ""
              )}
            </div>
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="Subject"
              name="userSubject"
              onChange={(e) => setSubject(e.target.value)}
            />
            <div>
              {error && subject.length <= 0 ? (
                <label style={{ color: "red" }}> Subject is empty!!</label>
              ) : (
                ""
              )}
            </div>
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="email"
              name="userEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              {error && email.length <= 0 ? (
                <label style={{ color: "red" }}> Email Id is empty!!</label>
              ) : (
                ""
              )}
            </div>
            <div>
              {regexError ? (
                <label style={{ color: "red" }}> Invalid Email</label>
              ) : (
                ""
              )}
            </div>
            <textarea
              style={{ backgroundColor: darkMode && "#333" }}
              rows="5"
              placeholder="Your message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <div>
              {error && message.length <= 0 ? (
                <label style={{ color: "red" }}> Your message is empty!!</label>
              ) : (
                ""
              )}
            </div>
            <div>
              <button>Submit</button>
            </div>
            {done && "Thank you...You mail has been sent successfully"}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
