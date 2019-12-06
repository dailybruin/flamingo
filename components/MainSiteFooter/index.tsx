import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as MainSiteStyles from "../globals";
import FooterLink from "../Footer/FooterLink";

export default function MainSiteFooter(props: {}) {
  const mainSiteFooterLinks = [
    { text: "About", url: "https://dailybruin.com/about" },
    { text: "Contact", url: "https://dailybruin.com/contact" },
    { text: "Advertise", url: "https://dailybruin.com/advertise" },
    { text: "Work With Us", url: "https://apply.uclastudentmedia.com" },
    { text: "Privacy", url: "https://dailybruin.com/privacy" }
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

        ${MainSiteStyles.mediaMobileBreakpoint} {
          flex-direction: column;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;

          ${MainSiteStyles.mediaMobileBreakpoint} {
            flex-direction: column;
            text-align: center;
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

          ${MainSiteStyles.mediaMobileBreakpoint} {
            text-align: center;
            margin: auto;
          }
        `}
      >
        Copyright © {currentYear} Daily Bruin
      </div>
    </footer>
  );
}
