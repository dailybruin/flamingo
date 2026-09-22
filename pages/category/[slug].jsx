import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Error from "next/error";
import Head from "next/head";

import {
  fetchCategoryWithSlug,
  fetchPostsFromCategoryId,
  fetchSubcategoriesForCategoryId,
  fetchClassifieds
} from "../../lib/fetchWordPress";

import SectionHeader from "../../components/SectionHeader";
import CategoryLayout from "../../layouts/Category";
import MultimediaLayout from "../../layouts/Multimedia";

import {
  PRIME_CATEGORY_SLUG,
  PRIME_ARCHIVE_LIVE
} from "../../lib/primeArchive";

// Categories that use MultimediaLayout instead of CategoryLayout
const MULTIMEDIA_CATEGORIES = ["graphics", "illo", "cartoons"];

const COLUMN_SERIES_FEATURE_FLAG = false;

const categoryDescriptions = {
  quad: {
    desktop:
      "The Quad is the Daily Bruin's explanatory journalism section, which aims to break down salient topics \
    to make them digestible for UCLA's student body and community at large. Our in-depth reporting incorporates the \
    broader context of these topics to give a more comprehensive view on financial, lifestyle and academic discussions.",
    mobile:
      "The Quad is an explanatory journalism hub which contextualizes current events for readers, \
    with stories ranging from cultural trends to the interrogation of sociopolitical issues."
  },
  "press-release": {
    desktop:
      "The Daily Bruin announces news relevant to the organization as press releases. \
      For more information about The Bruin, contact <a href='mailto:dboutreach@dailybruin.com'>dboutreach@dailybruin.com</a>",
    mobile:
      "The Daily Bruin announces news relevant to the organization as press releases. \
      For more information about The Bruin, contact <a href='mailto:dboutreach@dailybruin.com'>dboutreach@dailybruin.com</a>"
  },
  /*
   * Davis Hoffman's wording, verbatim (Slack, 2026-09-10): he asked for
   * "something simple" under the logo in place of the condensed mission
   * statement that was here before. Short enough that desktop and mobile take
   * the same string -- SectionHeader still renders two copies and hides one per
   * breakpoint, so both keys have to be set.
   */
  prime: {
    desktop: "Narrative journalism from the Daily Bruin",
    mobile: "Narrative journalism from the Daily Bruin"
  },
  "the-stack": {
    desktop:
      "The Stack is the Daily Bruin's data journalism section. We investigate public data, create \
      engaging visualizations and apply quantitative insights to topics relevant to our UCLA community.",
    mobile:
      "The Stack is the Daily Bruin's data journalism section. We investigate public data, create \
      engaging visualizations and apply quantitative insights to topics relevant to our UCLA community."
  }
};

/*
 * These descriptions don't show up on the page;
 * Only for the descriptions that show up on Google searches.
 */
const categoryMetaDescriptions = {
  "sponsored":
      "Sponsored is an advertisement page managed by the Bruin Media Group. Increase visibility and traffic to your company's brand or products through the Daily Bruin website. Grow your business online with Sponsored to bring in new customers."
};

function Category({
  category,
  subcategories,
  posts,
  classifieds,
  primeLatest
}) {
  if (
    category == undefined ||
    category.data != undefined ||
    category.length == 0
  ) {
    return <Error statusCode={404} />;
  }
  const sectionLinks = subcategories.map(index => {
    const subsubcategoriesSimple = index.subsubcategories.map(index => {
      return { name: index.name, link: `/category/${index.slug}` };
    });
    return {
      name: index.name,
      link: `/category/${index.slug}`,
      subsubcategories: subsubcategoriesSimple
    };
  });

  // Fetch meta description from categoryMetaDescriptions
  let metaDescription = null;
  try {
    const slug = category[0].slug;
    if (categoryMetaDescriptions && categoryMetaDescriptions[slug]) {
      metaDescription = categoryMetaDescriptions[slug];
    }
  } catch (e) {
    metaDescription = null;
  }

  let pageTitle = category[0].name + " - Daily Bruin"
  const isMultimediaCategory = MULTIMEDIA_CATEGORIES.includes(category[0].slug);

  /* The archive card and "The Latest" both link into /prime/*, so they stay
   * hidden until that route actually serves. See PRIME_ARCHIVE_LIVE. */
  const isPrimeCategory =
    PRIME_ARCHIVE_LIVE && category[0].slug === PRIME_CATEGORY_SLUG;

  /* Fetch sidebar details, if there are any */
  const sidebarGraphic = category?.[0]?.acf?.enable_sidebar_graphic
    ? {
        imageUrl: category[0].acf.sidebar_graphic_link,
        link: category[0].acf.click_through_link
      }
    : null;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        <meta itemProp="name" content={pageTitle}></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:title" content={pageTitle}></meta>
        <meta name="twitter:title" content={pageTitle}></meta>

        {metaDescription && (
          <>
            <meta name="description" content={metaDescription} />
            <meta itemProp="description" content={metaDescription} />
            <meta property="og:description" content={metaDescription} />
            <meta name="twitter:description" content={metaDescription} />
          </>
        )}
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader
          category={category[0].name}
          description={categoryDescriptions[category[0].slug]}
          subcategories={sectionLinks}
        />
      </div>
      {isMultimediaCategory ? (
        <MultimediaLayout
          posts={posts}
          categoryID={category[0].id}
        />
      ) : (
        <CategoryLayout
          posts={posts}
          categoryID={category[0].id}
          sidebarGraphic={sidebarGraphic}
          primeLatest={primeLatest}
          showPrimeArchiveCard={isPrimeCategory}
          classifieds={classifieds.map(c => {
            return {
              category: {
                name: c._embedded["wp:term"][1][0].name,
                url: c._embedded["wp:term"][1][0].link
              },
              content: { name: c.content.rendered, url: c.link }
            };
          })}
        />
      )}
    </>
  );
}

Category.getInitialProps = async (context) => {
  const { slug } = context.query;
  if (slug == "breaking") {
    return { category: undefined };
  }

  const category = await fetchCategoryWithSlug(slug);
  if (category.length === 0) {
    return { category };
  }

  if (MULTIMEDIA_CATEGORIES.includes(slug)) {
    const posts = await fetchPostsFromCategoryId(category[0].id);
    return { category, subcategories: [], posts, classifieds: [] };
  }

  const [subcategoriesResult, postsResult, classifiedsResult] = await Promise.allSettled([
    fetchSubcategoriesForCategoryId(category[0].id),
    fetchPostsFromCategoryId(category[0].id),
    fetchClassifieds()
  ]);

  if (subcategoriesResult.status === "rejected") {
    console.error("Critical fetch failed: subcategories", subcategoriesResult.reason);
    throw subcategoriesResult.reason;
  }
  if (postsResult.status === "rejected") {
    console.error("Critical fetch failed: category posts", postsResult.reason);
    throw postsResult.reason;
  }
  if (classifiedsResult.status === "rejected") {
    console.error("Non-critical fetch failed: classifieds", classifiedsResult.reason);
  }

  const subcategories = subcategoriesResult.value;
  const posts = postsResult.value;
  const classifieds = classifiedsResult.status === "fulfilled" ? classifiedsResult.value : [];

  for (let i = 0; i < subcategories.length; i++) {
    subcategories[i].subsubcategories = [];
  }

  if (slug === "opinion") {
    const columnsIndex = subcategories.findIndex(
      sub => sub.slug === "opinion-columns"
    );
    const columnSeriesIndex = subcategories.findIndex(
      sub => sub.slug === "opinion-column-series"
    );
    if (columnsIndex >= 0 && columnSeriesIndex >= 0) {
      const temp = subcategories[columnsIndex];
      subcategories[columnsIndex] = subcategories[columnSeriesIndex];
      subcategories[columnSeriesIndex] = temp;
    }
    if (!COLUMN_SERIES_FEATURE_FLAG) {
      subcategories.pop();
    }
  }

  /*
   * Picked here rather than during render: getInitialProps runs on the server for
   * the first hit, so the browser hydrates against the same pair. Picking in the
   * component would read the clock on both sides, and a pod on UTC is in a
   * different ISO week than a reader in Los Angeles for a few hours each Sunday
   * night.
   *
   * Imported lazily so the ~130 KB of archive data is code-split into its own
   * chunk. A static import would put it in the shared category bundle and make
   * every News and Sports reader download PRIME's archive.
   */
  let primeLatest = [];
  if (PRIME_ARCHIVE_LIVE && slug === PRIME_CATEGORY_SLUG) {
    const { getWeeklyPicks } = await import("../../lib/primeArchivePool");
    primeLatest = getWeeklyPicks(2);
  }

  return { category, subcategories, posts, classifieds, primeLatest };
};

export default PageWrapper(Category);
