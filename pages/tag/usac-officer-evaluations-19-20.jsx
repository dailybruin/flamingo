import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";
import PageWrapper from "../../layouts/PageWrapper";

import USACOfficerEvaluations1920Layout from "../../layouts/USACOfficerEvaluations1920";

class USACOfficerEvaluations1920 extends React.Component {
  static async getInitialProps() {
    const slug = "USAC-Officer-Evaluations-19-20";
    const tagRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`
    );
    const tag = await tagRes.json();
    if (tag.length > 0) {
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${tag[0].id}&per_page=50`
      );
      const posts = await postsRes.json();
      const classifiedsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
      );
      const classifieds = await classifiedsRes.json();
      return { tag, posts, classifieds };
    }
    return { tag };
  }
  render() {
    if (this.props.tag.length == 0) return <Error statusCode={404} />;
    return (
      <>
        <Head>
          <title
            dangerouslySetInnerHTML={{
              __html: this.props.tag[0].name + " - Daily Bruin"
            }}
          />
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="object" />
          <meta property="og:title" content={this.props.tag[0].name} />
          <meta
            property="og:description"
            content="The Daily Bruin editorial board evaluates the Undergraduate Students Association Council and their work for the 2019-2020 academic year."
          />
          <meta
            property="og:url"
            content="https://dailybruin.com/tag/usac-officer-evaluations-19-20"
          />
          <meta property="og:site_name" content="Daily Bruin" />
          <meta
            property="og:image"
            content="https://dailybruin.com/images/2020/05/usac-officer.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://wp.dailybruin.com/images/2020/05/usac-officer.png"
          />
          <meta property="og:image:width" content="3975" />
          <meta property="og:image:height" content="2088" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="The Daily Bruin editorial board evaluates the Undergraduate Students Association Council and their work for the 2019-2020 academic year."
          />
          <meta name="twitter:title" content={this.props.tag[0].name} />
          <meta name="twitter:site" content="@dailybruin" />
          <meta
            name="twitter:image"
            content="https://wp.dailybruin.com/images/2020/05/usac-officer.png"
          />
        </Head>
        <div>
          <USACOfficerEvaluations1920Layout
            posts={this.props.posts}
            tag={this.props.tag[0]}
          />
        </div>
      </>
    );
  }
}

export default PageWrapper(USACOfficerEvaluations1920);
