import PageWrapper from "../layouts/PageWrapper";
import { useEffect, useState } from "react";
import { Config } from "../config.js";
import Link from "next/link";
import Media from "react-media";
import Head from "next/head";

/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";

function ClassifiedsPage() {
  const [categories, setCategories] = useState([]);
  const [featuredAds, setFeaturedAds] = useState([]);
  const [adsByCategory, setAdsByCategory] = useState({});

  useEffect(() => {
    // Fetch all categories first
    fetch(`${Config.apiUrl}/wp-json/wp/v2/classification`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);

        // Then, fetch ads by category using the returned category IDs
        const fetchAdsForCategories = async () => {
          const adsMap = {};

          for (const cat of data) {
            try {
              const res = await fetch(
                `${Config.apiUrl}/wp-json/wp/v2/classifieds?classification=${cat.id}`
              );
              const ads = await res.json();
              adsMap[cat.id] = ads;
            } catch (err) {
              console.error(
                `Error fetching ads for category ${cat.name}:`,
                err
              );
            }
          }

          setAdsByCategory(adsMap);
        };

        fetchAdsForCategories();
      });

    // Fetch featured ads
    fetch(`${Config.apiUrl}/wp-json/wp/v2/classifieds?per_page=100`)
      .then(res => res.json())
      .then(data => {
        const featuredAds = data.filter(
          ad => Array.isArray(ad.Featured) && ad.Featured.length > 0
        );
        setFeaturedAds(featuredAds);
      })
      .catch(error => console.error("Error fetching featured ads:", error));
  }, []);

  return (
    <>
      <Head>
        <title>Classifieds - Daily Bruin</title>
      </Head>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          margin: 0;
          background-color: #f0f0f0;
          font-family: Arial, sans-serif;
          margin-left: 6px;
          margin-right: 6px;
          margin-top: 6px;

          .category-link {
            color: #0070f3;
            text-decoration: none;
            margin-bottom: 4px;
            font-size: 18px;
          }
          .category-link:hover {
            color: #0056b3;
            text-decoration: underline;
            margintop: 3px;
            cursor: pointer;
          }
          .main-content {
            background: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            padding: 16px 16px;
            height: fit-content;
            margin: 0px 16px;
            flex: 1;
          }
          .big-green-button {
            background-color: #28a745;
            color: white;
            font-size: 24px;
            font-weight: bold;
            padding: 20px 40px;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .big-green-button:hover {
            background-color: #218838;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }
          .big-green-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .hr-thick {
            height: 5px;
            background-color: black;
            border: none;
          }
        `}
      >
        <div
          className="main-content"
          id="classified-ads"
          style={{ width: "100%" }}
        >
          <div id="left-column">
            <h1>Daily Bruin Classified Ads</h1>
            <hr />
            <p>
              Daily Bruin classifieds are the best way to find qualified
              applicants for your job openings or rental vacancies. Your
              classified ad appears every day in the Daily Bruin, Daily Bruin
              online, and certain UCLA related Facebook groups when applicable.
            </p>
            <p>
              The deadline for placing an ad is 12 noon, one business day before
              publication. Payment must be received before deadline. In order to
              receive the flat rate, the ad must be 20 words or fewer. Anything
              with a space before and after is counted as one word. We reserve
              the right to edit ads.
            </p>
            <p>
              The best way to reach us is at the email{" "}
              <a href="mailto:classifieds@media.ucla.edu">
                classifieds@media.ucla.edu
              </a>
            </p>
            <p>
              You can also order over the phone by calling{" "}
              <a href="tel:3108252221">310-825-2221</a>.
            </p>
            <br />
            <div className="side-head">
              <a
                href="https://ucla.eclipseservices.com/online"
                className="text-center"
                target="_blank"
              >
                <button className="big-green-button">
                  Place a Classified Ad
                </button>
              </a>
            </div>

            <br />
            <hr className="hr-thick" />

            <h1>Featured Ads</h1>
            {featuredAds.length !== 0 ? (
              featuredAds.map(ad => (
                <div
                  dangerouslySetInnerHTML={{ __html: ad.content.rendered }}
                />
              ))
            ) : (
              <p>No featured ads.</p>
            )}

            <br />

            {categories.map(cat => (
              <div key={cat.id}>
                <hr className="hr-thick" />
                <h1>
                  Ads By Classification -{" "}
                  <span style={{ fontStyle: "italic" }}>{cat.name}</span>
                </h1>

                {adsByCategory[cat.id] && adsByCategory[cat.id].length > 0 ? (
                  adsByCategory[cat.id].map((ad, index) => (
                    <div key={ad.id}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: ad.content.rendered
                        }}
                      ></div>
                      {index !== adsByCategory[cat.id].length - 1 && <hr />}
                    </div>
                  ))
                ) : (
                  <p>No ads in this classification.</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div id="right-column" style={{ width: "25%" }}>
          <Media
            queries={{
              phone: "(max-width: 600px)",
              tablet: "(min-width: 601px) and (max-width: 900px)",
              desktop: "(min-width: 901px)"
            }}
            defaultMatches={{ desktop: true }}
          >
            {matches => (
              <div>
                {matches.tablet || matches.desktop && (
                  <div className={css["card"]}>
                    <broadstreet-zone zone-id="69405"></broadstreet-zone>
                  </div>
                )}
              </div>
            )}
          </Media>
        </div>
      </div>
    </>
  );
}

export default PageWrapper(ClassifiedsPage);
