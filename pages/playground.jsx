import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import Link from "next/link";

import Masthead from "../components/Masthead";

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

export default class Playground extends Component {
  render() {
    return (
      <div style={{ margin: "auto", maxWidth: "1236px" }}>
        <Masthead categories={cats}></Masthead>
      </div>
    );
  }
}
