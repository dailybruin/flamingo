import React, { Component } from "react";
import PageWrapper from "../layouts/PageWrapper";
import Error from "next/error";
import { Config } from "../config.js";
import Head from "next/head";

import HomeLayout from "../layouts/Home";
import Cookies from "js-cookie";
import EmailPopUp from "../components/EmailSignUp";
import WelcomePopUp from "../components/WelcomePopUp";

const aTAGID = 4847;
const bTAGID = 4850;
const c1TAGID = 4849;
const c2TAGID = 4851;
const dTAGID = 4862;
const eTAGID = 4863;
const m1TAGID = 4854;
const f1TAGID = 22896;
const f2TAGID = 22897;

const quadCATID = 12848;
const newsCATID = 1424;
const enterpriseCATID = 21602;
const opinionCATID = 1460;
const artsCATID = 1454;
const sportsCATID = 1431;

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  height: "200px",
  lineHeight: "200px",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  textTransform: "uppercase"
};

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopUp: false,
      showWelcome: false
    };
  }
  static async getInitialProps(context) {
    const posts = {};
    const aStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${aTAGID}&${Config.articleCardFields}`
    );
    const bStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${bTAGID}&${Config.articleCardFields}`
    );
    const c1StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c1TAGID}&${Config.articleCardFields}`
    );
    const c2StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c2TAGID}&${Config.articleCardFields}`
    );
    const dStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${dTAGID}&${Config.articleCardFields}`
    );
    const eStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${eTAGID}&${Config.articleCardFields}`
    );
    const qdStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${quadCATID}&${Config.articleCardFields}`
    );
    const mmStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${m1TAGID}&${Config.articleCardFields}`
    );
    const f1StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${f1TAGID}&${Config.articleCardFields}`
    );
    const f2StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${f2TAGID}&${Config.articleCardFields}`
    );
    const nsStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${newsCATID}&${Config.articleCardFields}`
    );
    const enStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${enterpriseCATID}&${Config.articleCardFields}`
    );
    const opStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${opinionCATID}&${Config.articleCardFields}`
    );
    const aeStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${artsCATID}&${Config.articleCardFields}`
    );
    const spStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${sportsCATID}&${Config.articleCardFields}`
    );
    const classifiedsRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
    );
    const sponsoredRes = await fetch(`${Config.apiUrl}/wp-json/db/v1/links`);
    posts.aStory = await aStoryRes.json();
    posts.bStory = await bStoryRes.json();
    posts.c1Story = await c1StoryRes.json();
    posts.c2Story = await c2StoryRes.json();
    posts.dStory = await dStoryRes.json();
    posts.eStory = await eStoryRes.json();
    posts.quadList = await qdStoryRes.json();
    const multimediaPosts = await mmStoryRes.json();
    posts.f1Story = await f1StoryRes.json();
    posts.f2Story = await f2StoryRes.json();
    posts.newsList = await nsStoryRes.json();
    posts.enterpriseList = await enStoryRes.json();
    posts.opinionList = await opStoryRes.json();
    posts.artsList = await aeStoryRes.json();
    posts.sportsList = await spStoryRes.json();
    const classifieds = await classifiedsRes.json();
    const sponsored = await sponsoredRes.text();
    return { posts, multimediaPosts, classifieds, sponsored };
  }

  componentDidMount() {
    if (Cookies.get("subscribed2newsletter") === undefined) {
      let visits = Cookies.get("newsletterVisits");
      if (visits === undefined) {
        Cookies.set("newsletterVisits", "0", { expires: 365 });
      } else {
        visits = parseInt(visits) + 1;
        if (visits >= 5) {
          this.displayNewsletterPopup();
          Cookies.set("newsletterVisits", "0", { expires: 365 });
        } else {
          Cookies.set("newsletterVisits", visits.toString(), { expires: 365 });
        }
      }
    }
    if (Cookies.get("visited") === undefined) {
      this.setState({ showWelcome: true });
      Cookies.set("visited", "true", { expires: 365 });
    }
  }

  subscribeToNewsletter = () => {
    Cookies.set("subscribed2newsletter", "true", { expires: 365 });
  };

  displayNewsletterPopup = () => {
    this.setState({ showPopUp: true });
  };

  closeNewsletterPopup = () => {
    this.setState({ showPopUp: false });
  };

  closeWelcomePopup = () => {
    this.setState({ showWelcome: false });
  };

  removeCookies = () => {
    Cookies.remove("subscribed2newsletter");
    Cookies.remove("newsletterVisits");
    Cookies.remove("visited");
  };

  render() {
    return (
      <>
        <Head>
          <title>{`Daily Bruin - Since 1919`}</title>
          <meta
            name="description"
            content="UCLA's independent, student-run newspaper"
          />
          <link rel="canonical" href="https://dailybruin.com/" />
          <meta
            property="og:image"
            content="https://wp.dailybruin.com/images/2017/03/db-logo.png"
          />
          <meta
            property="twitter:image"
            content="https://wp.dailybruin.com/images/2017/03/db-logo.png"
          />
          <meta property="og:url" content="https://dailybruin.com" />
          <meta property="og:title" content="The Daily Bruin" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Daily Bruin" />
          <meta
            property="og:description"
            content="UCLA's independent, student-run newspaper"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="fb:pages" content="47311244274" />
          <meta name="twitter:title" content="Daily Bruin - Since 2020" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@dailybruin" />
          <meta name="twitter:creator" content="@dailybruin" />
          <meta
            name="twitter:description"
            content="UCLA's independent, student-run newspaper"
          />
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
        </Head>
        <HomeLayout
          posts={this.props.posts}
          media={this.props.multimediaPosts}
          classifieds={this.props.classifieds.map(c => {
            return {
              category: {
                name: c._embedded["wp:term"][1][0].name,
                url: c._embedded["wp:term"][1][0].link
              },
              content: { name: c.content.rendered, url: c.link }
            };
          })}
          sponsoredLinks={this.props.sponsored.replace("null", "")}
        />
        {this.state.showPopUp && !this.state.showWelcome ? (
          <EmailPopUp
            sub2Newsletter={this.subscribeToNewsletter}
            close={this.closeNewsletterPopup}
          />
        ) : null}
        {this.state.showWelcome ? (
          <WelcomePopUp
            bodytext="You're looking at the new dailybruin.com! Feel free to leave us some feedback by clicking the blue button at the bottom right. We appreciate it!"
            close={this.closeWelcomePopup}
          />
        ) : null}
      </>
    );
  }
}

export default PageWrapper(Index);
