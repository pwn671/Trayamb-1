import React from "react";
import SimpleSlider from "../../components/slider/Slider";
import "./home.css";
import "./homeResponsive.css";
import photoBg from "../../images/backgroung/homeBg.jpg";
import { Link } from "react-router-dom";
import { BsArrowRight, BsTelephone } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import services from "../services/services.json";
import thoughts from "./peopleThoughts.json";
import CountUp from "react-countup";

import home1 from "../../images/home/home1.jpg";
import hPoject1 from "../../images/home/hProject1.jpg";
import hhProject2 from "../../images/home/hProject2.jpg";
import hhProject3 from "../../images/home/hProject3.jpg";
import hhProject4 from "../../images/home/hProject4.jpg";
import hArticle1 from "../../images/home/hArticle1.jpg";
import hArticle2 from "../../images/home/hArticle2.jpg";
import hArticle3 from "../../images/home/hArticle3.jpg";
import brand1 from "../../images/brand1.svg";
import brand2 from "../../images/brand2.svg";
import brand3 from "../../images/brand3.svg";
import brand4 from "../../images/brand4.svg";
import brand5 from "../../images/brand5.svg";
import customer1 from "../../images/home/customer.jpg";
import ArticlesBlog from "../blog/ArticlesBlog";
import Homeproject from "../../Components/Homeproject";

function Home() {
  const handleChange = (e) => {
    const pClass = e.target.parentElement;
    console.log(e.target);
    if (e.target.className === "article nochosen") {
      for (let i = 0; i < pClass.childNodes.length; i++) {
        pClass.childNodes[i].className = "article nochosen";
      }
      e.target.classList.remove("nochosen");
      e.target.classList.add("chosen");
    } else if (e.target.className === "article chosen") {
      e.target.className = "article nochosen";
    }
  };
  return (
    <div className="home">
      {/* <div className="homeNews" style={{ backgroundImage: `url(${photoBg})` }}>
        <h1>Let Your Home Be Unique</h1>
        <p>
          There are many variations of the passages of lorem Ipsum
          fromavailable,variations of the passages.
        </p>
        <Link to="">
          <button>
            Get Started
            <BsArrowRight style={{ marginLeft: "2%", color: "#CDA274" }} />
          </button>
        </Link>
      </div> */}
      <SimpleSlider />
      <div className="homeOther">
        <div className="homePlans">
          {services.services
            .filter((services, index) => index < 3)
            .map((s, ind) => {
              return (
                <div className="homePlan" key={ind}>
                  <h2>{s.service_name}</h2>
                  <p>{s.service_content}</p>
                  <Link to={`/project-details`}>
                    <button>
                      Read More
                      <BsArrowRight
                        style={{ marginLeft: "4%", color: "#CDA274" }}
                      />
                    </button>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="homeAboutUs">
          <div className="hp-subtext">
            <h1>We Create The Art Of Stylish Living Stylishly</h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the of readable content of a page when lookings at its layouts the
              points of using that it has a more-or-less normal.
            </p>
            <div className="callUs">
              <div className="phoneNum">
                <p className="h-icon">
                  <BsTelephone />
                </p>
                <a href="tel: +994 (070) 883-37-38">
                  <p>
                    +994 (070) 883-37-38
                    <br />
                    <span>Call Us Anytime</span>
                  </p>
                </a>
                <br />
              </div>

              <Link to={`/contact`}>
                <button>
                  Get Free Estimate
                  <BsArrowRight
                    style={{ marginLeft: "2%", color: "#CDA274" }}
                  />
                </button>
              </Link>
            </div>
          </div>
          <div className="hp-img">
            <img src={home1} alt="concept"></img>
          </div>
        </div>
        {/* <div className="callUs">
          <div className="phoneNum">
            <p className="h-icon">
              <BsTelephone />
            </p>
            <a href="tel: +994 (070) 883-37-38">
              <p>
                +994 (070) 883-37-38
                <br />
                <span>Call Us Anytime</span>
              </p>
            </a>
            <br />
          </div>

          <Link to={`/contact`}>
            <button>
              Get Free Estimate
              <BsArrowRight style={{ marginLeft: "2%", color: "#CDA274" }} />
            </button>
          </Link>
        </div> */}
        <div className="people-thoughts">
          <h1>What People Think About Us</h1>
          <div className="people">
            {thoughts.people.map((req, ind) => {
              return (
                <div className="person" key={ind}>
                  <div className="person-title">
                    <div>
                      <img src={customer1} alt="customer"></img>
                    </div>
                    <p>
                      {req.fullname}
                      <br />
                      <span>{req.country}</span>
                    </p>
                  </div>
                  <p className="thought">{req.thoughts}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-brands">
          <ul>
            <ol>
              <img src={brand1} alt="brand"></img>
            </ol>
            <ol>
              <img src={brand2} alt="brand"></img>
            </ol>
            <ol>
              <img src={brand3} alt="brand"></img>
            </ol>
            <ol>
              <img src={brand4} alt="brand"></img>
            </ol>
            <ol>
              <img src={brand5} alt="brand"></img>
            </ol>
          </ul>
        </div>
        <div className="homeProjects">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12">
              <h1>Follow Our Projects</h1>
          <p>
            It is a long established fact that a reader will be distracted by
            the of readable content of a page lookings at its layouts.
          </p>
              </div>
              <Homeproject/>
   
      
            </div>
          </div>
        
        </div>
      </div>
      <div className="home-experience">
        <div className="h-years">
          <CountUp className="h-year num" duration={4} end={12} />
          <p>Years Of Experience</p>
        </div>
        <div className="h-s-project">
          <CountUp duration={4} className="h-sp num" end={85} />
          <p>Success Project</p>
        </div>
        <div className="h-a-project">
          <CountUp duration={4} className="h-ap num" end={15} />
          <p>Active Project</p>
        </div>
        <div className="h-customers">
          <CountUp duration={4} className="h-cust num" end={95} />
          <p>Happy Customers</p>
        </div>
      </div>
      <div className="articleNews">
        <ArticlesBlog />
      </div>
      <div className="h-interno">
        <h1>Wanna join the interno?</h1>
        <p>It is a long established fact will be distracted.</p>
        <Link to={`/contact`}>
          <button>
            Contact With Us
            <AiOutlineArrowRight
              style={{ marginLeft: "5px" }}
              color="#292F36"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
