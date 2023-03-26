import React, { useState } from 'react';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HeroHome from '../partials/HeroHome';
import Process from '../partials/Process';
import FeaturesHome from '../partials/FeaturesHome';
import Tabs from '../partials/Tabs';
import Target from '../partials/Target';
import News from '../partials/News';
import Footer from '../partials/Footer1';
import Clients from '../partials/Clients';
import Stats from '../partials/Stats';
import Feedbacks from '../partials/Feedbacks';
import Services from '../partials/Services';
import Testimonials from '../partials/Testimonials'
import Features from '../partials/Features';
import Timeline from '../partials/Timeline';
import FeaturesZigzag from '../partials/FeaturesZigzag';
import Featured from '../partials/Featured';


function Home() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-800">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>



        {/*  Page sections */}
        <HeroHome />
        <Features />
        <FeaturesZigzag />

        <Clients />
        <Featured />
        <Stats />
        {/* <Feedbacks /> */}
        <Testimonials />
        {/* <Timeline /> */}
        {/* <Services /> */}

        {/* <Process /> */}

        {/* <FeaturesHome /> */}
        {/* <Tabs /> */}
        {/* <Target /> */}
        {/* <News /> */}

        {/* <TabContainer /> */}
      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;