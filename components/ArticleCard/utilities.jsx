/**
 * ArticleCard/utilities.jsx
 *
 * Shared helper functions used by all ArticleCard variants.
 * These operate on the *coauthor* objects embedded in WordPress post responses
 * (i.e. they have `.user_nicename` and `.display_name` — NOT `.slug` / `.name`
 * like the full user objects used in Article/utilities.jsx).
 */

/**
 * Renders an array of coauthor objects as a grammatically correct byline
 * (e.g. "Author A", "Author A and Author B", "Author A, Author B, and Author C").
 *
 * Uses `user_nicename` for the URL slug and `display_name` for the visible label.
 *
 * @param {Array<{user_nicename: string, display_name: string}>} authors
 *   Coauthor objects from the WordPress `_embedded` response.
 * @returns {JSX.Element | JSX.Element[]} Rendered byline elements.
 *
 * @example
 *   renderAuthors([
 *     { user_nicename: "john-doe", display_name: "John Doe" },
 *     { user_nicename: "jane-doe", display_name: "Jane Doe" }
 *   ])
 *   // → "John Doe and Jane Doe" (as JSX)
 */
export function renderAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) {
    return <span>Daily Bruin Staff</span>;
  }

  const result = [];
  for (let i = 0; i < authors.length; i++) {
    if (i > 0 && authors.length > 2) {
      result.push(<span key={`comma-${i}`}>, </span>);
    }
    if (i === authors.length - 1 && authors.length > 1) {
      result.push(
        <span key={`and-${i}`}>{authors.length === 2 ? " " : ""}and </span>
      );
    }
    result.push(
      <a
        key={`author-${authors[i]?.user_nicename ?? i}`}
        href={`/author/${authors[i]?.user_nicename ?? ""}`}
      >
        {authors[i]?.display_name ?? ""}
      </a>
    );
  }
  return result;
}

/**
 * Determines whether an article headline should render in italic style
 * based on its ACF (Advanced Custom Fields) metadata.
 *
 * Rules:
 *   - Columns (`db_article_format === "column"`) are always italic.
 *   - If `db_display_options[0]` is "italic_headline", it's italic.
 *
 * @param {Object} acf - The article's ACF object.
 * @returns {"italic" | "normal"} CSS font-style value.
 *
 * @example
 *   getHeadlineStyle({ db_article_format: "column" }) // → "italic"
 *   getHeadlineStyle({}) // → "normal"
 */
export function getHeadlineStyle(acf) {
  if (!acf) return "normal";
  if (acf.db_article_format === "column") return "italic";
  if (
    Array.isArray(acf.db_display_options) &&
    acf.db_display_options[0] === "italic_headline"
  ) {
    return "italic";
  }
  return "normal";
}

/**
 * Formats the time elapsed between a post date and the current moment into a
 * human-readable string like "2 Days, 3 Hours, 15 Minutes Ago".
 *
 * @param {string | Date} postDate - ISO date string or Date object of the post.
 * @returns {string} Human-readable elapsed time string.
 *
 * @example
 *   formatTimeDiff("2025-01-01T00:00:00Z") // → "5 Days, 2 Hours, 30 Minutes Ago"
 */
export function formatTimeDiff(postDate) {
  const now = new Date();
  const post = new Date(postDate);
  const totalMinutes = Math.floor((now - post) / (1000 * 60));

  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  let result = "";
  if (days !== 0) {
    result += days + " Day" + (days !== 1 ? "s" : "") + ", ";
  }
  if (hours !== 0) {
    result += hours + " Hour" + (hours !== 1 ? "s" : "") + ", ";
  }
  result += minutes + " Minute" + (minutes !== 1 ? "s" : "") + " Ago";
  return result;
}

/**
 * Checks whether an image URL is the default Daily Bruin placeholder logo.
 * Used by Breaking and BreakingOverview to decide whether to render the image.
 *
 * @param {string} url - The image URL to check.
 * @returns {boolean} `true` if the URL is the default placeholder.
 *
 * @example
 *   isDefaultImage("http://wp.dailybruin.com/images/2017/03/db-logo.png") // → true
 *   isDefaultImage("https://example.com/photo.jpg") // → false
 */
export function isDefaultImage(url) {
  return url === "http://wp.dailybruin.com/images/2017/03/db-logo.png";
}
