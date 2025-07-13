import PageWrapper from "../layouts/PageWrapper";
import cssStyles from "../layouts/style.module.css";
import { useEffect, useState } from "react";
import { Config } from "../config.js";
import Link from "next/link";
import Head from "next/head";

/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";

function ClassifiedsPage() {
  const [categories, setCategories] = useState([]);
  const [featuredAds, setFeaturedAds] = useState([]);
  const [isTaxonomyPage, setIsTaxonomyPage] = useState(false);

  useEffect(() => {
    fetch(`${Config.apiUrl}/wp-json/wp/v2/classification`)
      .then(res => res.json())
      .then(data => setCategories(data));

    fetch(`${Config.apiUrl}/wp-json/wp/v2/featured`)
      .then(res => res.json())
      .then(data => setFeaturedAds(data));
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

          .left-sidebar {
            width: 240px;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            padding: 16px 16px;
            height: fit-content;
          }
          .left-sidebar li {
            color: black;  /* bullet point color */
          }
          .left-sidebar ul {
            padding-left: 24px;
          }
          .right-sidebar {
            width: 260px;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            padding: 16px 16px;
            height: fit-content;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .category-link {
            color: #0070f3;
            text-decoration: none;
            margin-bottom: 4px;
            font-size: 18px;
          }
          .category-link:hover {
            color: #0056b3;
            text-decoration: underline;
            marginTop: 3px;
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
        `}
      >
        <div className="left-sidebar">
          <h2>Categories</h2>
          {categories.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {categories.map(cat => (
                <li key={cat.id} className="category-link">
                  <Link
                    href={`${Config.apiUrl}/classification/${cat.slug}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="main-content small-9 columns" id="classified-ads">
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
            with a space before and after is counted as one word. We reserve the
            right to edit ads.
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
        </div>

        <div className={cssStyles.card}>
            <broadstreet-zone zone-id="69405"></broadstreet-zone>
        </div>
      </div>
    </>
  );
}

export default PageWrapper(ClassifiedsPage);
