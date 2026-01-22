import React, { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import * as globals from "../../components/globals";
import style from "../style.module.css";

function getPosition(post) {
  const title = post.title.rendered || "";
  const match = title.match(/, (.+)$/);
  return match ? match[1].trim() : null;
}

const ColumnsFromQuarantineLayout = ({ posts }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DESKTOP_ORDER = [
    "President",
    "Internal Vice President",
    "General Representative 2",
    "Academic Affairs Commissioner",
    "Campus Events Commissioner",
    "Facilities Commissioner",
    "International Student Representative",
    "Transfer Student Representative",
    "External Vice President",
    "General Representative 1",
    "General Representative 3",
    "Cultural Affairs Commissioner",
    "Campus Service Commissioner",
    "Financial Supports Commissioner",
    "Student Wellness Commissioner"
  ];

  const MOBILE_ORDER = [
    "President",
    "External Vice President",
    "Internal Vice President",
    "General Representative 1",
    "General Representative 2",
    "General Representative 3",
    "Academic Affairs Commissioner",
    "Cultural Affairs Commissioner",
    "Campus Events Commissioner",
    "Campus Service Commissioner",
    "Facilities Commissioner",
    "Financial Supports Commissioner",
    "International Student Representative",
    "Student Wellness Commissioner",
    "Transfer Student Representative"
  ];

  const POSITION_ORDER = isMobile ? MOBILE_ORDER : DESKTOP_ORDER;

  const sortedPosts = [...posts].sort((a, b) => {
    const posA = getPosition(a);
    const posB = getPosition(b);

    const indexA = POSITION_ORDER.indexOf(posA);
    const indexB = POSITION_ORDER.indexOf(posB);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

    return (
      <div className={style.card}>
        <div
          css={css`
            ${globals.cardStyles}
          `}
        >
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              ${globals.phone} {
                flex-direction: column;
              }
            `}
          >
            <div
              css={css`
                flex-grow: 1;
                font-family: ${globals.headlineFont};
                padding: 20px;
                line-height: 1;

                h1,
                h6 {
                  margin: 0;
                }
              `}
            >
              <h6>DAILY BRUIN</h6>
              <h1
                css={css`
                  font-family: ${globals.headlineFont};
                  font-size: 60px;
                  font-weight: 400;
                  ${globals.phone} {
                    font-size: 50px;
                  }
                `}
              >
                USAC Officer Evaluations
              </h1>
              <h6
                css={css`
                  font-family: ${globals.menuFont};
                  font-weight: 400;
                  font-size: 20px;
                `}
              >
                2025 - 2026
              </h6>
            </div>
            <div
              css={css`
                flex-grow: 1;
                font-family: ${globals.bodyFont};
                padding: 20px;
                border-left: 1px solid #000;
                line-height: 1.5;
                font-size: 17px;
                ${globals.phone} {
                  border: none;
                  padding: 10px;
                }
              `}
            >
              <p>
                The Undergraduate Students Association Council is the student
                representative body on campus, made up of elected public
                officials meant to serve the interests of students and advocate
                for their needs. As such, the Daily Bruin Editorial Board
                recognizes the need to hold officers accountable. This year, the
                board evaluated officers on three criteria: transparency,
                fulfillment of responsibilities and platform completion. The
                evaluation process consists of interviews with the officers,
                deliberation between board members and a quorum-style vote to
                assign each rating. The board assigned each criterion with a
                letter grade from A to D, with D being the lowest and A being
                the highest.
              </p>
              <p>
                <b data-stringify-type="bold">
                  <i>Transparency:</i>
                </b>
                &nbsp;As elected officials, accountability is important. The
                Editorial Board has evaluated each council member in this
                category based on their accessibility and transparency to the
                Daily Bruin and the UCLA student body.
              </p>
              <p>
                <b data-stringify-type="bold">
                  <i>Fulfillment of Responsibilities:</i>
                </b>
                &nbsp; Each elected official has their own specific set of
                responsibilities. The Editorial Board has evaluated how each
                council member fulfilled the responsibilities and expectations
                of their respective offices, according to the USAC bylaws,
                beyond just their platforms.
              </p>
              <p>
                <b data-stringify-type="bold">
                  <i>Platform Completion:</i>
                </b>
                &nbsp;During their campaigns, elected officials ran on various
                platforms. The Editorial Board took into consideration potential
                benefit, thoughtfulness and feasibility of each council member’s
                goals and subsequently evaluated how well the officers completed
                or are projected to complete their campaign promises at the time
                of publishing.
              </p>
            </div>
          </div>
          <div
            css={css`
              column-count: 2;
              column-gap: 40px;
              max-width: 1000px;
              margin: auto;
              padding: 20px 20px 0;

              ${globals.phone} {
                column-count: 1;
              }
            `}
          >
          {sortedPosts.map((post, i) => (
            <a
              key={i}
              css={css`
                ${globals.cardStyles};
                color: black;
                display: table;
                min-height: 100px;
                position: relative;
                margin: 10px 0;
                display: inline-block;
                padding: 0;

                &:hover {
                  text-decoration: none;
                }
              `}
              href={"/post/" + post.slug}
            >
              <div
                css={css`
                  width: 100px;
                  height: 100px;
                  display: table-cell;
                  background-image: url(${post._embedded["wp:featuredmedia"] !=
                  undefined
                    ? post._embedded["wp:featuredmedia"][0].source_url
                    : ""});
                  background-size: cover;
                  background-position: center;
                `}
              />
              <div
                css={css`
                  display: table-cell;
                  vertical-align: middle;
                  text-align: left;
                  padding-left: 10px;
                  font-family: ${globals.bodyFont};
                `}
              >
                <div
                  css={css`
                    font-weight: 700;
                    font-size: 16px;
                  `}
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered
                      .replace("USAC Officer Evaluation: ", "")
                      .replace(/,.*$/, "")
                  }}
                />
                <div
                  css={css`
                    font-weight: 400;
                    font-size: 14px;
                  `}
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered
                      .replace("USAC Officer Evaluation: ", "")
                      .replace(/([^,]+),/, "")
                  }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColumnsFromQuarantineLayout;