import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import PricingTables from '../partials/PricingTables';
import Faqs from '../partials/Faqs';
import Testimonials from '../partials/Testimonials';
import Footer from '../partials/Footer1';
import { useSelector } from 'react-redux';

function Pricing() {
  const { user } = useSelector((state) => state.auth)
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
        <PricingTables />
        <Faqs />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Pricing;