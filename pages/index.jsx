import React, { Component } from "react";
import PageWrapper from "../layouts/PageWrapper";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../config.js";

import HomeLayout from "../layouts/Home";

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
    const posts = {};
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
    posts.f3Story = await f3StoryRes.json();
    posts.newsList = await nsStoryRes.json();
    posts.opinionList = await opStoryRes.json();
    posts.artsList = await aeStoryRes.json();
    posts.sportsList = await spStoryRes.json();
    return { posts, multimediaPosts };
  }

  render() {
    return (
      <div>
        <HomeLayout posts={this.props.posts} media={this.props.multimediaPosts} />
      </div>
    );
  }
}

export default PageWrapper(Index);
