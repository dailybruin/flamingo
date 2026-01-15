import { Config } from "../config";
import { safeJsonParse, fetchWithTimeout } from "./fetchHelpers";

/*
 * Masthead categories are critical, so this will throw
 * if no masthead categories are found.
 */
export async function fetchMastheadCategories() {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/menus/v1/menus/masthead`
  );
  const data = await safeJsonParse(res);

  if (!data?.items?.length) {
    throw new Error("No masthead categories found");
  }

  const mapped = data.items.map(item => ({
    name: item.title,
    href: item.url,
    as: item.url
  }));

  // Insert Games tab at index 15
  mapped.splice(15, 0, {
    name: "Games",
    href: "/category/games",
    as: "/category/games"
  });

  return mapped;
}

/*
 * Breaking stories are critical, so this will throw if
 * fetchWithTimeout throws.
 */
export async function fetchLatestBreakingStory() {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/menus/v1/menus/breaking`
  );
  const data = await safeJsonParse(res);

  if (!data?.items?.length) {
    // Don't throw; we may just have no breaking posts
    return null;
  }

  return {
    name: data.items[0].title,
    href: data.items[0].url
  };
}

/*
 * This is non-critical, so we don't want this to throw.
 * If a fetch fails to get in-the-news, we just act like
 * there was no in the news to begin with.
 */
export async function fetchInTheNews() {
  try {
    // Wrap the fetch in a try/catch
    const res = await fetchWithTimeout(
      `${Config.apiUrl}/wp-json/menus/v1/menus/in-the-news`
    );
    const data = await safeJsonParse(res);

    if (!data?.items?.length) return null;

    return data.items.map(item => ({
      name: item.title,
      href: item.url,
      as: item.url
    }));
  } catch (error) {
    // Log the error but return null so the page can still build
    console.error("Non-critical fetch failed: In The News", error.message);
    return null;
  }
}

/*
 * Fetch all shared data that a page needs to load
 * header information.
 *
 * If we can't fetch masthead categories or the
 * latest breaking story, throw (should serve old content)
 */
export async function fetchSharedData() {
  const [categories, breaking, itn] = await Promise.all([
    fetchMastheadCategories(),
    fetchLatestBreakingStory(),
    fetchInTheNews()
  ]);

  return {
    mappedCategories: categories,
    mappedBreaking: breaking,
    mappedITN: itn
  };
}
