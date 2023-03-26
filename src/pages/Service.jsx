import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import ServiceHero from "../partials/ServiceHero";
import Process from "../partials/Process";
import FeaturesHome from "../partials/FeaturesHome";
import Tabs from "../partials/Tabs";
import Target from "../partials/Target";
import News from "../partials/News";
import Footer from "../partials/Footer";
import Clients from "../partials/Clients";
import Stats from "../partials/Stats";
import Feedbacks from "../partials/Feedbacks";
import Services from "../partials/Services";
import Testimonials from "../partials/Testimonials";
import Features from "../partials/Features";
import Timeline from "../partials/Timeline";

function Service() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState(null);
  const countMax = 3;

  useEffect(() => {
    var count = 0;
    var split = text.split(" ");
    for (var i = 0; i < split.length; i++) {
      if (split[i] != "") {
        count++;
      }
    }
    setWordCount(count);
    count > countMax
      ? setError("Maximum number of words is exceded")
      : setError(null);
  }, [text]);

  const generate = () => {};

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <ServiceHero />
        <div className="flex justify-evenly items-center mb-24 relative flex-col md:flex-row">
          <div className="w-[35%]">
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              placeholder="Please paste your text here."
              className="h-[250px] resize-none w-full rounded-lg text-black"
            ></textarea>
            <div className={`${wordCount > countMax && "text-[red]"}`}>
              {wordCount}/3
            </div>
          </div>
          <div className="w-[15%] flex flex-col items-center mb-4">
            {error && (
              <div className="bg-[red] text-white absolute text-sm p-3 -top-16 h-fit lg:bottom-16 lg:top-auto opacity-50 rounded-lg">
                {error}
              </div>
            )}
            <button
              className="btn-sm
                  bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600
                  text-white px-5 py-2.5 border-2  rounded-full hover:bg-orange-700 ml-3"
            >
              Generate
            </button>
          </div>
          <div className="w-[35%]">
            <textarea
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value);
              }}
              placeholder="Click generate to get your summary"
              className="h-[250px] resize-none w-full rounded-lg text-black"
            ></textarea>
          </div>
        </div>
      </main>
      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Service;
