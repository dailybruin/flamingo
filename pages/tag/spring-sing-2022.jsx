import React from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import Head from "next/head";
import PageWrapper from "../../layouts/PageWrapper";

import TheStateOfTheUCLayout from "layouts/TheStateOfTheUC";
import SpringSing2022Layout from "../../layouts/SpringSing2022/index.jsx";

export default class SpringSing2022 extends React.Component {
  static async getInitialProps() {
    const slug = "spring-sing-2022";
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
              __html: this.props.tag[0].name + " - Daily Bruin"
            }}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Kiwi+Maru&display=swap"
            rel="stylesheet"
          />
          <title>Spring Sing 2022</title>
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <link
            rel="canonical"
            href="https://dailybruin.com/tag/spring-sing-2022/"
          />
          <link rel="next" href="/tag/spring-sing-2022/" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="object" />
          <meta property="og:title" content="Spring Sing 2022" />
          <meta
            property="og:description"
            content="Spring Sing is taking the stage again. The annual event, featuring music and performances from students, will kick off May 20 at the Los Angeles Tennis Center. With categories such as solo acts, duos, bands, a cappella groups, dancers and interdisciplinary creators, the 77th Spring Sing will spotlight 16 acts as they are judged before a surprise celebrity panel."
          />
          <meta
            property="og:url"
            content="https://dailybruin.com/tag/spring-sing-2022/"
          />
          <meta property="og:site_name" content="Daily Bruin" />
          <meta
            property="og:image"
            content="https://wp.dailybruin.com/images/2022/05/SpringSingLandingStaticSmall.jpg"
          />
          <meta
            property="og:image:secure_url"
            content="https://wp.dailybruin.com/images/2022/05/SpringSingLandingStaticSmall.jpg"
          />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="605" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:description"
            content="Spring Sing is taking the stage again. The annual event, featuring music and performances from students, will kick off May 20 at the Los Angeles Tennis Center. With categories such as solo acts, duos, bands, a cappella groups, dancers and interdisciplinary creators, the 77th Spring Sing will spotlight 16 acts as they are judged before a surprise celebrity panel."
          />
          <meta name="twitter:title" content="Spring Sing 2022" />
          <meta name="twitter:site" content="@dailybruin" />
          <meta
            name="twitter:image"
            content="https://wp.dailybruin.com/images/2022/05/SpringSingLandingStaticSmall.jpg"
          />
        </Head>
        <div>
          <SpringSing2022Layout
            posts={this.props.posts}
            tag={this.props.tag[0]}
          />
        </div>
      </>
    );
  }
}
