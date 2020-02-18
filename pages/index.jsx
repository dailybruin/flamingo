import PageLayout from "../layouts/PageLayout";
import React, { Component } from "react";
import PageWrapper from "../layouts/PageWrapper";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../config.js";
import Cookies from "js-cookie";

import HomeUpper from "../layouts/Home/HomeUpper";
import HomeMultimedia from "../layouts/Home/HomeMultimedia";
import HomeLower from "../layouts/Home/HomeLower";
import EmailPopUp from "../components/EmailSignUp";
import { Z_FIXED } from "zlib";
// import HomeBottom from '../layouts/Home/HomeBottom'

const aTAGID = 4847;
const bTAGID = 4850;
const c1TAGID = 4849;
const c2TAGID = 4851;
const dTAGID = 4862;
const eTAGID = 4863;

const quadCATID = 12848;

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
      showPopUp: false
    };
  }
  static async getInitialProps(context) {
    const upperPosts = {
      aStory: null,
      bStory: null,
      c1Story: null,
      c2Story: null,
      dStory: null,
      eStory: null
    };
    const aStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${aTAGID}`
    );
    const bStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${bTAGID}`
    );
    const c1StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c1TAGID}`
    );
    const c2StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c2TAGID}`
    );
    const dStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${dTAGID}`
    );
    const eStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${eTAGID}`
    );
    const qdStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${quadCATID}`
    );
    upperPosts.aStory = await aStoryRes.json();
    upperPosts.bStory = await bStoryRes.json();
    upperPosts.c1Story = await c1StoryRes.json();
    upperPosts.c2Story = await c2StoryRes.json();
    upperPosts.dStory = await dStoryRes.json();
    upperPosts.eStory = await eStoryRes.json();
    upperPosts.quadList = await qdStoryRes.json();
    return { upperPosts };
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
    console.log(Cookies.get());
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

  removeCookies = () => {
    Cookies.remove("subscribed2newsletter");
    Cookies.remove("newsletterVisits");
  };

  render() {
    return (
      <div>
        <HomeUpper posts={this.props.upperPosts} />
        <HomeMultimedia></HomeMultimedia>
        <HomeLower posts={this.props.lowerPosts} />
        {this.state.showPopUp ? (
          <EmailPopUp
            sub2Newsletter={this.subscribeToNewsletter}
            close={this.closeNewsletterPopup}
          />
        ) : null}
      </div>
    );
  }
}

export default PageWrapper(Index);
