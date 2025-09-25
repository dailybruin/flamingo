import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";

import fullStar from "./paw-filled.svg";
import halfStar from "./paw-half-filled.svg";
import emptyStar from "./paw-outline.svg";
import * as globals from "../globals";

export default class ReviewInfobox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const stars = [];
    if (this.props.rating != null) {
      let i = 0;
      for (; i < Math.floor(this.props.rating); i++) {
        stars.push(<img key={`full-${i}`} src={fullStar} />);
      }
      if (this.props.rating % 1 === 0.5) {
        stars.push(<img key="half" src={halfStar} />);
        i += 1.5;
      }
      for (; i < 5; i++) {
        stars.push(<img key={`empty-${i}`} src={emptyStar} />);
      }
    }
    return (
      <div
        css={css`
          padding: 10px;
          padding-top: 0px;
          width: 100%;
          background: #ffffff;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          display: inline-block;
          min-width: 250px;
        `}
      >
        <div
          css={css`
            left: 0;
            right: 0;

            margin: 0;
            color: #000000;
            font-family: ${globals.menuFont} !important;

            & p,
            & strong {
              margin: 4px 0;
              font-size: 1rem;
            }

            & p:first-of-type,
            & h4 {
              padding: 0 10px;
              margin: -10px -10px 0;
              line-height: 36px;
              min-height: 36px;
              background-color: #000000;
              color: #ffffff;

              font-style: normal;
              font-weight: bold;
              font-size: 20px;
              align-items: center;
            }

            & h4 {
              font-family: ${globals.menuFont};
              text-transform: uppercase;
              margin-bottom: 8px;
              margin-top: 8px;
            }

            & h4:first-of-type {
              margin-top: 0px;
            }

            /* don't display hr's right after an h4 */
            & h4 + hr {
              display: none;
            }

            & p:nth-of-type(2) {
              font-weight: bold;
            }

            & hr {
              border: none;
              border-top: 1px solid #a1a1a1ff;
              margin: 8px 0;
            }

            & table {
              width: 100%;
              border-collapse: collapse;
            }

            & td {
              padding: 6px 8px;
              vertical-align: middle;
            }

            & td:first-of-type {
              width: auto;
            }
          `}
          /* this.props.title contains the info box HTML */
          dangerouslySetInnerHTML={{ __html: cleanTableHTML(this.props.title) }}
        />
        {this.props.rating == 0 || (
          <div
            css={css`
              text-align: center;
              padding: 2px 10px 0;
              margin-bottom: -10px;
            `}
          >
            {stars}
          </div>
        )}
      </div>
    );
  }
}

function cleanTableHTML(htmlString) {
  // Split the HTML by <h4> headings
  const sections = htmlString.split(/(<h4[^>]*>.*?<\/h4>)/gi);
  
  let result = "";

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();
    
    // If this is an <h4>, append it to the result
    if (/^<h4/i.test(section)) {
      result += section; // include the heading
      // Check if next section exists and wrap it in a table
      if (i + 1 < sections.length) {
        const nextSection = sections[i + 1]
          .replace(/<\/?table[^>]*>/gi, "") // remove all tables
          .trim();
        if (nextSection) {
          result += `<table><tbody>${nextSection}</tbody></table>`;
        }
        i++; // skip the next section since we already processed it
      }
    }
  }

  return result;
}

