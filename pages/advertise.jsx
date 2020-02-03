import PageWrapper from "../layouts/PageWrapper";
import React, { Component } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../config.js";

import PageLayout from "../layouts/Page";

class Page extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/14`);
    const page = await pageRes.json();
    return { page };
  }
  render() {
    return <PageLayout page={this.props.page} />;
  }
}

export default PageWrapper(Page);
