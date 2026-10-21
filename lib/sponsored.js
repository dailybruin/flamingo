// Sponsored posts are served at /sponsored/<slug>, not their date URL.
export const SPONSORED_CATEGORY_ID = 23087;

export function isSponsored(post) {
  return Boolean(
    post && post.categories && post.categories.includes(SPONSORED_CATEGORY_ID)
  );
}

// Returns the post with its link pointed at /sponsored/<slug>. Posts that are
// not sponsored are returned unchanged.
export function withSponsoredLink(post) {
  if (!isSponsored(post) || !post.slug) {
    return post;
  }
  return { ...post, link: `/sponsored/${post.slug}` };
}
