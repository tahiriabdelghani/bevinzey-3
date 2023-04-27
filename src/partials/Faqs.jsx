import React from "react";

function Faqs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800 lg:border-0 lg:pt-0">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h2">Frequently asked questions</h2>
          </div>

          {/* Faqs */}
          <ul className="grid gap-8 md:grid-cols-2 xl:gap-x-16 lg:gap-y-12">
            <li>
              <h4 className="text-xl font-medium mb-2">
                What payment methods do you offer?
              </h4>
              <p className="text-lg text-gray-400">
                Pay easily and safely with Bevinzey. We accept major credit and
                debit cards, and use Stripe for secure payment processing with
                3D secure authentication for added privacy protection.
              </p>
            </li>
            <li>
              <h4 className="text-xl font-medium mb-2">
                Can I change my plan at any time?
              </h4>
              <p className="text-lg text-gray-400">
                Easily adjust your Bevinzey plan to suit your needs at any time.
                Any unused credits from your current plan will be applied to
                your new bill. If you upgrade in the middle of your billing
                cycle, you'll receive a pro-rated discount on the new plan's
                monthly subscription fee.
              </p>
            </li>
            <li>
              <h4 className="text-xl font-medium mb-2">
                What happens if I hit my plan's word limit?
              </h4>
              <p className="text-lg text-gray-400">
                Option 1: Increase Your Monthly Capacity with an Upgrade As your
                content needs grow, upgrade to a higher monthly limit for
                reduced cost per word. Please note: unused words will not be
                carried over to the next month. Option 2: Maximize Your Credits
                at the Beginning of Each Billing Cycle.
              </p>
            </li>
            <li>
              <h4 className="text-xl font-medium mb-2">
                Can I cancel the plan anytime?
              </h4>
              <p className="text-lg text-gray-400">
                Enjoy hassle-free cancellation at any time with Bevinzey. Even
                after cancelling, continue using our services until the end of
                your current billing cycle.
              </p>
            </li>
            <li>
              <h4 className="text-xl font-medium mb-2">
                What’s the refund policy?
              </h4>
              <p className="text-lg text-gray-400">
                Your satisfaction is our top priority at Bevinzey. If our
                AI-driven learning platform doesn't meet your expectations, you
                can claim a complete refund within the first 30 days. Contact
                our customer support at support@bevinzey.com with your account
                information and refund reason, and we'll promptly handle your
                request.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Faqs;
