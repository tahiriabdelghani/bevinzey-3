import React, { useEffect } from "react";

import Client01 from "../images/client-01.svg";
import Client02 from "../images/client-02.svg";
import Client03 from "../images/client-03.svg";
import Client04 from "../images/client-04.svg";
// import Client05 from '../images/client-05.svg';
import Client06 from "../images/client-06.svg";
import Client07 from "../images/client-07.svg";
import Client08 from "../images/client-08.svg";
import Client09 from "../images/client-09.svg";
import Client10 from "../images/client-10.svg";

// Import Swiper
import Swiper, { Autoplay } from "swiper";
import "swiper/css";
Swiper.use([Autoplay]);

function Clients() {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const carousel = new Swiper(".clients-carousel", {
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      speed: 5000,
      noSwiping: true,
      noSwipingClass: "swiper-slide",
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
      },
    });
  }, []);

  return (
    <section className="  mx-28 ">
      <div className="py-12 md:py-20">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h2 className="h4 font-cabinet-grotesk text-white">
            Trusted by students and educators worldwide
          </h2>
        </div>

        {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
        {/* * Custom styles in src/css/additional-styles/theme.scss */}
        <div className="clients-carousel swiper-container relative before:absolute">
          <div className="swiper-wrapper mx-16 !ease-linear select-none">
            {/* Carousel items */}

            <div className="swiper-slide !h-32 !w-32  rounded-2xl flex items-center justify-center group">
              <img src="/images/clients/csu logo.png" height={36}/>
            </div>
            <div className="swiper-slide !h-32 !w-32  rounded-2xl flex items-center justify-center group">
              <img src="/images/clients/uthsc-primary-stacked-logo-4c.png" height={36}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
