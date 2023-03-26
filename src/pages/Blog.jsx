import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import BlogList from '../partials/BlogList';
import Footer from '../partials/Footer1';

function Blog() {
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
        <BlogList />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Blog;