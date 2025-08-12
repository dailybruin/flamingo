import React, { Component, useEffect } from "react";
import { Config } from "../config.js";
import Head from "next/head";

import MainSiteFooter from "components/MainSiteFooter";
import ClickboardMasthead from "components/Clickboard/ClickboardMasthead";
import ClickboardDisclaimer from "components/Clickboard/ClickboardDisclaimer";
import CommentFAB from "components/CommentFAB";

import css from "./style.module.css";

const wrapperStyle = {
  padding: "6px",
  backgroundColor: "#f1f1f1",
  width: "100%",
  height: "100%"
};

const layoutStyle = {
  maxWidth: 1336,
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

      /*
       * Categories to add besides those from WP API
       * Must have keys name, href, & as
       */
      const customCategories = {
        games: {
          name: "Games",
          href: "/category/games",
          as: "/category/games"
        },
        clickboard: {
          name: "Clickboard",
          href: "/clickboard",
          as: "/clickboard"
        }
      };

      mappedCategories.splice(15, 0, ...Object.values(customCategories));

      return {
        ...(Comp.getInitialProps ? childProps : null),
        mappedCategories
      };
    }

    render() {
      if (this.props.feature == true) {
        return <Comp {...this.props} />;
      }

      this.componentDidMount = () => {
        document.body.scrollTop = 0;
      };

      return (
        <div style={wrapperStyle}>
          <div style={layoutStyle}>
            <CommentFAB></CommentFAB>
            
            <div className={css["banner-ad"]}>
              <broadstreet-zone zone-id="69404"></broadstreet-zone>
            </div>

            <ClickboardMasthead
              categories={this.props.mappedCategories}
            ></ClickboardMasthead>

            <div style={{ padding: "6px" }}>
              <ClickboardDisclaimer />
            </div>

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
