import React, { Component, useEffect, useState } from "react";
import { Config } from "../config.js";
import PageWrapper from "../layouts/PageWrapper";
import Head from "next/head";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import Script from "next/script.js";

import * as globals from "../components/globals";

const Stonewall = () => {
  const [stones, setStones] = useState([]);
  /* openStone stores the index of the open stone, null if none is open */
  const [openStone, setOpenStone] = useState(null);

  const toggleStone = i => {
    setOpenStone(openStone === i ? null : i);
  };

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_pSjFbLe53S0TbEI_7BL_X9TqdTTB2AHRib0pu1FzP20QG6J6D6jOevX7A0-uld9V62hdPEUU2E6J/pub?output=tsv"
    )
      .then(x => x.text())
      .then(x => {
        var array = x.split("\r\n");
        let result = [];
        let headers = array[0].split("\t");
        for (let i = 1; i < array.length; i++) {
          let obj = {};
          let str = array[i].split("\t");
          for (let j in headers) {
            obj[headers[j]] = str[j].trim();
          }
          result.push(obj);
        }
        setStones(result);
      });
  }, []);

  return (
    <>
      <Head>
        <Script
          src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
          strategy="beforeInteractive"
        />
      </Head>
      <div
        css={css`
          display: block;
          padding: 10px 30px;
          box-shadow: ${globals.cardShadow};
          background-color: #ffffff;
          margin: 6px;

          .accordion {
            margin: 0;
            padding: 0;
          }

          .accordion .accordion-navigation > a {
            background: none;
            color: #222222 !important;
            display: block;
            font-family: ${globals.bodyFont};
            font-size: 1.5rem;
          }

          .accordion .accordion-navigation.active > a {
            background: none;
          }
          .accordion .accordion-navigation.active > a:hover {
            text-decoration: none;
          }

          .accordion .accordion-navigation {
            margin-bottom: 1rem !important;
          }
          #title {
            text-align: center;
            font-family: ${globals.headlineFont};
          }

          #title h2 {
            font-size: 10rem;
            font-weight: 700;
            color: #222;
            display: inline-block;
            letter-spacing: 0.05em;
          }
          #title h3 {
            margin-top: 0.5rem;
            font-weight: 400;
            font-size: 1.25rem;
            color: #666;
          }

          .date {
            margin: 0;
            margin-bottom: 5px;
            padding: 0;
            color: #363333ff;
            font-weight: 100;
          }

          #stonewall-wrap ul {
            list-style-type: none;
            font-size: 1rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 1rem;
          }

          .stone-title {
            font-family: ${globals.headlineFont};
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: #111;
          }

          .stone-desc {
            font-size: 0.95rem;
            line-height: 1.5;
            color: #444;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, opacity 0.4s ease;
            opacity: 0;
          }

          #blurb {
            background: #f5f5f5;
            border-left: 4px solid #999;
            padding: 1.5rem;
            margin: 2rem 0;
            font-size: 1.05rem;
            line-height: 1.6;
            color: #333;
          }
          #blurb p {
            padding-left: 15px;
            padding: 10px;
            font-size: 1rem;
          }

          #note {
            background: #cfcfcfff;
            border: 1px solid #808080ff;
            border-radius: 8px;
            padding: 1rem 1.25rem;
            margin: 1.5rem 0;
            font-size: 1rem;
            color: #000000ff;
            font-family: ${globals.bodyFont};
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          }

          #note p {
            margin: 0;
          }

          .stone.open .stone-desc {
            max-height: 1000px;
            opacity: 1;
          }

          .stone {
            position: relative;
            background: #fafafa;
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 1.25rem;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .stone:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
            background: #f1f1f1ff;
          }

          .s1 {
            background-image: url("http://dailybruin.com/images/2015/02/stonewall.jpg");
            background-position: top;
          }

          .s2 {
            background-image: url("http://dailybruin.com/images/2015/02/stonewall.jpg");
            background-position: bottom;
          }

          .s3 {
            background-image: url("http://dailybruin.com/images/2015/02/stonewall.jpg");
            background-position: center;
          }

          #stonewall-wrap {
            font-family: ${globals.bodyFont};
            margin-top: 2rem;
            max-width: 1170px;
            margin-left: auto;
            margin-right: auto;
          }

          .db-next {
            display: none !important;
          }

          @media (max-width: 1200px) {
            #title h2 {
              font-size: 13vw;
            }

            .stone-title,
            .accordion .accordion-navigation > a {
              font-size: 1.5rem;
            }

            .content.stone-desc {
              font-size: 1rem;
            }
            /* two-column grid on small screens to prevent horizontal bleed */
            #stonewall-wrap ul {
              grid-template-columns: repeat(2, 1fr);
              grid-gap: 0.85rem;
            }
          }

          @media (max-width: 600px) {
            #title h2 {
              font-size: 11.5vw;
            }

            .stone-title,
            .accordion .accordion-navigation > a {
              font-size: 1rem;
            }

            .content.stone-desc {
              font-size: 0.8rem;
            }
            /* single-column grid on small screens to prevent horizontal bleed */
            #stonewall-wrap ul {
              grid-template-columns: 1fr;
              grid-gap: 0.75rem;
            }
          }
          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20%);
            }
            100% {
              opacity: 1;
              transform: translateY(0%);
            }
          }
        `}
      >
        <div id="stonewall-wrap">
          <div id="title">
            {"STONEWALL".split("").map((letter, i) => {
              return (
                <h2
                  key={i}
                  style={{
                    opacity: 0,
                    animation: "fadeInDown 1s ease !important",
                    animationDelay: `${0.15 * (i + 1)}s !important`,
                    animationFillMode: "forwards !important"
                  }}
                >
                  {letter}
                </h2>
              );
            })}
            <h3>From the Daily Bruin</h3>
          </div>
          <div id="blurb">
            <p>
              Since 1919, the Daily Bruin has strived to hold UCLA accountable
              to the community it serves. We take that responsibility seriously.
              And when the Bruin is unjustly thwarted in its efforts to inform
              students, we believe you have a right to know. Each time our
              reporters are stonewalled in their attempts to inform readers, we
              will record that here, stone by stone. No stonewalling that week,
              no new stone.
            </p>
          </div>

          <div id="note">
            <p>
              Click on a stone below to expand and read the full details.
            </p>
          </div>

          <ul id="stonewall" className="accordion" data-accordion>
            {stones &&
              stones.map((data, i) => {
                const isOpen = openStone === i;
                return (
                  <li
                    className={`accordion-navigation stone s ${
                      isOpen ? "open" : ""
                    }`}
                    key={i}
                    onClick={() => toggleStone(i)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="stone-title" id={`t${i}`}>
                      <h4 className="date">{data.Date}</h4>
                      <b>{data.Reason}</b>
                    </div>

                    <div id={`panel${i}a`} className="content stone-desc">
                      {data.Description != "" ? data.Description : "No description."}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PageWrapper(Stonewall);
