// layouts/PageWrapper.jsx
import React from "react";
import Media from "react-media";

import MainSiteFooter from "components/MainSiteFooter";
import BreakingCard from "components/BreakingBanner";
import InTheNews from "components/InTheNewsBanner";
import Masthead from "components/Masthead";
import CommentFAB from "components/CommentFAB";

import css from "./style.module.css";

const wrapperStyle = {
  padding: "6px",
  backgroundColor: "#f1f1f1",
  width: "100%",
  height: "100%"
};

const layoutStyle = {
  maxWidth: 1248,
  margin: "auto"
};

const NewPageWrapper = (Comp, wrapperProps = {}) => {
  return function WrappedPage(props) {
    if (props.feature === true) {
      return <Comp {...props} />;
    }

    /* From shared data */
    const {
      mappedCategories,
      mappedBreaking,
      mappedITN
    } = props;

    const renderedBreakingCard =
      mappedBreaking ? (
        <div style={{ padding: "6px" }}>
          <BreakingCard story={mappedBreaking} />
        </div>
      ) : null;

    const renderedInTheNews =
      mappedITN && !mappedBreaking ? (
        <div style={{ padding: "6px" }}>
          <InTheNews stories={mappedITN} />
        </div>
      ) : null;

    const mobileAdPlacement = !wrapperProps.isFrontPage ? (
      <Media
        queries={{
          phone: "(max-width: 600px)",
          tablet: "(min-width: 601px) and (max-width: 900px)",
          desktop: "(min-width: 901px)"
        }}
        defaultMatches={{ desktop: true }}
      >
        {matches =>
          matches.phone && (
            <div className={css["card-mobile"]}>
              <broadstreet-zone zone-id="69405" />
            </div>
          )
        }
      </Media>
    ) : null;

    return (
      <div style={wrapperStyle}>
        <div style={layoutStyle}>
          <CommentFAB />
          <div className={css["banner-ad"]}>
            <broadstreet-zone zone-id="69404" />
          </div>

          <Masthead categories={mappedCategories} />

          {renderedBreakingCard}
          {mobileAdPlacement}
          {renderedInTheNews}

          <Comp {...props} />

          <div style={{ padding: "6px" }}>
            <MainSiteFooter />
          </div>
        </div>
      </div>
    );
  };
};

export default NewPageWrapper;
