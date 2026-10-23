import { NEWS_QUIZ } from "config.js";

export const NEWS_QUIZ_PATH = "/category/games/quiz";

// Same rule the quiz backend applies to a slug. Anything else is dropped
// rather than passed into the iframe's address.
const SLUG = /^[\p{L}\p{N}_%-]{1,200}$/u;

export function validQuizSlug(value) {
  return typeof value === "string" && SLUG.test(value) ? value : "";
}

// Keyed on the tag, not on the quiz text field: that ACF field carries a
// default value, so ordinary articles can have it filled in too.
export function isNewsQuiz(post) {
  return Boolean(post && Array.isArray(post.tags) && post.tags.includes(NEWS_QUIZ.tagId));
}

// The games page, opened on one quiz or on the list of them.
export function newsQuizPagePath({ slug = "", archive = false } = {}) {
  if (archive) return `${NEWS_QUIZ_PATH}?view=archive`;
  const valid = validQuizSlug(slug);
  return valid ? `${NEWS_QUIZ_PATH}?slug=${valid}` : NEWS_QUIZ_PATH;
}

// A quiz post has no body (the questions live in a custom field), so its
// article page would be a headline over nothing. Send readers to the game.
// On the server that's a 302; on a client-side navigation getInitialProps
// has no response to write to, so the page does a router replace with the
// path returned here.
export function redirectToNewsQuiz(context, post) {
  const location = newsQuizPagePath({ slug: post.slug });
  if (context.res) {
    context.res.writeHead(302, { Location: location });
    context.res.end();
  }
  return { newsQuizRedirect: location };
}
