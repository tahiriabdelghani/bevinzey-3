import React from 'react';

import TeamImage01 from '../images/team-member-01.jpg';
import TeamImage02 from '../images/team-member-02.jpg';
import TeamImage03 from '../images/team-member-03.jpg';
import TeamImage04 from '../images/team-member-04.jpg';
import TeamImage05 from '../images/team-member-05.jpg';
import TeamImage06 from '../images/team-member-06.jpg';
import TeamImage07 from '../images/team-member-07.jpg';
import TeamImage08 from '../images/team-member-08.jpg';

function Team() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Meet the CEO and Founder</h2>
            <p className="text-xl text-gray-400">Dr. Michael Danquah - A Trailblazer in Education and Technology</p>
          </div>

          {/* Team members */}
          <div className="sm:flex sm:flex-wrap sm:justify-center -my-4 sm:-my-8 sm:-mx-3" data-aos-id-team>

            {/* 1st member */}
            <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3" data-aos="fade-up" data-aos-anchor="[data-aos-id-team]">
              <div className="flex flex-col items-center">
                <img className="rounded-full mb-4 " src="https://media.publit.io/file/Bevincey/Michael-Danquah_Photo.png" width="120" height="120" alt="Team member 01" />
                <h4 className="text-xl font-medium mb-1">Michael Danquah</h4>
                <div className="text-gray-500 mb-1">CEO & Founder</div>
                {/* <a className="block text-orange-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@laraamprecht</a> */}
              </div>
            </div>
            {/* Article content */}
            <div className="text-lg text-gray-400">

              <blockquote className="italic pl-4 border-l-2 border-gray-200 mb-8">Dr. Michael Danquah is a true innovator in the world of education and technology. As a drug delivery expert, chemical engineer, and Associate Professor who Chairs the Department of Pharmaceutical Sciences at Chicago State University College of Pharmacy, Dr. Danquah has dedicated his career to improving outcomes for students and educators alike </blockquote>
              <p className="mb-8">Driven by a passion for innovation and a deep understanding of the power of technology, Dr. Danquah founded not one, but two groundbreaking edtech companies. His first, RxCalculations, has quickly become the go-to resource for students and professionals seeking to master pharmaceutical calculations. And his second, Bevinzey, is revolutionizing the world of education with its AI-powered learning and question generation platform. </p>
              <p className='mb-8'>With a Ph.D. in Pharmaceutics from The University of Tennessee Health Science Center and a Masters in Chemical Engineering from the University of Kentucky, Dr. Danquah has the expertise and knowledge to lead the charge in these cutting-edge fields. And his dedication to advancing education and technology has earned him widespread recognition, with features on ABC, CBS, FOX, and NBC affiliates across the country.
              </p>
              <p className='mb-8'>As CEO and Founder of Bevinzey, Dr. Danquah is leveraging his extensive knowledge and industry contacts to make Bevinzey a success. With advanced AI algorithms and personalized learning experiences, Bevinzey is transforming the way students learn, and teachers teach. And with Dr. Danquah at the helm, there's no limit to what Bevinzey can achieve.</p>
              <figure className="mb-8">
                {/* <img className="w-full" src={NewsImageInner} width="768" height="432" alt="News inner" /> */}
                {/* <figcaption className="text-sm text-center text-gray-500 mt-3">Photo by Helena Lopes on Unsplash</figcaption> */}
              </figure>


              <p className="mb-8">But Dr. Danquah's contributions to education go beyond Bevinzey alone. He also founded Brainaly, a virtual classroom and quiz gamification software that keeps students entertained while they learn. Dr. Danquah is a true leader in the field of edtech, with a passion for innovation and a commitment to excellence. </p>
              <p className="mb-8">We at Bevinzey are honored to have Dr. Danquah as our CEO and Founder. His vision and leadership are driving our company to new heights, and we're excited to be at the forefront of the revolution in education that he's helping to create.</p>


            </div>



          </div>

        </div>
      </div>
    </section>
  );
}

export default Team;