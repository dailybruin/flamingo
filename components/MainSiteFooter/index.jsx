import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as MainSiteStyles from "../globals";
import FooterLink from "../Footer/FooterLink";

export default function MainSiteFooter(props) {
  const mainSiteFooterLinks = [
    { text: "About", url: "/about" },
    { text: "Contact", url: "/contact" },
    { text: "Submit", url: "/submit" },
    { text: "Advertise", url: "/advertise" },
    { text: "Staff", url: "/staff" },
    { text: "Stonewall", url: "/stonewall" },
    { text: "Editorial Board", url: "/editorial-board" },
    { text: "Privacy", url: "/privacy" },
    { text: "Comment Policy", url: "/comment" },
    { text: "Community Guide", url: "/the-daily-bruin-community-guide" },
    { text: "Join The Daily Bruin", url: "/join-the-daily-bruin" }
  ];

  const renderedLinks = mainSiteFooterLinks.map(link => (
    <FooterLink key={link.text} url={link.url} text={link.text} />
  ));

  const currentYear = new Date().getFullYear();

  return (
    <footer
      css={css`
        display: flex;
        font-size: 0.85rem;
        flex-direction: row;
        padding: 0.4rem;
        background-color: white;
        font-family: ${MainSiteStyles.headlineFont};
        font-weight: ${MainSiteStyles.boldFont};
        box-shadow: ${MainSiteStyles.cardShadow};
        border-top: 5px solid black;

        ${MainSiteStyles.phone} {
          flex-direction: column;
        }

        ${MainSiteStyles.tablet} {
          flex-direction: column;
        }
      `}
      id="footer"
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;

          ${MainSiteStyles.phone} {
            display: block;
            column-count: 2;
            column-fill: auto;
            padding-left: 20px;
            padding-bottom: 4px;
            border-bottom: 1px solid #000;
            & a {
              display: block;
              padding: 0 4px;
            }
          }

          ${MainSiteStyles.tablet} {
            display: block;
            column-count: 3;
            column-fill: auto;
            padding-left: 20px;
            padding-bottom: 4px;
            border-bottom: 1px solid #000;
            & a {
              display: block;
              padding: 0 4px;
            }
          }
        `}
      >
        {renderedLinks}
      </div>
      <div
        css={css`
          text-align: right;
          margin-left: auto;
          flex-grow: 1;

          ${MainSiteStyles.phone} {
            text-align: center;
            margin: auto;
            padding-top: 4px;
          }

          ${MainSiteStyles.tablet} {
            text-align: center;
            margin: auto;
            padding-top: 4px;
          }
        `}
      >
        Copyright © {currentYear} Daily Bruin
      </div>
    </footer>
  );
}
