/**
 * Article/utilities.jsx
 *
 * Helper functions used by the Article component for rendering
 * categories, author bylines, and resolving author avatar URLs.
 */

/**
 * Renders an array of category objects as comma-separated links.
 *
 * @param {Array<{slug: string, name: string}>} cats - WordPress category term objects.
 * @returns {JSX.Element[]} Array of anchor + heading elements.
 *
 * @example
 *   renderCategories([{ slug: "news", name: "News" }])
 *   // → [<a href="/category/news"><h2>News</h2></a>]
 */
export function renderCategories(cats) {
  if (!Array.isArray(cats)) return [];

  return cats.reduce((acc, cat, index) => {
    if (index > 0) {
      acc.push(<span key={`sep-${index}`}>, </span>);
    }
    acc.push(
      <a key={`cat-${cat?.slug ?? index}`} href={`/category/${cat?.slug ?? ""}`}>
        <h2 dangerouslySetInnerHTML={{ __html: cat?.name ?? "" }} />
      </a>
    );
    return acc;
  }, []);
}

/**
 * Renders an array of author objects as a grammatically correct byline
 * (e.g. "Author A", "Author A and Author B", "Author A, Author B, and Author C").
 *
 * @param {Array<{slug: string, name: string}>} authors - WordPress user objects.
 * @returns {JSX.Element | JSX.Element[]} Rendered byline elements.
 *
 * @example
 *   renderAuthors([{ slug: "john", name: "John" }, { slug: "jane", name: "Jane" }])
 *   // → "John and Jane" (as JSX)
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
        key={`author-${authors[i]?.slug ?? i}`}
        href={`/author/${authors[i]?.slug ?? ""}`}
        dangerouslySetInnerHTML={{ __html: authors[i]?.name ?? "" }}
      />
    );
  }
  return result;
}

/**
 * Resolves the best available avatar image URL for a WordPress author object.
 * Prefers the `simple_local_avatar.full` field; falls back to `avatar_urls[512]`.
 *
 * @param {Object} author - WordPress user object.
 * @returns {string} URL string for the author's avatar image.
 *
 * @example
 *   getAuthorImage({ simple_local_avatar: { full: "/img.jpg" } })
 *   // → "/img.jpg"
 */
export function getAuthorImage(author) {
  if (!author) return "";
  if (author.simple_local_avatar != null) {
    return author.simple_local_avatar.full;
  }
  return author.avatar_urls?.[512] ?? "";
}

/**
 * Determines whether an article headline should render in italic style
 * based on its ACF (Advanced Custom Fields) metadata.
 *
 * Rules:
 *   - Columns are always italic.
 *   - If the `db_display_options` array starts with "italic_headline", it's italic.
 *
 * @param {Object} acf - The article's ACF object.
 * @returns {"italic" | "normal"} CSS font-style value.
 *
 * @example
 *   getHeadlineStyle({ db_article_format: "column" }) // → "italic"
 *   getHeadlineStyle({ db_display_options: ["italic_headline"] }) // → "italic"
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
