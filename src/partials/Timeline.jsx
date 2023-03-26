import React from 'react';

function Timeline() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Revolutionizing Education with AI</h2>
            <p className="text-xl text-gray-400">Empowering students to learn faster and smarter with AI technology</p>
          </div>

          {/* Items */}
          <div className="max-w-3xl mx-auto -my-4 md:-my-6" data-aos-id-timeline>

            {/* 1st item */}
            <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-anchor="[data-aos-id-timeline]">
              <div className="pl-2">
                <div className="font-architects-daughter text-xl text-orange-600 mb-2">Join us on a journey of learning and discovery</div>
                <div className="flex items-center mb-3">
                  <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2022</div>
                  <div className="absolute left-0 h-full px-px bg-gray-800 ml-20 self-start transform -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                  <div className="absolute left-0 w-2 h-2 bg-orange-600 border-4 box-content border-gray-900 rounded-full ml-20 transform -translate-x-1/2" aria-hidden="true"></div>
                  <h4 className="h4">The Evolution of Bevinzey - From Concept to Reality</h4>
                </div>
                <p className="text-lg text-gray-400">Idea conceptualized - The birth of Bevinzey
                  Research and development - Laying the foundation for a revolutionary platform
                  Alpha version released - Testing the waters with a limited user base
                  Incorporation of AI technology - Pioneering the use of artificial intelligence in education
                </p>
              </div>
            </div>



            {/* 3rd item */}
            <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-timeline]">
              <div className="pl-2">
                <div className="font-architects-daughter text-xl text-orange-600 mb-2">A New Era in Learning - Bevinzey Goes Live</div>
                <div className="flex items-center mb-3">
                  <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2022</div>
                  <div className="absolute left-0 h-full px-px bg-gray-800 ml-20 self-start transform -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                  <div className="absolute left-0 w-2 h-2 bg-orange-600 border-4 box-content border-gray-900 rounded-full ml-20 transform -translate-x-1/2" aria-hidden="true"></div>
                  <h4 className="h4">Experience the power of AI in education</h4>
                </div>
                <p className="text-lg text-gray-400">Beta version released - Collecting user feedback to improve the platform
                  Official launch - Bevinzey is now available to the public
                  Strategic partnerships established - Collaborating with educational institutions to enhance learning outcomes
                  Over 1,000 registered users - Rapidly expanding user base thanks to positive feedback and word of mouth
                  Advanced question generation - AI-powered algorithms generating dynamic and relevant questions to support learning
                </p>
              </div>
            </div>

            {/* 4th item */}
            <div className="relative py-4 md:py-6 pl-24" data-aos="fade-up" data-aos-delay="600" data-aos-anchor="[data-aos-id-timeline]">
              <div className="pl-2">
                <div className="font-architects-daughter text-xl text-orange-600 mb-2">Join us as we revolutionize education with AI</div>
                <div className="flex items-center mb-3">
                  <div className="absolute left-0 inline-flex text-sm font-semibold py-1 px-3 text-green-600 bg-green-200 rounded-full">2023</div>
                  <div className="absolute left-0 w-2 h-2 bg-orange-600 border-4 box-content border-gray-900 rounded-full ml-20 transform -translate-x-1/2" aria-hidden="true"></div>
                  <h4 className="h4">The Future of Learning - Bevinzey Leads the Way</h4>
                </div>
                <p className="text-lg text-gray-400">Looking beyond 2023, Bevinzey's vision is to become the go-to platform for personalized and AI-enhanced learning. With continued investment in research and development, strategic partnerships, and a rapidly growing user base, Bevinzey is poised to disrupt the traditional education landscape and lead the charge in the future of learning. </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Timeline;