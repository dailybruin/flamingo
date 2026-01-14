/**
 * @fileoverview API fetchers for layout-related WordPress menus.
 * These functions retrieve and transform WordPress menu data into
 * standardized objects used by the React frontend components.
 */

import { Config } from "../config";
import { safeJsonParse } from "./fetchHelpers";

/**
 * Fetches the primary navigation menu and injects a hard-coded Games category.
 *
 * @returns {Promise<Array<{name: string, href: string, as: string}>|null>}
 * Returns an array of menu items or null if the request fails or data is empty.
 */
export async function fetchMastheadCategories() {
  try {
    const res = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/masthead`);
    const data = await safeJsonParse(res);

    if (!data?.items?.length) return null;

    const mapped = data.items.map(item => ({
      name: item.title,
      href: item.url,
      as: item.url
    }));

    /* Manually insert Games tab in categories */
    mapped.splice(15, 0, {
      name: "Games",
      href: "/category/games",
      as: "/category/games"
    });

    return mapped;
  } catch (err) {
    console.error("fetchMastheadCategories failed:", err);
    return null;
  }
}

/**
 * Retrieves the most recent single item from the "Breaking News" menu.
 * @returns {Promise<{name: string, href: string}|null>}
 */
export async function fetchLatestBreakingStory() {
  try {
    const res = await fetch(`${Config.apiUrl}/wp-json/menus/v1/menus/breaking`);
    const data = await safeJsonParse(res);

    if (!data?.items?.length) return null;

    // Only returns the first item in the menu
    return {
      name: data.items[0].title,
      href: data.items[0].url
    };
  } catch (err) {
    console.error("fetchLatestBreakingStory failed:", err);
    return null;
  }
}

/**
 * Fetches the "In The News" trending menu items.
 * @returns {Promise<Array<{name: string, href: string, as: string}>|null>}
 */
export async function fetchInTheNews() {
  try {
    const res = await fetch(
      `${Config.apiUrl}/wp-json/menus/v1/menus/in-the-news`
    );
    const data = await safeJsonParse(res);

    if (!data?.items?.length) return null;

    return data.items.map(item => ({
      name: item.title,
      href: item.url,
      as: item.url
    }));
  } catch (err) {
    console.error("fetchInTheNews failed:", err);
    return null;
  }
}

/**
 * Aggregator function that fetches all page dependencies concurrently.
 * Most pages need the data fetched in this function.
 *
 * @returns {Promise<{
 * mappedCategories: Array|null,
 * mappedBreaking: Object|null,
 * mappedITN: Array|null
 * }>}
 */
export async function fetchSharedData() {
  // Promise.all executes these requests in parallel rather than sequence
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
