import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";
import PageWrapper from "../../layouts/PageWrapper";

import Emmys2022Layout from "../../layouts/Emmys2022";

class Emmys2022 extends React.Component {
  static async getInitialProps() {
    const slug = "emmys-2022"; // this is the website page url
    const slug2 = "emmys-2022-stories";
    const slug3 = "emmys-2022-related";
    const tagRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug2}`
    );
    const tagResRelated = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug3}`
    );

    const tag = await tagRes.json();
    const tagRelated = await tagResRelated.json();
    if (tag.length > 0) {
      const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${tag[0].id}&per_page=50`
      );
      const posts = await postsRes.json();
      const classifiedsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
      );
      const classifieds = await classifiedsRes.json();

      const postsResRelated = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${tagRelated[0].id}&per_page=50`
      );
      const relatedPosts = await postsResRelated.json();
      return { tag, tagRelated, posts, relatedPosts, classifieds };
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
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <title>Emmys 2022 - Daily Bruin</title>
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
            content='After a year of recording-breaking series and refreshing spins on traditional genres, the 2022 Emmy Awards commemorates another year of television visionaries decorated in purple and gold. Read on for the Daily Bruin’s coverage of the 74th annual Emmy Awards and the meticulous work of nominated alumni.'
          />
          <meta
            property="og:url"
            content="https://dailybruin.com/tag/emmys-2022/"
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
            content='After a year of recording-breaking series and refreshing spins on traditional genres, the 2022 Emmy Awards commemorates another year of television visionaries decorated in purple and gold. Read on for the Daily Bruin’s coverage of the 74th annual Emmy Awards and the meticulous work of nominated alumni.'
          />
          <meta name="twitter:title" content="Emmys 2022" />
          <meta name="twitter:site" content="@dailybruin" />
          <meta
            name="twitter:image"
            content="https://dailybruin.com/images/2020/04/colfromquar.jpeg"
          />
          {/* need to add meta tags! */}
        </Head>
        <div>
          <Emmys2022Layout
            posts={this.props.posts}
            relatedPosts={this.props.relatedPosts}
            tag={this.props.tag[0]}
          />
        </div>
      </>
    );
  }
}

export default Emmys2022;
