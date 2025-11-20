import React, { useState, useEffect } from "react";
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

// db story tagged with "db-story-g" will appear at the top of the rightmost column of the paper (where quad was)
const gTAGID = 27530;
// The fourth story that appears in the rightmost column of the website, below the "full" card and the two "mini" cards. (where sports was)
const hTAGID = 27531
// Story appears in leftmost column under featured classifieds. (where news was)
const iTAGID = 27532;
// Last story in the leftmost column (where enterprise was)
const jTAGID = 27534;
// Last story on the left side of the middle column (where opinion was)
const kTAGID = 27535;
// Last story on the right side of the middle column (where arts was)
const lTAGID = 27536;

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

function Index({ posts, multimediaPosts, classifieds, sponsored }) {
  const [showNewsletterPopUp, setShowNewsletterPopUp] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (Cookies.get("subscribed2newsletter") === undefined) {
      let visits = Cookies.get("newsletterVisits");
      if (visits === undefined) {
        Cookies.set("newsletterVisits", "0", { expires: 365 });
      } else {
        visits = parseInt(visits) + 1;
        if (visits >= 5) {
          displayNewsletterPopup();
          Cookies.set("newsletterVisits", "0", { expires: 365 });
        } else {
          Cookies.set("newsletterVisits", visits.toString(), { expires: 365 });
        }
      }
    }
    if (Cookies.get("visited") === undefined) {
      setShowNewsletterPopUp(true);
      Cookies.set("visited", "true", { expires: 365 });
    }
  }, []);

  const subscribeToNewsletter = () => {
    Cookies.set("subscribed2newsletter", "true", { expires: 365 });
  };

  const displayNewsletterPopup = () => {
    setShowNewsletterPopUp(true);
  };

  const closeNewsletterPopup = () => {
    setShowNewsletterPopUp(false);
  };

  const removeCookies = () => {
    Cookies.remove("subscribed2newsletter");
    Cookies.remove("newsletterVisits");
    Cookies.remove("visited");
  };

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
        posts={posts}
        media={multimediaPosts}
        classifieds={classifieds.map(c => {
          return {
            category: {
              name: c._embedded["wp:term"][1][0].name,
              url: c._embedded["wp:term"][1][0].link
            },
            content: { name: c.content.rendered, url: c.link }
          };
        })}
        sponsoredLinks={sponsored.replace("null", "")}
      />
      {showNewsletterPopUp ? (
        <EmailPopUp
          sub2Newsletter={subscribeToNewsletter}
          close={closeNewsletterPopup}
        />
      ) : null}
    </>
  );
}

Index.getInitialProps = async (context) => {
    const posts = {};
    const fetchPromises = [
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${aTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${bTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c1TAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c2TAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${dTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${eTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${gTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${m1TAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${f1TAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${f2TAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${iTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${jTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${kTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${lTAGID}&${Config.articleCardFields}`
      ),
      fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${hTAGID}&${Config.articleCardFields}`
      ),
      fetch(`${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`),
      fetch(`${Config.apiUrl}/wp-json/db/v1/links`)
    ];
    const fetchResults = await Promise.allSettled(fetchPromises);
    const [
      aStoryRes,
      bStoryRes,
      c1StoryRes,
      c2StoryRes,
      dStoryRes,
      eStoryRes,
      gStoryRes,
      mmStoryRes,
      f1StoryRes,
      f2StoryRes,
      iStoryRes,
      jStoryRes,
      kStoryRes,
      lStoryRes,
      hStoryRes,
      classifiedsRes,
      sponsoredRes
    ] = fetchResults.map(res => res.value);

    posts.aStory = await aStoryRes.json();
    posts.bStory = await bStoryRes.json();
    posts.c1Story = await c1StoryRes.json();
    posts.c2Story = await c2StoryRes.json();
    posts.dStory = await dStoryRes.json();
    posts.eStory = await eStoryRes.json();
    posts.gStory = await gStoryRes.json();
    const multimediaPosts = await mmStoryRes.json();
    posts.f1Story = await f1StoryRes.json();
    posts.f2Story = await f2StoryRes.json();
    posts.iStory = await iStoryRes.json();
    posts.jStory = await jStoryRes.json();
    posts.kStory = await kStoryRes.json();
    posts.lStory = await lStoryRes.json();
    posts.hStory = await hStoryRes.json();
    const classifieds = await classifiedsRes.json();
    const sponsored = await sponsoredRes.text();

    // Filter posts necessary keys (reduces data sent to user's browser)

    // ** Note to future devs: trying to filter using the wp fetch _fields="..." causes
    // stale data to be displayed, likely due to caching, so post-processing is required
    for (let [key, value] of Object.entries(posts)) {
      for (var i=0; i<value.length; i++)
      {
        // Reduce _embedded to necessary data
        let filtered_embedded = {
          'wp:featuredmedia': value[i]._embedded['wp:featuredmedia'],
          'wp:term': value[i]._embedded['wp:term']
        }

        // Filter featured media
        for (var j=0; j<filtered_embedded["wp:featuredmedia"].length; j++)
        {
          filtered_embedded["wp:featuredmedia"][j] = { 
            data: filtered_embedded["wp:featuredmedia"][j].data,
            source_url: filtered_embedded["wp:featuredmedia"][j].source_url,
            caption: filtered_embedded["wp:featuredmedia"][j].caption
          };
        }

        // Filter wp:term (2D array)
        for (var t=0; t<filtered_embedded["wp:term"].length; t++)
        {
          for (var cat=0; cat<filtered_embedded["wp:term"][t].length; cat++) 
          {
            filtered_embedded["wp:term"][t][cat] = {
              id: filtered_embedded["wp:term"][t][cat].id,
              link: filtered_embedded["wp:term"][t][cat].link,
              name: filtered_embedded["wp:term"][t][cat].name,
              slug: filtered_embedded["wp:term"][t][cat].slug,
            }
          }
        }

        value[i] = {
          id: value[i].id,
          date: value[i].date,
          link: value[i].link,
          slug: value[i].slug,
          title: value[i].title,
          coauthors: value[i].coauthors,
          categories: value[i].categories,
          excerpt: value[i].excerpt,
          _links: value[i]._links,
          tags: value[i].tags,
          acf: value[i].acf,
          _embedded: filtered_embedded
        };
      }
    }

    // Filter multimediaPosts to necessary data
    for (var i=0; i<multimediaPosts.length; i++) {
      let filtered_embedded = {
        'wp:featuredmedia': multimediaPosts[i]._embedded["wp:featuredmedia"]
      }
      
      // Filter featured media
      for (var j=0; j<filtered_embedded["wp:featuredmedia"].length; j++)
      {
        filtered_embedded["wp:featuredmedia"][j] = { 
          source_url: filtered_embedded["wp:featuredmedia"][j].source_url
        };
      }
      
      multimediaPosts[i] = {
        id: multimediaPosts[i].id,
        title: multimediaPosts[i].title,
        link: multimediaPosts[i].link,
        _embedded: filtered_embedded
      }
    }

    return { posts, multimediaPosts, classifieds, sponsored };
};

export default PageWrapper(Index, { isFrontPage: true });
