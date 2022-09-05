import React, { Component } from "react";
import { Config } from "../config.js";
import Head from "next/head";

import MainSiteFooter from "components/MainSiteFooter";
import BreakingCard from "components/BreakingBanner";
import InTheNews from "components/InTheNewsBanner";
import Masthead from "components/Masthead";
import CommentFAB from "components/CommentFAB";
import { headlineFont } from "components/globals.js";

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

const PageWrapper = Comp =>
  class extends Component {
    static async getInitialProps(ctx) {
      // Load the categories for the header
      // TODO: can we load this once each browser session?
      // only call getInitialProps if the child has that function
      const [childProps, categoriesRes] = await Promise.all([
        Comp.getInitialProps ? Comp.getInitialProps(ctx) : null,
        fetch(`${Config.apiUrl}/wp-json/wp/v2/categories`)
      ]);

      // Masthead Headers
      const mastheadCategoriesRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/masthead`
      );
      const categories = await mastheadCategoriesRes.json();
      let mappedCategories = null;
      if (categories.items.length != 0) {
        mappedCategories = categories.items.map(index => {
          return { name: index.title, href: index.url, as: index.url };
        });
      }

      // BreakingCard
      const breakingRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/breaking`
      );
      const breaking = await breakingRes.json();
      let mappedBreaking = null;
      if (breaking.items.length != 0) {
        mappedBreaking = {
          name: breaking.items[0].title,
          href: breaking.items[0].url
        };
      }

      // InTheNews
      const itnRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/in-the-news`
      );
      const itn = await itnRes.json();
      let mappedITN = null;
      if (itn.items.length != 0) {
        mappedITN = itn.items.map(index => {
          return { name: index.title, href: index.url, as: index.url };
        });
      }
      return {
        ...(Comp.getInitialProps ? childProps : null),
        mappedCategories,
        mappedBreaking,
        mappedITN
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
      let renderedInTheNews;
      if (this.props.mappedITN != null && this.props.mappedBreaking == null) {
        renderedInTheNews = (
          <div style={{ padding: "6px" }}>
            <InTheNews stories={this.props.mappedITN} />
          </div>
        );
      }
      return (
        <div style={wrapperStyle}>
          <div style={layoutStyle}>
            <CommentFAB></CommentFAB>
            <div className={css["banner-ad"]}>
              <broadstreet-zone zone-id="69404"></broadstreet-zone>
            </div>
            <div style={{ height: "27px", lineHeight: "25px", borderWidth: "1px", borderStyle: "solid", borderColor: "#000000", alignContent: "center", fontFamily: headlineFont, color: "#000000"}}>
              <div style={{ textAlign: "center", margin: "auto"}}>
                Interested in joining us? Apply
                <a href="https://apply.uclastudentmedia.com/">
                  <strong> HERE </strong>
                </a>
                by October 3!
              </div>
            </div>
            <Masthead categories={this.props.mappedCategories}></Masthead>
            {renderedBreakingCard}
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
