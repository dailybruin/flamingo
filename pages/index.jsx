import React, { useState, useEffect } from "react";
import NewPageWrapper from "../layouts/NewPageWrapper";
import Head from "next/head";

import HomeLayout from "../layouts/Home";
import Cookies from "js-cookie";
import EmailPopUp from "../components/EmailSignUp";

import { createStaticProps } from "lib/createStaticProps";
import { fetchHomePageContent } from "lib/fetchHomepageContent";

function Index({ posts, multimediaPosts, classifieds, sponsored }) {
  const [showNewsletterPopUp, setShowNewsletterPopUp] = useState(false);

  /* Handle newsletter popping-up logic */
  useEffect(() => {
    if (Cookies.get("subscribed2newsletter") === undefined) {
      let visits = Cookies.get("newsletterVisits");
      if (visits === undefined) {
        Cookies.set("newsletterVisits", "0", { expires: 365 });
      } else {
        visits = parseInt(visits) + 1;
        if (visits >= 5) {
          displayNewsletterPopup();
          Cookies.set("newsletterVisits", "0", { expires: 365 });
        } else {
          Cookies.set("newsletterVisits", visits.toString(), { expires: 365 });
        }
      }
    }
    if (Cookies.get("visited") === undefined) {
      setShowNewsletterPopUp(true);
      Cookies.set("visited", "true", { expires: 365 });
    }
  }, []);

  const subscribeToNewsletter = () => {
    Cookies.set("subscribed2newsletter", "true", { expires: 365 });
  };

  const displayNewsletterPopup = () => {
    setShowNewsletterPopUp(true);
  };

  const closeNewsletterPopup = () => {
    setShowNewsletterPopUp(false);
  };

  return (
    <>
      <Head>
        <title>{`Daily Bruin - Since 1919`}</title>
        <meta
          name="description"
          content="UCLA's independent, student-run newspaper"
        />
        <link rel="canonical" href="https://dailybruin.com/" />
        <meta
          property="og:image"
          content="https://wp.dailybruin.com/images/2017/03/db-logo.png"
        />
        <meta
          property="twitter:image"
          content="https://wp.dailybruin.com/images/2017/03/db-logo.png"
        />
        <meta property="og:url" content="https://dailybruin.com" />
        <meta property="og:title" content="The Daily Bruin" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Daily Bruin" />
        <meta
          property="og:description"
          content="UCLA's independent, student-run newspaper"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="fb:pages" content="47311244274" />
        <meta name="twitter:title" content="Daily Bruin - Since 2020" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dailybruin" />
        <meta name="twitter:creator" content="@dailybruin" />
        <meta
          name="twitter:description"
          content="UCLA's independent, student-run newspaper"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      </Head>
      <HomeLayout
        posts={posts}
        media={multimediaPosts}
        classifieds={(classifieds || [])
          .map(c => {
            try {
              return {
                category: {
                  name: c._embedded?.["wp:term"]?.[1]?.[0]?.name || "Classified",
                  url: c._embedded?.["wp:term"]?.[1]?.[0]?.link || "#"
                },
                content: { name: c.content?.rendered || "", url: c.link || "#" }
              };
            } catch (error) {
              console.error("Error processing classified:", error);
              return null;
            }
          })
          .filter(Boolean)}
        sponsoredLinks={
          typeof sponsored === "string" ? sponsored.replace("null", "") : ""
        }
      />
      {showNewsletterPopUp ? (
        <EmailPopUp
          sub2Newsletter={subscribeToNewsletter}
          close={closeNewsletterPopup}
        />
      ) : null}
    </>
  );
}

// Automatically fetches sharedData and sets revalidate
export const getStaticProps = createStaticProps(fetchHomePageContent, 15);

export default NewPageWrapper(Index, { isFrontPage: true });