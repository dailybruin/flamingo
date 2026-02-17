import React, { Component, useEffect } from "react";
import Head from "next/head";

import { fetchSharedData } from "../lib/fetchData";
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

const PageWrapper = (Comp, wrapperProps = {}) =>
  class PageWrapperInternal extends Component {
    static async getInitialProps(ctx) {
      const [childProps, sharedData] = await Promise.all([
        Comp.getInitialProps ? Comp.getInitialProps(ctx) : null,
        fetchSharedData()
      ]);
      return {
        ...(Comp.getInitialProps ? childProps : null),
        ...sharedData
      };
    }

    render() {
      if (this.props.feature == true) {
        return <Comp {...this.props} />;
      }
      let renderedBreakingCard;
      if (this.props.mappedBreaking != null) {
        renderedBreakingCard = (
          <div style={{ padding: "6px" }}>
            <BreakingCard story={this.props.mappedBreaking} />
          </div>
        );
      }

      let mobileAdPlacement = null;
      if (!wrapperProps.isFrontPage) {
        mobileAdPlacement = <Media
          queries={{
            phone: "(max-width: 600px)",
            tablet: "(min-width: 601px) and (max-width: 900px)",
            desktop: "(min-width: 901px)"
          }}
          defaultMatches={{ desktop: true }}
        >
          {matches => (
            <div>
              {matches.phone && (
                <div className={css["card-mobile"]}>
                  <broadstreet-zone zone-id="69405"></broadstreet-zone>
                </div>
              )}
            </div>
          )}
        </Media>;
      }

      let renderedInTheNews;
      if (this.props.mappedITN != null && this.props.mappedBreaking == null) {
        renderedInTheNews = (
          <div style={{ padding: "6px" }}>
            <InTheNews stories={this.props.mappedITN} />
          </div>
        );
      }

      this.componentDidMount = () => {
        document.body.scrollTop = 0;
      }

      return (
        <div style={wrapperStyle}>
          <div style={layoutStyle}>
            <CommentFAB></CommentFAB>
            <div className={css["banner-ad"]}>
              <broadstreet-zone zone-id="69404"></broadstreet-zone>
            </div>
            <Masthead categories={this.props.mappedCategories}></Masthead>
            {renderedBreakingCard}
            {mobileAdPlacement}
            {renderedInTheNews}
            <Comp {...this.props} />
            <div style={{ padding: "6px" }}>
              <MainSiteFooter />
            </div>
          </div>
        </div>
      );
    }
  };

export default PageWrapper;
