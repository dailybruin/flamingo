import React, { Component } from "react";
import { Config } from "../config.js";
import fetch from "isomorphic-unfetch";

import MainSiteFooter from "../components/MainSiteFooter";
import MainSiteHeader from "../components/MainSiteHeader";

import "./style.css";

const layoutStyle = {
  maxWidth: 1248,
  margin: "auto"
};

const bannerAdStyle = {
  maxWidth: "728px",
  maxHeight: "90px",
  height: "90px",
  lineHeight: "90px",
  backgroundColor: "#aaa",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  margin: "6px auto"
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

      const categories = await categoriesRes.json();
      const mappedCategories = categories.map(index => {
        return { category: index.name, categoryURL: "/category/" + index.slug };
      });

      return {
        ...(Comp.getInitialProps ? childProps : null),
        mappedCategories
      };
    }

    render() {
      return (
        <div style={layoutStyle}>
          <div style={bannerAdStyle}>ADVERTISEMENT</div>
          <div style={{ padding: "6px", position: "sticky", top: "-6px", zIndex: "1000" }}>
            <MainSiteHeader links={this.props.mappedCategories} />
          </div>
          <Comp {...this.props} />
          <div style={{ padding: "6px" }}>
            <MainSiteFooter />
          </div>
        </div>
      );
    }
  };

export default PageWrapper;
