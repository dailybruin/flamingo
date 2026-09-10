/*
 * The frozen PRIME archive -- constants and the URL rule.
 *
 * PRIME used to live on prime.dailybruin.com, a separate Gatsby app on S3. Those
 * 235 stories are now served from dailybruin.com/prime by a Cloudflare Worker and
 * the archive is closed -- new PRIME stories are published to WordPress and show
 * up in this category on their own.
 *
 * Deliberately imports nothing. The story data is ~160 KB and lives in
 * lib/primeArchivePool.js, which is loaded lazily; pulling it in here would put
 * it in the client bundle for every category page, so News and Sports readers
 * would download PRIME's archive. Components import this file, never the pool.
 */

export const PRIME_CATEGORY_SLUG = "prime";

/*
 * Off until dailybruin.com/prime/* actually serves. Until the S3 upload and the
 * Cloudflare Worker routes are done, every archive link 404s, so the sidebar and
 * the archive card stay hidden. Flipping this to true is the whole launch.
 */
export const PRIME_ARCHIVE_LIVE = false;

export const PRIME_ARCHIVE_ROOT = "/prime";

/* The archive is frozen, so this never changes. Asserted against the generated
 * data in lib/primeArchivePool.js. */
export const PRIME_ARCHIVE_COUNT = 235;

/*
 * Archive URLs are the original slug with the dots taken out -- "prime.foxpresents"
 * became /prime/primefoxpresents when Gatsby built the site.
 *
 * Case matters ("Prime.olympics" -> /Primeolympics) and four slugs contain "&".
 * Both are preserved verbatim: the redirect from the old subdomain is one wildcard
 * rule, and it only holds while the slugs are untouched. Don't "tidy" these.
 */
export function archiveUrl(article) {
  if (!article) return PRIME_ARCHIVE_ROOT;
  const path = article.path || String(article.slug || "").replace(/\./g, "");
  return `${PRIME_ARCHIVE_ROOT}/${path}`;
}
