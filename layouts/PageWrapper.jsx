import React, { Component } from "react";
import { Config } from "../config.js";
import fetch from "isomorphic-unfetch";

import MainSiteFooter from "../components/MainSiteFooter";
import BreakingCard from "../components/BreakingCard";
import Masthead from "../components/Masthead";

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

const cats = [
  {
    name: "News",
    href: "/category/[slug]",
    as: "/category/news"
  },
  {
    name: "Sports",
    href: "/category/[slug]",
    as: "/category/sports"
  },
  {
    name: "Arts",
    href: "/category/[slug]",
    as: "/category/arts"
  },
  {
    name: "Opinion",
    href: "/category/[slug]",
    as: "/category/opinion"
  },
  {
    name: "Photo",
    href: "/category/[slug]",
    as: "/category/photo"
  },
  {
    name: "Video",
    href: "/category/[slug]",
    as: "/category/video"
  },
  {
    name: "Illustrations",
    href: "/category/[slug]",
    as: "/category/illustrations"
  },
  {
    name: "Graphics",
    href: "/category/[slug]",
    as: "/category/graphics"
  },
  {
    name: "Enterprise",
    href: "/category/[slug]",
    as: "/category/enterprise"
  },
  {
    name: "Prime",
    href: "https://prime.dailybruin.com",
    as: "https://prime.dailybruin.com"
  },
  {
    name: "The Quad",
    href: "/category/[slug]",
    as: "/category/quad"
  },
  {
    name: "The Stack",
    href: "https://stack.dailybruin.com",
    as: "https://stack.dailybruin.com"
  },
  {
    name: "Podcasts",
    href: "/category/[slug]",
    as: "/category/pocasts"
  }
];

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

      // BreakingCard
      const breakingRes = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/breaking`
      );
      const breaking = await breakingRes.json();
      let mappedBreaking = null;
      console.log(breaking.items.length);
      if (breaking.items.length != 0) {
        mappedBreaking = {
          name: breaking.items[0].title,
          href: breaking.items[0].url
        };
      }

      return {
        ...(Comp.getInitialProps ? childProps : null),
        mappedCategories,
        mappedBreaking
      };
    }

    render() {
      let renderedBreakingCard;
      console.log(this.props.mappedBreaking);
      if (this.props.mappedBreaking != null) {
        renderedBreakingCard = (
          <div style={{ padding: "6px" }}>
            <BreakingCard story={this.props.mappedBreaking} />
          </div>
        );
      }
      return (
        <div style={layoutStyle}>
          <div style={bannerAdStyle}>ADVERTISEMENT</div>
          <Masthead categories={cats}></Masthead>
          {renderedBreakingCard}
          <Comp {...this.props} />
          <div style={{ padding: "6px" }}>

            <MainSiteFooter />
          </div>
        </div>
      );
    }
  };

export default PageWrapper;
