import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./Slider.css";
import slide1 from "../assets/banner/banner-image1.jpg";
import slide2 from "../assets/banner/banner-image2.jpg";
import slide3 from "../assets/banner/banner-image3.jpg";
// import required modules
import { Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img src={slide1} alt="slide1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="slide2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} alt="slide3" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
