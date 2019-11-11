import React, { Component } from "react";
import PageWrapper from "../layouts/PageWrapper";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../config.js";

import HomeUpper from "../layouts/Home/HomeUpper";
import HomeMultimedia from "../layouts/Home/HomeMultimedia";
import HomeLower from "../layouts/Home/HomeLower";
// import HomeBottom from '../layouts/Home/HomeBottom'

const aTAGID = 4847;
const bTAGID = 4850;
const c1TAGID = 4849;
const c2TAGID = 4851;
const dTAGID = 4862;
const eTAGID = 4863;
const m1TAGID = 4854;
const f1TAGID = 22156;
const f2TAGID = 22157;
const f3TAGID = 22158;

const quadCATID = 12848;
const newsCATID = 1424;
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
  static async getInitialProps(context) {
    const upperPosts = {};
    const lowerPosts = {};

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
    const mmStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${m1TAGID}`
    );
    const f1StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${f1TAGID}`
    );
    const f2StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${f2TAGID}`
    );
    const f3StoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${f3TAGID}`
    );
    const nsStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${newsCATID}`
    );
    const opStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${opinionCATID}`
    );
    const aeStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${artsCATID}`
    );
    const spStoryRes = await fetch(
      `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&categories=${sportsCATID}`
    );
    upperPosts.aStory = await aStoryRes.json();
    upperPosts.bStory = await bStoryRes.json();
    upperPosts.c1Story = await c1StoryRes.json();
    upperPosts.c2Story = await c2StoryRes.json();
    upperPosts.dStory = await dStoryRes.json();
    upperPosts.eStory = await eStoryRes.json();
    upperPosts.quadList = await qdStoryRes.json();
    const multimediaPosts = await mmStoryRes.json();
    lowerPosts.f1Story = await f1StoryRes.json();
    lowerPosts.f2Story = await f2StoryRes.json();
    lowerPosts.f3Story = await f3StoryRes.json();
    lowerPosts.newsList = await nsStoryRes.json();
    lowerPosts.opinionList = await opStoryRes.json();
    lowerPosts.artsList = await aeStoryRes.json();
    lowerPosts.sportsList = await spStoryRes.json();
    return { upperPosts, multimediaPosts, lowerPosts };
  }

  render() {
    return (
      <div>
        <HomeUpper posts={this.props.upperPosts} />
        <HomeMultimedia media={this.props.multimediaPosts}></HomeMultimedia>
        <HomeLower posts={this.props.lowerPosts} />
      </div>
    );
  }
}

export default PageWrapper(Index);
