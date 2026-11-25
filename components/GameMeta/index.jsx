import Head from "next/head";

const SITE = "https://dailybruin.com";

// Title and link-preview tags for a game page.
//
// Without og:image, iMessage, Slack and the like pick the biggest image on
// the rendered page for the preview, and on these pages that is the
// Broadstreet banner ad. Naming the game's logo here keeps the ads out of
// shared links.
//
// `logo` is a statically imported image (`import Logo from "./x.png"`), whose
// `src` is a hashed path under /_next/static. Preview crawlers need a full
// URL, so the site is prepended.
//
// `path` is the page's address for og:url. Leave it out for pages whose
// address carries state (the news quiz's ?slug=), so a shared link to one
// quiz isn't folded into the plain quiz page.
export default function GameMeta({ title, description, logo, path }) {
  const fullTitle = `${title} - Daily Bruin`;
  const image = `${SITE}${logo.src}`;
  const alt = `${title} logo`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Daily Bruin" />
      <meta property="og:locale" content="en_US" />
      {path && <meta property="og:url" content={`${SITE}${path}`} />}
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content={String(logo.width)} />
      <meta property="og:image:height" content={String(logo.height)} />
      <meta property="og:image:alt" content={alt} />

      {/* The logos are portrait, which summary_large_image would crop. */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@dailybruin" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={alt} />
    </Head>
  );
}
