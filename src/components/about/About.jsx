import React from "react";
import "./about.css";
// import Award from "../../img/award.png";

const About = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img src="/images/aboutPageImg.jpg" alt="" className="a-img" />
        </div>
      </div>
      <div className="a-right">
        <h1 className="a-title">About Me</h1>
        <p className="a-sub">Software Developer</p>
        <p className="a-desc">
          &#x2022; Experience in Software Development Life Cycle SDLC
          involving Requirement Gathering, Analysis, Logical Physical
          Architectural Modeling, Design, Development, Testing, Implementation,
          and Production Support.
          <br></br>&#x2022; Expert in designing and developing web and
          windows-based applications using MVC, ASP.NET, C#, ADO.NET, Entity
          Framework, Enterprise Library, LINQ, SOAP, Web Services, AJAX Control
          Tool Kit, IIS, XML, and XSLT.<br></br>&#x2022; Experience in designing
          web pages with HTML, JavaScript, CSS, HTML 5, CSS3, and JQuery in a
          hand-coded environment.<br></br>&#x2022; Sound knowledge of Object
          Oriented Programming OOPS Concepts including Inheritance, Abstraction,
          and Polymorphism.<br></br>&#x2022; Implemented applications using
          Model View Controller MVC design pattern.
          <br></br>&#x2022; Good experience with development methodologies like
          Agile SCRUM, Waterfall, and Test-driven development.<br></br>&#x2022;
          Developed a POC to create ASP.NET MVC application which in turn uses
          ASP.NET Web API application in Visual Studio.
          <br></br>&#x2022; Able to work as a team as well as
          individually. Highly organized, and dedicated with a positive attitude
          along with strong analytical and troubleshooting skills.
        </p>
        <p className="a-desc-mobile">
          &#x2022; Experience in Software Development Life Cycle SDLC
          involving Requirement Gathering, Analysis, Logical Physical
          Architectural Modeling, Design, Development, Testing, Implementation,
          and Production Support.<br></br>&#x2022; Experience in designing web
          pages with HTML, JavaScript, CSS, HTML 5, CSS3, and JQuery in a
          hand-coded environment.
        </p>
        {/* <div className="a-award">
          <img src={Award} alt="" className="a-award-img" />
          <div className="a-award-texts">
            <h4 className="a-award-title">International Coding Award 2022</h4>
            aliquip ex ea commodo consequat duis aute irure dolor in reprehende.
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;
