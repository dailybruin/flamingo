import { Config, TAG_IDS } from "../config";
import { safeJsonArray, fetchWithTimeout } from "./fetchHelpers";

/* Filter the raw JSON data for embedded data */
function filterEmbeddedData(item) {
  if (!item) return { "wp:featuredmedia": [], "wp:term": [] };

  let filtered_embedded = {
    "wp:featuredmedia": item._embedded?.["wp:featuredmedia"] || [],
    "wp:term": item._embedded?.["wp:term"] || []
  };

  if (Array.isArray(filtered_embedded["wp:featuredmedia"])) {
    filtered_embedded["wp:featuredmedia"] = filtered_embedded[
      "wp:featuredmedia"
    ].map(media => {
      return {
        data: media?.data ?? null,
        source_url: media?.source_url ?? null,
        caption: media?.caption ?? null,
        media_details:
          media?.media_details && media.media_details.width && media.media_details.height
            ? {
                width: media.media_details.width,
                height: media.media_details.height
              }
            : null
      };
    });
  }

  if (Array.isArray(filtered_embedded["wp:term"])) {
    filtered_embedded["wp:term"] = filtered_embedded["wp:term"].map(termArray =>
      Array.isArray(termArray)
        ? termArray.map(term => ({
            id: term?.id ?? null,
            link: term?.link ?? null,
            name: term?.name ?? null,
            slug: term?.slug ?? null
          }))
        : []
    );
  }

  return filtered_embedded;
}

/* Filter logic specifically for multimedia posts */
function filterMultimediaData(post) {
  if (!post) return null;

  try {
    return {
      id: post.id,
      title: post.title,
      link: post.link,
      _embedded: {
        "wp:featuredmedia": (post._embedded?.["wp:featuredmedia"] || []).map(
          media => ({
            source_url: media?.source_url ?? null,
            media_details:
              media?.media_details && media.media_details.width && media.media_details.height
                ? {
                    width: media.media_details.width,
                    height: media.media_details.height
                  }
                : null
          })
        )
      }
    };
  } catch (err) {
    console.error(`Error filtering multimedia post ${post.id}:`, err);
    return null; // Return null so we can filter out broken entries
  }
}

/* Filter posts */
function filterPostsData(posts) {
  const result = {};

  for (const [key, value] of Object.entries(posts)) {
    if (!Array.isArray(value) || value.length === 0) {
      result[key] = [];
      continue;
    }

    result[key] = value.map(item => {
      try {
        const filtered_embedded = filterEmbeddedData(item);

        return {
          id: item.id ?? null,
          date: item.date ?? null,
          link: item.link ?? null,
          slug: item.slug ?? null,
          title: item.title ?? null,
          coauthors: item.coauthors ?? [],
          categories: item.categories ?? [],
          excerpt: item.excerpt ?? null,
          _links: item._links ?? null,
          tags: item.tags ?? [],
          acf: item.acf ?? null,
          _embedded: filtered_embedded
        };
      } catch (err) {
        console.error(`Error filtering post in ${key}:`, err);
        return item;
      }
    });
  }

  return result;
}

export async function fetchHomePageContent() {
  /* Fetch everything needed */
  const fetchPromises = [
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.aTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.bTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.c1TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.c2TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.d1TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.d2TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${TAG_IDS.gTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=6&tags=${TAG_IDS.m1TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.f1TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=1&tags=${TAG_IDS.f2TAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${TAG_IDS.iTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${TAG_IDS.jTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${TAG_IDS.kTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${TAG_IDS.lTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/posts?_embed&per_page=3&tags=${TAG_IDS.hTAGID}&${Config.articleCardFields}`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`),
    fetchWithTimeout(`${Config.apiUrl}/wp-json/db/v1/links`)
  ];

  const results = await Promise.allSettled(fetchPromises);

  const [
    aStoryRes, bStoryRes, c1StoryRes, c2StoryRes, d1StoryRes, d2StoryRes, gStoryRes, mmStoryRes,
    f1StoryRes, f2StoryRes, iStoryRes, jStoryRes, kStoryRes, lStoryRes, hStoryRes,
    classifiedsRes, sponsoredRes
  ] = results.map((res, i) => {
    if (res.status === "fulfilled" && res.value.ok) return res.value;

    console.error(`Request #${i} failed:`, res.reason || res.value?.statusText);
    return null;
  });

  const posts = {
    aStory: await safeJsonArray(aStoryRes),
    bStory: await safeJsonArray(bStoryRes),
    c1Story: await safeJsonArray(c1StoryRes),
    c2Story: await safeJsonArray(c2StoryRes),
    d1Story: await safeJsonArray(d1StoryRes),
    d2Story: await safeJsonArray(d2StoryRes),
    gStory: await safeJsonArray(gStoryRes),
    f1Story: await safeJsonArray(f1StoryRes),
    f2Story: await safeJsonArray(f2StoryRes),
    iStory: await safeJsonArray(iStoryRes),
    jStory: await safeJsonArray(jStoryRes),
    kStory: await safeJsonArray(kStoryRes),
    lStory: await safeJsonArray(lStoryRes),
    hStory: await safeJsonArray(hStoryRes)
  };

  /* * CRITICAL CHECK: 
   * Iterate over every editorial section. If ANY are missing, we abort.
   * This protects against partial failures (e.g. 500s on specific tags).
   * We would rather serve old articles rather than missing articles.
   */
  for (const [key, content] of Object.entries(posts)) {
    if (!content || content.length === 0) {
      throw new Error(`CRITICAL: '${key}' is missing. Aborting update to serve stale content.`);
    }
  }

  // Multimedia is also editorial, so we check it strictly too.
  const rawMultimediaPosts = await safeJsonArray(mmStoryRes);
  if (!rawMultimediaPosts || rawMultimediaPosts.length === 0) {
     throw new Error("CRITICAL: 'Multimedia' section is missing. Aborting update.");
  }
  
  const multimediaPosts = rawMultimediaPosts
    .map(filterMultimediaData)
    .filter(Boolean);

  // --- NON-CRITICAL SECTIONS BELOW ---
  // If these fail (return empty array), we proceed anyway.

  const classifieds = await safeJsonArray(classifiedsRes);

  let sponsored = "";
  try {
    if (sponsoredRes && sponsoredRes.ok) {
      sponsored = await sponsoredRes.text();
    }
  } catch (error) {
    console.error("Failed to fetch sponsored links (Non-Critical):", error);
  }

  const filteredPosts = filterPostsData(posts);

  return { posts: filteredPosts, multimediaPosts, classifieds, sponsored };
}