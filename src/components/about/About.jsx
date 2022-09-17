import React from "react";
import "./about.css";

const About = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img src="/images/aboutPageImg.jpg" alt="" className="a-img" />
        </div>
      </div>
      <div className="a-right"></div>
    </div>
  );
};

export default About;
