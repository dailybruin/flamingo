import PageWrapper from "../../layouts/PageWrapper";
import React, { Component } from "react";
import Head from "next/head";
import Error from "next/error";
import { Config } from "../../config.js";

import PageLayout from "../../layouts/Page";

class Page extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const pageRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/pages?slug=${slug}&_embed`
    );
    const page = await pageRes.json();
    return { page };
  }
  render() {
    if (
      this.props.page == undefined ||
      this.props.post.page != undefined ||
      this.props.page.length == 0
    )
      return (
        <div>
          <Head>
            <title
              dangerouslySetInnerHTML={{
                __html: this.props.page[0].title.rendered + " - Daily Bruin"
              }}
            />
          </Head>
          <PageLayout page={this.props.page[0]} />
        </div>
      );
  }
}

export default PageWrapper(Page);
