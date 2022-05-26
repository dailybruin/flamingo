import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";
import PageWrapper from "../../layouts/PageWrapper";

import TheStateOfTheUCLayout from "layouts/TheStateOfTheUC";

export default class TheStateOfTheUC extends React.Component {
  static async getInitialProps() {
    const slug = "the-state-of-the-uc"; // change to national-longterm later
    const tagRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`
    );
    console.log(`${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`);
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
    // return <div>Hello</div>;
    if (this.props.tag.length == 0) return <Error statusCode={404} />;
    return (
      <>
        <Head>
          <title
            dangerouslySetInnerHTML={{
              __html: "TNL" + " - Daily Bruin"
            }}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <title>The state of the UC</title>
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <link
            rel="canonical"
            href="https://dailybruin.com/tag/the-state-of-the-uc/"
          />
          <link rel="next" href="/tag/the-state-of-the-uc/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="object" />
          <meta property="og:title" content="The state of the UC" />
          <meta
            property="og:description"
            content='In "The state of the UC," University of California faculty and students highlight existing issues and explore potential solutions related to funding, sustainability and enrollment.'
          />
          <meta
            property="og:url"
            content="https://dailybruin.com/tag/the-state-of-the-uc/"
          />
          <meta property="og:site_name" content="Daily Bruin" />
          <meta
            property="og:image"
            content="https://s3.us-west-1.amazonaws.com/assets3.dailybruin.com/images/desktop+landing+news.png"
          />
          <meta
            property="og:image:secure_url"
            content="https://s3.us-west-1.amazonaws.com/assets3.dailybruin.com/images/desktop+landing+news.png"
          />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="605" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content='In "The state of the UC," University of California faculty and students highlight existing issues and explore potential solutions related to funding, sustainability and enrollment.'
          />
          <meta name="twitter:title" content="The state of the UC" />
          <meta name="twitter:site" content="@dailybruin" />
          <meta
            name="twitter:image"
            content="https://s3.us-west-1.amazonaws.com/assets3.dailybruin.com/images/desktop+landing+news.png"
          />
          {/* need to add meta tags! */}
        </Head>
        <div>
          <TheStateOfTheUCLayout
            posts={this.props.posts}
            tag={this.props.tag[0]}
          />
          {/* <NationalLongtermLayout /> */}
        </div>
      </>
    );
  }
}
