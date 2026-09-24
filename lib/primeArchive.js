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
 * dailybruin.com/prime/* is serving. A Cloudflare Worker proxies the archive
 * out of the PRIME S3 bucket, on both the apex and www; verified 2026-09-23
 * returning ~1,900 words per article with canonicals that resolve.
 *
 * Kept as a kill switch rather than removed. If the Worker or its routes ever
 * break, setting this to false hides the archive card and the rail entry, so
 * readers see no PRIME section rather than a page of links into 404s -- a
 * deploy away, with no need to unpick the layout.
 */
export const PRIME_ARCHIVE_LIVE = true;

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
