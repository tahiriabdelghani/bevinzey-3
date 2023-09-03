import React from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import Footer from "../partials/Footer1";

function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-800">
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
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-5xl mx-auto">
                <div className="text-lg text-gray-400">
                  <h1 className="h1 mb-4 text-center" data-aos="fade-up">
                    Privacy Policy GDPR
                  </h1>
                  <div className="mt-12">
                    <h3 className="h3 mb-4 text-gray-200">1. Introduction</h3>
                    <p className="mb-8">
                      We are committed to protecting your privacy.
                    </p>
                    <p className="mb-8">
                      This privacy notice provides you with details of how we
                      collect and process your personal data through your use of
                      our site{" "}
                      <Link
                        to="https://bevinzey.com"
                        className="text-orange-400"
                      >
                        https://bevinzey.com
                      </Link>
                      .
                    </p>
                    <p className="mb-8">
                      Bevinzey is the data controller, and we are responsible
                      for your personal data (referred to as “we,” “us” or “our”
                      in this privacy notice).
                    </p>
                    <p className="mb-8">
                      This notice was updated on 15 June 2023 to reflect GDPR
                      compliance standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="h3 mb-4 text-gray-200">
                      2. Contact Details
                    </h3>
                    <p className="mb-8">Full name of legal entity: Bevinzey.</p>
                    <p className="mb-8">
                      Email address:{" "}
                      <a
                        href="mailto:info@bevinzey.com"
                        className="text-orange-400"
                      >
                        info@bevinzey.com
                      </a>
                      .
                    </p>
                    <p className="mb-8">
                      It is very important that the information we hold about
                      you is accurate and up to date. Please let us know if at
                      any time your personal information changes by emailing us
                      at{" "}
                      <a
                        href="mailto:info@bevinzey.com"
                        className="text-orange-400"
                      >
                        info@bevinzey.com
                      </a>
                      .
                    </p>
                  </div>
                  <div>
                    <h3 className="h3 mb-4 text-gray-200">
                      3. How We Collect Your Personal Data
                    </h3>
                    <p className="mb-8">
                      We may collect data about you by you providing the data
                      directly to us (for example by filling in forms on our
                      site or by sending us emails).
                    </p>
                    <p className="mb-8">
                      We may automatically collect certain data from you as you
                      use our website by using cookies and similar technologies.
                    </p>
                    <p className="mb-8">
                      You can set your browser to refuse all or some browser
                      cookies, or to alert you when websites set or access
                      cookies.
                    </p>
                    <p className="mb-8">
                      If you disable or refuse cookies, please note that some
                      parts of this website may become inaccessible or not
                      function properly.
                    </p>
                  </div>
                  <div>
                    <h3 className="h3 mb-4 text-gray-200">
                      4. What Personal Data We Collect And Why We Collect It
                    </h3>
                    <p className="mb-8">
                      Personal data means any information capable of identifying
                      an individual. It does not include anonymized data.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">
                      We may process the following categories of personal data
                      about you:
                    </h3>
                    <p className="mb-8">
                      Communication Data that includes any communication that
                      you send to us whether that be through the contact form on
                      our website, through email, text, social media messaging,
                      social media posting or any other communication that you
                      send us. We process this data for the purposes of
                      communicating with you, for record keeping and for the
                      establishment, pursuance or defense of legal claims. Our
                      lawful ground for this processing is our legitimate
                      interests which in this case are to reply to
                      communications sent to us, to keep records and to
                      establish, pursue or defend legal claims.
                    </p>
                    <p className="mb-8">
                      Customer Data that includes data relating to any purchases
                      of goods and/or services such as your name, title, billing
                      address, delivery address email address, phone number,
                      contact details, purchase details and your PayPal email.
                      We process this data to supply the goods and/or services
                      you have purchased and to keep records of such
                      transactions. Our lawful ground for this processing is the
                      performance of a contract between you and us and/or taking
                      steps at your request to enter into such a contract.
                    </p>
                    <p className="mb-8">
                      User Data that includes data about how you use our website
                      and any online services together with any data that you
                      post for publication on our website or through other
                      online services. We process this data to operate our
                      website and ensure relevant content is provided to you, to
                      ensure the security of our website, to maintain back- ups
                      of our website and/or databases and to enable publication
                      and administration of our website, other online services
                      and business. Our lawful ground for this processing is our
                      legitimate interests which in this case are to enable us
                      to properly administer our website and our business.
                    </p>
                    <p className="mb-8">
                      Technical Data that includes data about your use of our
                      website and online services such as your IP address, your
                      login data, details about your browser, length of visit to
                      pages on our website, page views and navigation paths,
                      details about the number of times you use our website,
                      time zone settings and other technology on the devices you
                      use to access our website. The source of this data is from
                      our analytics tracking system. We process this data to
                      analyze your use of our website and other online services,
                      to administer and protect our business and website, to
                      deliver relevant website content and advertisements to you
                      and to understand the effectiveness of our advertising.
                      Our lawful ground for this processing is our legitimate
                      interests which in this case are to enable us to properly
                      administer our website and our business and to grow our
                      business and to decide our marketing strategy.
                    </p>
                    <p className="mb-8">
                      Marketing Data that includes data about your preferences
                      in receiving marketing from us and our third parties and
                      your communication preferences. We process this data to
                      enable you to partake in our promotions such as
                      competitions, prize draws and free giveaways, to deliver
                      relevant website content and advertisements to you and
                      measure or understand the effectiveness of this
                      advertising. Our lawful ground for this processing is our
                      legitimate interests which in this case are to study how
                      customers use our products/services, to develop them, to
                      grow our business and to decide our marketing strategy.
                    </p>
                    <p className="mb-8">
                      Comments via WordPress – When visitors leave comments on
                      the site we collect the data shown in the comments form,
                      and the visitor’s IP address and browser user agent string
                      to help spam detection. An anonymized string created from
                      your email address (also called a hash) may be provided to
                      the Gravatar service to see if you are using it.
                    </p>
                    <p className="mb-8">
                      The Gravatar service privacy policy is available here:
                      https://automattic.com/privacy/. After approval of your
                      comment, your profile picture is visible to the public in
                      the context of your comment.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">Contact forms</h3>
                    <p className="mb-8">
                      Our contact form does not store data, but we do keep
                      contact emails on our email server for customer service
                      purposes, but we never use these for marketing purposes.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">Cookies</h3>
                    <p className="mb-8">
                      If you leave a comment on our site you may opt-in to
                      saving your name, email address and website in cookies.
                      These are for your convenience so that you do not have to
                      fill in your details again when you leave another comment.
                      These cookies will last for one year.
                    </p>
                    <p className="mb-8">
                      If you have an account and you log in to this site, we
                      will set a temporary cookie to determine if your browser
                      accepts cookies. This cookie contains no personal data and
                      is discarded when you close your browser.
                    </p>
                    <p className="mb-8">
                      When you log in, we will also set up several cookies to
                      save your login information and your screen display
                      choices. Login cookies last for two days, and screen
                      options cookies last for a year. If you select “Remember
                      Me”, your login will persist for two weeks. If you log out
                      of your account, the login cookies will be removed.
                    </p>
                    <p className="mb-8">
                      If you edit or publish an article, an additional cookie
                      will be saved in your browser. This cookie includes no
                      personal data and simply indicates the post ID of the
                      article you just edited. It expires after 1 day.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">
                      Embedded content from other websites
                    </h3>
                    <p className="mb-8">
                      Articles on this site may include embedded content (e.g.
                      videos, images, articles, etc.). Embedded content from
                      other websites behaves in the exact same way as if the
                      visitor has visited the other website.
                    </p>
                    <p className="mb-8">
                      These websites may collect data about you, use cookies,
                      embed additional third-party tracking, and monitor your
                      interaction with that embedded content, including tracing
                      your interaction with the embedded content if you have an
                      account and are logged in to that website.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">
                      eCommerce Data Collection via WooCommerce
                    </h3>
                    <p className="mb-8">
                      We also collect information about you during the checkout
                      process at our store.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">
                      What we collect and store:
                    </h3>
                    <p className="mb-8">
                      While you visit our site, we’ll track:
                    </p>
                    <ul className="list-disc list-inside mb-8 pl-8">
                      <li>
                        Products you’ve viewed: we’ll use this to, for example,
                        show you products you’ve recently viewed.
                      </li>
                      <li>
                        Location, IP address and browser type: we’ll use this
                        for purposes like estimating taxes and shipping.
                      </li>
                    </ul>
                    <p className="mb-8">
                      We’ll also use cookies to keep track of cart contents
                      while you’re browsing our site.
                    </p>
                    <p className="mb-8">
                      When you purchase from us, we’ll ask you to provide
                      information including your name, email address, payment
                      details and account information like username and
                      password. We’ll use this information for purposes, such
                      as, to:
                    </p>
                    <ul className="list-disc list-inside mb-8 pl-8">
                      <li>Send you information about your account and order</li>
                      <li>
                        Respond to your requests, including refunds and
                        complaints
                      </li>
                      <li>Process payments and prevent fraud</li>
                      <li>Set up your account for our store</li>
                      <li>
                        Comply with any legal obligations we have, such as
                        calculating taxes
                      </li>
                      <li>Improve our store offerings</li>
                      <li>
                        Send you marketing messages, if you choose to receive
                        them
                      </li>
                    </ul>
                    <p className="mb-8">
                      If you create an account, we will store your name and
                      email, which will be used to populate the checkout for
                      future orders.
                    </p>
                    <p className="mb-8">
                      We generally store information about you for as long as we
                      need the information for the purposes for which we collect
                      and use it, and we are not legally required to continue to
                      keep it. For example, we will store order information for
                      6 years for tax and accounting purposes. This includes
                      your name, and email address and order history.
                    </p>
                    <p className="mb-8">
                      We will also store comments or reviews, if you choose to
                      leave them.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">
                      Who on our team has access:
                    </h3>
                    <p className="mb-8">Our Administrator can access:</p>
                    <ul className="list-disc list-inside mb-8 pl-8">
                      <li>
                        Order information like what was purchased, when it was
                        purchased and where it should be sent.
                      </li>
                      <li>
                        Customer information like your name and email address.
                      </li>
                    </ul>
                    <p className="mb-8">
                      Our team members have access to this information to help
                      fulfill orders, process refunds and support you.
                    </p>
                    <h3 className="h4 mb-4 text-gray-200">Payments:</h3>
                    <p className="mb-8">
                      <span className="font-[700] text-gray-200">Stripe: </span>
                      We also accept payments via Stripe. When processing
                      payments, some of your data will be passed to PayPal,
                      including information required to process or support the
                      payment, such as the purchase total and billing
                      information. Please see the Stripe Privacy Policy for more
                      details.
                    </p>
                    <p className="mb-8">
                      Credit/debit card information is never stored on our site
                      and is only shared with our payment processors in order to
                      complete the transaction in which you are engaging.
                    </p>
                    <p className="mb-8">
                      <span className="font-[700] text-gray-200">
                        If you fail to provide consent:{" "}
                      </span>
                      Your consent to allow us to process and store your data is
                      optional, but failure to provide such consent for the data
                      collected as described above prevents us from delivering
                      our products, content, and messages to you as mentioned
                      above.
                    </p>
                    <p className="mb-8">
                      <span className="font-[700] text-gray-200">
                        Sensitive Data:{" "}
                      </span>
                      We do not collect any Sensitive Data about you. Sensitive
                      data refers to data that includes details about your race
                      or ethnicity, religious or philosophical beliefs, sex
                      life, sexual orientation, political opinions, trade union
                      membership, information about your health and genetic and
                      biometric data. We do not collect any information about
                      criminal convictions and offences.
                    </p>
                    <p className="mb-8">
                      Where we are required to collect personal data by law, or
                      under the terms of the contract between us and you do not
                      provide us with that data when requested, we may not be
                      able to perform the contract (for example, to deliver
                      goods or services to you). If you don’t provide us with
                      the requested data, we may have to cancel a product or
                      service you have ordered but if we do, we will notify you
                      at the time.
                    </p>
                    <p className="mb-8">
                      We will only use your personal data for a purpose it was
                      collected for or a reasonably compatible purpose if
                      necessary. For more information on this please email us at{" "}
                      <a
                        href="mailto:info@bevinzey.com"
                        className="text-orange-400"
                      >
                        info@bevinzey.com
                      </a>
                      . In case we need to use your details for an unrelated new
                      purpose we will let you know and explain the legal grounds
                      for processing.
                    </p>
                    <p className="mb-8">
                      We may process your personal data without your knowledge
                      or consent where this is required or permitted by law.
                    </p>
                    <p className="mb-8">
                      We do not carry out automated decision making or any type
                      of automated profiling.
                    </p>
                  </div>

                  <div>
                    <h3 className="h4 mb-4 text-gray-200">
                      5. How Long We Retain Your Data
                    </h3>
                    <p className="mb-8">
                      If you leave a comment, the comment and its metadata are
                      retained indefinitely. This is so we can recognize and
                      approve any follow-up comments automatically instead of
                      holding them in a moderation queue.
                    </p>
                    <p className="mb-8">
                      For users that register on our website (if any), we also
                      store the personal information they provide in their user
                      profile. All users can see, edit, or delete their personal
                      information at any time (except they cannot change their
                      username). Website administrators can also see and edit
                      that information.
                    </p>
                  </div>
                  <div>
                    <h3 className="h4 mb-4 text-gray-200">
                      6. Your Rights Over Your Data
                    </h3>
                    <p className="mb-8">
                      If you have an account on this site, or have left
                      comments, you can request to receive an exported file of
                      the personal data we hold about you, including any data
                      you have provided to us.
                    </p>
                    <p className="mb-8">
                      You can also request that we erase any personal data we
                      hold about you. This does not include any data we are
                      obliged to keep for administrative, legal, or security
                      purposes.
                    </p>
                  </div>
                  <div>
                    <h3 className="h4 mb-4 text-gray-200">
                      7. GDPR – Right to Erasure: How to ask us to delete your
                      data
                    </h3>
                    <p className="mb-8">
                      We may collect data about you by you providing the data
                      directly to us (for example by filling in forms on our
                      site or by sending us emails).
                    </p>
                    <p className="mb-8">
                      We may automatically collect certain data from you as you
                      use our website by using cookies and similar technologies.
                    </p>
                    <p className="mb-8">
                      You can set your browser to refuse all or some browser
                      cookies, or to alert you when websites set or access
                      cookies.
                    </p>
                    <p className="mb-8">
                      If you disable or refuse cookies, please note that some
                      parts of this website may become inaccessible or not
                      function properly.
                    </p>
                  </div>
                  <div>
                    <h3 className="h4 mb-4 text-gray-200">
                      8. Marketing Communications
                    </h3>
                    <p className="mb-8">
                      Our lawful ground of processing your personal data to send
                      you marketing communications is either your consent or our
                      legitimate interests (namely to grow our business).
                    </p>
                    <p className="mb-8">
                      Before we share your personal data with any third party
                      for their own marketing purposes we will get your express
                      consent.
                    </p>
                    <p className="mb-8">
                      You can ask us or third parties to stop sending you
                      marketing messages at any time by following the opt-out
                      links on any marketing message sent to you or OR by
                      emailing us at{" "}
                      <a
                        href="mailto:info@bevinzey.com"
                        className="text-orange-400"
                      >
                        info@bevinzey.com
                      </a>{" "}
                      at any time.
                    </p>
                    <p className="mb-8">
                      If you opt out of receiving marketing communications this
                      opt-out does not apply to personal data provided as a
                      result of other transactions, such as purchases, and store
                      account registration.
                    </p>
                  </div>
                  <div>
                    <h3 className="h4 mb-4 text-gray-200">
                      9. Disclosures Of Personal Data To Third Parties
                    </h3>
                    <p className="mb-8">
                      Some information, such as your IP and your email
                      addresses, may be shared with certain third parties who
                      help us run our website, marketing and email programs.
                      They will only use this information to serve our needs and
                      are prohibited from using it in any other ways.
                    </p>
                  </div>
                  <div>
                    <h3 className="h4 mb-4 text-gray-200">
                      3rd Party Companies We Use Include:
                    </h3>
                    <p className="mb-8">
                      Google (Ad serving and website tracking).
                    </p>
                    <p className="mb-8">
                      LinkedIn(LinkedIn marketing is provided by LinkedIn).
                    </p>
                    <p className="mb-8">
                      Meta (Facebook and Instagram remarketing is provided by
                      Meta).
                    </p>
                    <p className="mb-8">
                      Twitter (Twitter remarketing is provided by Meta).
                    </p>
                    <p className="mb-8">
                      Service providers who provide IT and system administration
                      services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
