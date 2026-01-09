import React, { useState, useEffect } from "react";
import PageWrapper from "../layouts/PageWrapper";
import Error from "next/error";
import { Config } from "../config.js";
import Head from "next/head";

import HomeLayout from "../layouts/Home";
import Cookies from "js-cookie";
import EmailPopUp from "../components/EmailSignUp";

const aTAGID = 4847;    // Db-story-a
const bTAGID = 4850;    // Db-story-b
const c1TAGID = 4849;   // Db-story-c1
const c2TAGID = 4851;   // Db-story-c2
const d1TAGID = 4862;   // Db-story-d1
const d2TAGID = 4863;   // Db-story-d2
const m1TAGID = 4854;   // Db-story-m1
const f1TAGID = 22896;  // Db-story-f1
const f2TAGID = 22897;  // Db-story-f2

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
        classifieds={(classifieds || []).map(c => {
          try {
            return {
              category: {
                name: c._embedded?.["wp:term"]?.[1]?.[0]?.name || "Classified",
                url: c._embedded?.["wp:term"]?.[1]?.[0]?.link || "#"
              },
              content: { name: c.content?.rendered || "", url: c.link || "#" }
            };
          } catch (error) {
            console.error('Error processing classified:', error);
            return null;
          }
        }).filter(Boolean)}
        sponsoredLinks={typeof sponsored === 'string' ? sponsored.replace("null", "") : ""}
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

// Helper function to safely parse JSON responses
const safeJsonParse = async (response) => {
  // 1. If response is null, the fetch failed entirely (e.g. timeout)
  // The error was already logged in the map function below, so we return empty safely.
  if (!response) {
    return [];
  }

  // 2. If response exists but is an HTTP error (e.g. 404, 500)
  if (!response.ok) {
    // We can now access response.url because response is not null
    console.error(`API Error: ${response.status} ${response.statusText} at ${response.url}`);
    return [];
  }

  try {
    const text = await response.text();
    // Check if response is HTML instead of JSON
    if (text.trim().startsWith('<')) {
      console.error(`Received HTML instead of JSON from ${response.url}`);
      return [];
    }
    return JSON.parse(text);
  } catch (error) {
    console.error(`Failed to parse API response from ${response.url}:`, error);
    return [];
  }
};

// Add timeout to fetch requests to prevent hanging
const fetchWithTimeout = async (url, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, { signal: controller.signal });
  } catch (error) {
    if (error.name === 'AbortError') {
      const err = new Error(`Fetch timed out after ${timeout}ms: ${url}`);
      err.cause = error;
      throw err;
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
};

Index.getInitialProps = async (context) => {
  // Wrap entire function in try-catch to ensure page renders even if all API calls fail
  try {
    const posts = {};
    
    const fetchPromises = [
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${aTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${bTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c1TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${c2TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${d1TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${d2TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${gTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${m1TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${f1TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${f2TAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${iTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${jTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${kTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${lTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${hTAGID}&${Config.articleCardFields}`
      ),
      fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`),
      fetchWithTimeout(`${Config.apiUrl}/wp-json/db/v1/links`)
    ];
    
    const fetchResults = await Promise.allSettled(fetchPromises);
    const [
      aStoryRes,
      bStoryRes,
      c1StoryRes,
      c2StoryRes,
      d1StoryRes,
      d2StoryRes,
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
    ] = fetchResults.map((res, index) => {
      if (res.status === 'fulfilled') {
        return res.value;
      } else {
        // Log the descriptive error (which includes the URL) from fetchWithTimeout
        console.error(`Request #${index} failed:`, res.reason);
        return null;
      }
    });

    // Safely parse each response with fallback to empty array
    posts.aStory = await safeJsonParse(aStoryRes);
    posts.bStory = await safeJsonParse(bStoryRes);
    posts.c1Story = await safeJsonParse(c1StoryRes);
    posts.c2Story = await safeJsonParse(c2StoryRes);
    posts.d1Story = await safeJsonParse(d1StoryRes);
    posts.d2Story = await safeJsonParse(d2StoryRes);
    posts.gStory = await safeJsonParse(gStoryRes);
    const multimediaPosts = await safeJsonParse(mmStoryRes);
    posts.f1Story = await safeJsonParse(f1StoryRes);
    posts.f2Story = await safeJsonParse(f2StoryRes);
    posts.iStory = await safeJsonParse(iStoryRes);
    posts.jStory = await safeJsonParse(jStoryRes);
    posts.kStory = await safeJsonParse(kStoryRes);
    posts.lStory = await safeJsonParse(lStoryRes);
    posts.hStory = await safeJsonParse(hStoryRes);
    const classifieds = await safeJsonParse(classifiedsRes);
    
    let sponsored = '';
    try {
      if (sponsoredRes && sponsoredRes.ok) {
        sponsored = await sponsoredRes.text();
      }
    } catch (error) {
      console.error('Failed to fetch sponsored links:', error);
    }

    // Filter posts necessary keys (reduces data sent to user's browser)

    // ** Note to future devs: trying to filter using the wp fetch _fields="..." causes
    // stale data to be displayed, likely due to caching, so post-processing is required
    for (let [key, value] of Object.entries(posts)) {
      if (!Array.isArray(value) || value.length === 0) {
        posts[key] = [];
        continue;
      }

      for (var i=0; i<value.length; i++)
      {
        try {
          // Reduce _embedded to necessary data
          let filtered_embedded = {
            'wp:featuredmedia': value[i]._embedded?.['wp:featuredmedia'] || [],
            'wp:term': value[i]._embedded?.['wp:term'] || []
          }

          // Filter featured media
          if (Array.isArray(filtered_embedded["wp:featuredmedia"])) {
            for (var j=0; j<filtered_embedded["wp:featuredmedia"].length; j++)
            {
              filtered_embedded["wp:featuredmedia"][j] = { 
                data: filtered_embedded["wp:featuredmedia"][j]?.data,
                source_url: filtered_embedded["wp:featuredmedia"][j]?.source_url,
                caption: filtered_embedded["wp:featuredmedia"][j]?.caption
              };
            }
          }

          // Filter wp:term (2D array)
          if (Array.isArray(filtered_embedded["wp:term"])) {
            for (var t=0; t<filtered_embedded["wp:term"].length; t++)
            {
              if (Array.isArray(filtered_embedded["wp:term"][t])) {
                for (var cat=0; cat<filtered_embedded["wp:term"][t].length; cat++) 
                {
                  filtered_embedded["wp:term"][t][cat] = {
                    id: filtered_embedded["wp:term"][t][cat]?.id,
                    link: filtered_embedded["wp:term"][t][cat]?.link,
                    name: filtered_embedded["wp:term"][t][cat]?.name,
                    slug: filtered_embedded["wp:term"][t][cat]?.slug,
                  }
                }
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
        } catch (error) {
          console.error(`Error filtering post ${i} in ${key}:`, error);
        }
      }
    }

    // Filter multimediaPosts to necessary data
    if (Array.isArray(multimediaPosts)) {
      for (var i=0; i<multimediaPosts.length; i++) {
        try {
          let filtered_embedded = {
            'wp:featuredmedia': multimediaPosts[i]._embedded?.["wp:featuredmedia"] || []
          }
          
          // Filter featured media
          if (Array.isArray(filtered_embedded["wp:featuredmedia"])) {
            for (var j=0; j<filtered_embedded["wp:featuredmedia"].length; j++)
            {
              filtered_embedded["wp:featuredmedia"][j] = { 
                source_url: filtered_embedded["wp:featuredmedia"][j]?.source_url
              };
            }
          }
          
          multimediaPosts[i] = {
            id: multimediaPosts[i].id,
            title: multimediaPosts[i].title,
            link: multimediaPosts[i].link,
            _embedded: filtered_embedded
          }
        } catch (error) {
          console.error(`Error filtering multimedia post ${i}:`, error);
        }
      }
    }

    return { posts, multimediaPosts, classifieds, sponsored };
  } catch (error) {
    // If anything fails catastrophically, return empty data so page still renders
    console.error('getInitialProps failed completely:', error);
    return {
      posts: {
        aStory: [],
        bStory: [],
        c1Story: [],
        c2Story: [],
        d1Story: [],
        d2Story: [],
        gStory: [],
        f1Story: [],
        f2Story: [],
        iStory: [],
        jStory: [],
        kStory: [],
        lStory: [],
        hStory: []
      },
      multimediaPosts: [],
      classifieds: [],
      sponsored: ''
    };
  }
};

export default PageWrapper(Index, { isFrontPage: true });