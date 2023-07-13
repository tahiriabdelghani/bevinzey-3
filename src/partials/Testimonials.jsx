import React, { useEffect } from "react";
import Illustration from "../images/features-illustration.svg";
import FeaturesIcon01 from "../images/features-icon-01.svg";
import FeaturesIcon02 from "../images/features-icon-02.svg";
import FeaturesIcon03 from "../images/features-icon-03.svg";
import TestimonialImage01 from "../images/testimonial-4.jpg";
import ent1 from "../images/ent1.png";
import ent2 from "../images/ent2.png";
import TestimonialImage02 from "../images/testimonial-5.jpg";
import TestimonialImage03 from "../images/testimonial-6.jpg";
import FeaturesIcon04 from "../images/features-icon-04.svg";
import Testimonial from "../partials/Testimonial.jsx";

// Import Swiper
import Swiper, { Autoplay, Navigation } from "swiper";
import "swiper/css";
Swiper.use([Autoplay, Navigation]);

function Testimonials() {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const carousel = new Swiper(".carousel", {
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
        delay: 6000,
      },
      navigation: {
        nextEl: ".carousel-next",
        prevEl: ".carousel-prev",
      },
    });
  }, []);

  return (
    <section className="relative">
      {/* Bg illustration */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none -mt-20 -z-10"
        aria-hidden="true"
      >
        <img
          src={Illustration}
          className="max-w-none"
          width="1440"
          height="440"
          alt="Illustration"
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-hkgrotesk mb-4">
              Achieve More with Bevinzey
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl font-hkgrotesk text-slate-300">
                Read How Our Users Are Transforming Their Education
              </p>
            </div>
          </div>
          {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
          {/* * Custom styles in src/css/additional-styles/theme.scss */}
          <div className="carousel swiper-container">
            <div className="swiper-wrapper">
              {/* Carousel items */}
              <div className="swiper-slide h-auto flex flex-col  p-2 rounded">
                <Testimonial
                  text="— As an educator, I am always looking for ways to help my students learn
                  more effectively. I was skeptical at first about using an ai-powered learning platform,
                  but I decided to give Bevinzey a try. I was amazed at how well it worked! My
                  students were able to learn more quickly and easily with Bevinzey. The questions
                  that it generated really helped to focus their learning and clarify any
                  misunderstandings. I would highly recommend Bevinzey to any educator looking for
                  an effective way to help their students learn."
                  image={TestimonialImage01}
                  name="Eleanor Hastings"
                  logo={ent1}
                  job="Educator"
                />
              </div>
              <div className="swiper-slide h-auto flex flex-col  p-2 rounded">
                <Testimonial
                  text="— Bevinzey is an amazing tool that has helped me to better understand the
                  material I am reading. The summaries it creates of text are concise and accurate,
                  and the generated study guides are extremely helpful in organizing information."
                  image={TestimonialImage02}
                  name="Malcolm Washington"
                  logo={ent2}
                  job="Student"
                />
              </div>
              <div className="swiper-slide h-auto flex flex-col  p-2 rounded">
                {" "}
                <Testimonial
                  text="— Last year, when I turned to Bevinzey, I was a D student. But I knew the
                  potential I had if I could just find the right tools to prepare for my assessments. After
                  using Bevinzey, I am now a B-average student. My teachers are really impressed
                  with the improvement in my performance. Thank you so much!"
                  image={TestimonialImage03}
                  name="Anika Patel"
                  logo={ent1}
                  job="Student"
                />
              </div>
              {/* <div className="swiper-slide h-auto flex flex-col  p-2 rounded">
                <Testimonial
                  text="— Bevinzey lets me quickly get the insights I care about so that I can focus on my productive work. I've had Bevinzey for about 24 hours now and I honestly don't know how I functioned without it before."
                  image={TestimonialImage03}
                  name="Anastasia Dan"
                  logo={ent1}
                  job="UX Designer"
                />
              </div> */}
            </div>
          </div>
          {/* Arrows */}
          <div className="flex mt-12 space-x-4 justify-end">
            <button className="carousel-prev relative z-20 w-14 h-14 rounded-full flex items-center justify-center group border  transition duration-150 ease-in-out">
              <span className="sr-only">Previous</span>
              <svg
                className="w-4 h-4 fill-slate-400 transition duration-150 ease-in-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.7 14.7l1.4-1.4L3.8 9H16V7H3.8l4.3-4.3-1.4-1.4L0 8z" />
              </svg>
            </button>
            <button className="carousel-next relative z-20 w-14 h-14 rounded-full flex items-center justify-center group border  transition duration-150 ease-in-out">
              <span className="sr-only">Next</span>
              <svg
                className="w-4 h-4 fill-slate-400 transition duration-150 ease-in-out"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
