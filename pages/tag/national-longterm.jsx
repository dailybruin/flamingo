import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";
import PageWrapper from "../../layouts/PageWrapper";

import NationalLongtermLayout from "layouts/NationalLongterm/index.jsx";
("../../layouts/NationalLongterm");

class NationalLongterm extends React.Component {
  static async getInitialProps() {
    const slug = "national-longterm"; // change to national-longterm later
    const slug2 = "columns-from-quarantine";
    const tagRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug2}`
    );
    console.log(`${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug2}`);
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
          <title>Columns From Quarantine - Daily Bruin</title>
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <link
            rel="canonical"
            href="https://dailybruin.com/tag/columns-from-quarantine/"
          />
          <link rel="next" href="/tag/columns-from-quarantine/page/2/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="object" />
          <meta property="og:title" content="Columns From Quarantine" />
          <meta
            property="og:description"
            content='"Columns From Quarantine” explores the multifaceted experiences the UCLA community has endured since the outset of the COVID-19 pandemic.'
          />
          <meta
            property="og:url"
            content="https://dailybruin.com/tag/columns-from-quarantine/"
          />
          <meta property="og:site_name" content="Daily Bruin" />
          <meta
            property="og:image"
            content="https://dailybruin.com/images/2020/04/colfromquar-1024x605.jpeg"
          />
          <meta
            property="og:image:secure_url"
            content="https://dailybruin.com/images/2020/04/colfromquar-1024x605.jpeg"
          />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="605" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content='"Columns From Quarantine” explores the multifaceted experiences the UCLA community has endured since the outset of the COVID-19 pandemic.'
          />
          <meta name="twitter:title" content="Columns From Quarantine" />
          <meta name="twitter:site" content="@dailybruin" />
          <meta
            name="twitter:image"
            content="https://dailybruin.com/images/2020/04/colfromquar.jpeg"
          />
          {/* need to add meta tags! */}
        </Head>
        <div>
          <NationalLongtermLayout
            posts={this.props.posts}
            tag={this.props.tag[0]}
          />
          {/* <NationalLongtermLayout /> */}
        </div>
      </>
    );
  }
}

export default NationalLongterm;
