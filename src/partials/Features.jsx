import React, { useEffect } from 'react';

import Illustration from '../images/features-illustration.svg';
import FeaturesIcon01 from '../images/features-icon-01.svg';
import FeaturesIcon02 from '../images/features-icon-02.svg';
import FeaturesIcon03 from '../images/features-icon-03.svg';
import FeaturesIcon04 from '../images/features-icon-04.svg';
import logo from '../images/Favicon.ico'
import servicea from '../images/servicea.png'
import serviceb from '../images/serviceb.png'
import servicec from '../images/servicec.png'



// Import Swiper
import Swiper, { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import Service from './Service';
Swiper.use([Autoplay, Navigation]);

function Features() {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const carousel = new Swiper('.carousel', {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      autoplay: {
        delay: 7000,
      },
      navigation: {
        nextEl: '.carousel-next',
        prevEl: '.carousel-prev',
      },
    });
  }, []);

  return (
    <section className="relative">
      {/* Bg illustration */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none -mt-20 -z-10" aria-hidden="true">
        <img src={Illustration} className="max-w-none" width="1440" height="440" alt="Illustration" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-hkgrotesk mb-4">Understand our services</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-slate-500">Learn more about the AI tools we offer</p>
            </div>
          </div>
          {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
          {/* * Custom styles in src/css/additional-styles/theme.scss */}
          <div className="carousel swiper-container">
            <div className="swiper-wrapper">
              {/* Carousel items */}
              {/* <div className="swiper-slide w-40 space-y-2  shadow-lg h-auto flex flex-col bg-slate-900 p-6 rounded-md">
                <img className="mb-3 w-full h-auto" src={servicea} alt="Icon 01" />
                <div className="grow space-y-2">
                  <div className="font-hkgrotesk font-bold text-xl">Text to questions</div>
                  <div className="text-slate-500 mb-3">Take any text, including essays, stories, passages, or even a students' response to an extended constructed response question and automatically generate questions and answers.</div>
                </div>
                <div className="text-right">
                  <a className="font-medium text-orange-500 inline-flex items-center transition duration-150 ease-in-out group" href="#0">
                    Learn More{' '}
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                  </a>
                </div>
              </div> */}
              <Service img={servicea} text="Text to questions" description="Take any text, including essays, stories, passages, or even a students' response to an extended constructed response question and automatically generate questions and answers." />
              <Service img={serviceb} text="Summarize text to key points" description="Summarize any text with a click of a button. Bevinzey's summarizer can condense articles, slides or chapters down to the key points instantly." />
              <Service img={servicec} text="Study guide" description="In addition to all the other functionalities, you can create study guides the help you study smarter and faster" />

            </div>
          </div>
          {/* Arrows */}
          <div className="flex text-white mt-12 space-x-4 justify-end">
            <button className="carousel-prev relative z-20 w-14 h-14 rounded-full flex items-center justify-center group border border-slate-700 bg-slate-800 hover:bg-slate-700 transition duration-150 ease-in-out">
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4 fill-slate-400 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className="carousel-next relative z-20 w-14 h-14 rounded-full flex items-center justify-center group border border-slate-700 bg-slate-800 hover:bg-slate-700 transition duration-150 ease-in-out">
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4 fill-slate-400 transition duration-150 ease-in-out" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
