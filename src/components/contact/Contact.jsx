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
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const initialValues = {
    name,
    subject,
    email,
    message,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(initialValues));
    if (Object.keys(error).length === 0 && isSubmit) {
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

  const validate = (values) => {
    const formErrors = {};
    const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!values.name) {
      formErrors.name = "Name is requried!!";
      setDone(false);
      setIsSubmit(true);
    }
    if (!values.subject) {
      formErrors.subject = "Subject is requried!!";
      setDone(false);
      setIsSubmit(true);
    }
    if (!values.email) {
      formErrors.email = "Email is requried!!";
      setDone(false);
      setIsSubmit(true);
    } else if (!emailRegex.test(values.email)) {
      formErrors.email = "Invalid email";
      setDone(false);
      setIsSubmit(true);
    }
    if (!values.message) {
      formErrors.message = "message is requried!!";
      setDone(false);
      setIsSubmit(true);
    }
    return formErrors;
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
                href="tel:+1 519-897-2236"
                style={{
                  textDecoration: "none",
                  color: darkMode ? "white" : "#222",
                }}
              >
                +1 519-897-2236
              </a>
            </div>
            <div className="c-info-item">
              <img src={Email} alt="" className="c-icon" />
              <a
                href="mailto: parthdarji8825@gmail.com"
                style={{
                  textDecoration: "none",
                  color: darkMode ? "white" : "#222",
                }}
              >
                parthdarji8825@gmail.com
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
              <span style={{ color: "red" }}> {error.name}</span>
            </div>
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="Subject"
              name="userSubject"
              onChange={(e) => setSubject(e.target.value)}
            />
            <div>
              <span style={{ color: "red" }}> {error.subject}</span>
            </div>
            <input
              style={{ backgroundColor: darkMode && "#333" }}
              type="text"
              placeholder="email"
              name="userEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <span style={{ color: "red" }}> {error.email}</span>
            </div>
            <textarea
              style={{ backgroundColor: darkMode && "#333" }}
              rows="5"
              placeholder="Your message"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <div>
              <span style={{ color: "red" }}> {error.message}</span>
            </div>
            <div>
              <button>Submit</button>
            </div>
            {done && "Thank you...Your mail has been sent successfully"}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
