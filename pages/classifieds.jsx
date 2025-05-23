import PageWrapper from "../layouts/PageWrapper";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";

function ClassifiedsPage() {
  const [categories, setCategories] = useState([]);
  const [featuredAds, setFeaturedAds] = useState([]);
  const [isTaxonomyPage, setIsTaxonomyPage] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API endpoints
    fetch("/api/classification")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("/api/featured-ads")
      .then((res) => res.json())
      .then((data) => setFeaturedAds(data));
  }, []);

  return (
    <>
      <Head>
        <title>Classifieds - Daily Bruin</title>
      </Head>
      <div
        css={css`
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            font-family: Arial, sans-serif;
        }

        .big-green-button {
            background-color: #28a745;
            color: white;
            font-size: 24px;
            font-weight: bold;
            padding: 20px 40px;
            border: none;
            border-radius: 12px;
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

        <div className="small-9 columns" id="classified-ads">
          <h1>Daily Bruin Classified Ads</h1>
          <hr />
          <p>
            Daily Bruin classifieds are the best way to find qualified applicants
            for your job openings or rental vacancies. Your classified ad
            appears every day in the Daily Bruin, Daily Bruin online, and
            certain UCLA-related Facebook groups.
          </p>
          <p>
            The deadline for placing an ad is 12 noon, one business day before
            publication. Payment must be received before deadline. In order to
            receive the flat rate, the ad must be 20 words or fewer. Anything
            with a space before and after counts as a word.
          </p>
          <p>
            The best way to reach us is at the email <a href="mailto:classifieds@media.ucla.edu">classifieds@media.ucla.edu</a>
          </p>
          <p>
            You can also order over the phone by calling <a href="tel:3108252221">310-825-2221</a>.
          </p>
          <br />
          <div className="side-head">
            <a href="https://ucla.eclipseservices.com/online" className="text-center" target="_blank">
              <button class="big-green-button">Place a Classified Ad</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}


export default PageWrapper(ClassifiedsPage);