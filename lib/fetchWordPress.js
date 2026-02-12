import { Config } from "../config";
import { safeJsonArray, fetchWithTimeout } from "./fetchHelpers";

/*
 * Fetch a category by slug from the WordPress API.
 * Returns array of category objects, or [] if not found/error.
 */
export async function fetchCategoryWithSlug(slug) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/categories?slug=${slug}`
  );
  return safeJsonArray(res);
}

/*
 * Fetch posts for a category ID.
 * Returns array of posts (with _embed).
 */
export async function fetchPostsFromCategoryId(categoryId) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${categoryId}`
  );
  return safeJsonArray(res);
}

/*
 * Fetch posts for a category ID with pagination (for infinite scroll).
 */
export async function fetchPostsFromCategoryIdPaginated(categoryId, page = 1) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${categoryId}&page=${page}`
  );
  return safeJsonArray(res);
}

/*
 * Fetch subcategories (children) for a category ID.
 * Returns array of category objects.
 */
export async function fetchSubcategoriesForCategoryId(categoryId) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${categoryId}&per_page=100`
  );
  return safeJsonArray(res);
}

/*
 * Fetch featured classifieds.
 * Used across category, tag, and author pages.
 */
export async function fetchClassifieds() {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/classifieds?_embed&Featured=3`
  );
  return safeJsonArray(res);
}

/*
 * Fetch a tag by slug from the WordPress API.
 * Returns array of tag objects, or [] if not found/error.
 */
export async function fetchTagWithSlug(slug) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`
  );
  return safeJsonArray(res);
}

/*
 * Fetch posts for a tag ID.
 */
export async function fetchPostsFromTagId(tagId) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&tags=${tagId}`
  );
  return safeJsonArray(res);
}

/*
 * Fetch an author/user by slug from the WordPress API.
 * Returns array of user objects, or [] if not found/error.
 */
export async function fetchAuthorWithSlug(slug) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/users?slug=${slug}`
  );
  return safeJsonArray(res);
}

/*
 * Fetch posts by author slug.
 * categories_exclude removes breaking feed posts (27179, 27127).
 * Uses 20s timeout - author posts require scanning most of the WP database.
 */
export async function fetchPostsFromAuthorSlug(slug) {
  const res = await fetchWithTimeout(
    `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&filter[author_name]=${slug}&categories_exclude=27179,27127`,
    20000
  );
  return safeJsonArray(res);
}
