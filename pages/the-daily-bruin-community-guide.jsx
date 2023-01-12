import PageWrapper from "../layouts/PageWrapper";
import React, { Component } from "react";
import { Config } from "../config.js";

import PageLayout from "../layouts/Page";

class Page extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/388408`);
    const page = await pageRes.json();
    return { page };
  }
  render() {
    return <PageLayout darkmode={this.props.darkmode} page={this.props.page} />;
  }
}

export default PageWrapper(Page);
