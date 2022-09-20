import React, { useRef } from "react";
import "./contact.css";
import Phone from "../../img/phone-call.png";
import Email from "../../img/email.png";
import Address from "../../img/map.png";

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
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
              +1 647 607 0989
            </div>
            <div className="c-info-item">
              <img src={Email} alt="" className="c-icon" />
              parthdarji20@gmail.com
            </div>
            <div className="c-info-item">
              <img src={Address} alt="" className="c-icon" />
              381 Krug street, Kitchener, ON, Canada
            </div>
          </div>
        </div>
        <div className="c-right">
          <p className="c-desc">
            <b>What's your story?</b> Get in touch. Always available for coding
            if the right project comes along with me.
          </p>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input type="text" placeholder="Your name" name="userName" />
            <input type="text" placeholder="Subject" name="userSubject" />
            <input type="text" placeholder="Your email" name="userEmail" />
            <textarea rows="5" placeholder="Your message" name="message" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
