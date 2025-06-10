import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import './styles/landing.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import img1 from './assets/image1.jpg';
import img2 from './assets/image2.jpg';
import img3 from './assets/image3.jpg';

const LandingPage = () => {
  const navigate = useNavigate(); // ✅ Hook

  const images = [img1, img2, img3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="landing-page">
      <div className="header">
        <div className="left">
          <div className="logo">GenSlides</div>
        </div>
        <div className="right">
          <button className="contact-button">Contact us</button>
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>

      <div className="center-wrapper">
        <div className="main-content">
          <div className="title-container">
            <h1 className="typing-title">Your Ideas Deserve Better. Than Blank Slides</h1>
          </div>
          <div className="subtitle">GenSlides brings them to life instantly.</div>
          <button className="signup-button" onClick={() => navigate('/signup')}>
            Sign up
          </button>
        </div> 

        <div className="carousel-section">
          <Slider {...settings}>
            {images.map((url, index) => (
              <div key={index}>
                <img src={url} alt={`slide-${index}`} className="carousel-image" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
