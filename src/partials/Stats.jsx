import React from 'react';

function Stats() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Say Goodbye to Information Overload and Hello to Stress-Free Learning</h1>
            <p className="text-xl text-gray-400">Get Ahead in Your Studies and Career: Bevinzey's Intelligent Platform Lets You Focus on What Matters Most - Discover How!</p>
          </div>

          <div className="grid md:grid-cols-3 bg-orange-600 rounded-3xl divide-y md:divide-y-0 md:divide-x divide-gray-700 px-6 md:px-0 md:py-8 text-center">
            {/* 1st item */}
            <div className="py-6 md:py-0 md:px-8">
              <div className="text-4xl font-bold leading-tight tracking-tighter text-white mb-2" data-aos="fade-up">99.8%</div>
              <div className="text-lg text-white" data-aos="fade-up" data-aos-delay="200"> satisfaction rate</div>
            </div>
            {/* 2nd item */}
            <div className="py-6 md:py-0 md:px-8">
              <div className="text-4xl font-bold leading-tight tracking-tighter text-white mb-2" data-aos="fade-up">+ 1,000 </div>
              <div className="text-lg text-white" data-aos="fade-up" data-aos-delay="200">Users</div>
            </div>
            {/* 3rd item */}
            <div className="py-6 md:py-0 md:px-8">
              <div className="text-4xl font-bold leading-tight tracking-tighter text-white mb-2" data-aos="fade-up">+1M</div>
              <div className="text-lg text-white" data-aos="fade-up" data-aos-delay="200"> Questions generated and text summarized.</div>
            </div>
            {/* 4rd item */}

          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;