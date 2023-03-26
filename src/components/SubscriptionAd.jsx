import React from "react";
import { Link } from "react-router-dom";

function SubscriptionAd() {
  return (
    <div className="w-[80%] mt-12 mb-6  mx-auto bg-slate-800 p-8 text-center rounded-lg">
      <h1 className="font-bold text-3xl">Join Bevinzey</h1>
      <h2 className="font-bold text-2xl mt-4">
        And get access to all of our useful tools
      </h2>
      <p className="text-gray-300 mt-6">
        Get the Bevinzey plan that fits your needs at a special introductory
        price.
      </p>
      <Link
        to="/pricing"
        className="btn-sm mt-8 text-white bg-orange-600 hover:bg-orange-700 w-[50%]"
      >
        Get started
      </Link>
    </div>
  );
}

export default SubscriptionAd;
