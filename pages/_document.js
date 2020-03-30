import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicons/apple-touch-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicons/apple-touch-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicons/apple-touch-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicons/apple-touch-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicons/apple-touch-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicons/apple-touch-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicons/apple-touch-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-194x194.png"
            sizes="194x194"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/android-chrome-192x192.png"
            sizes="192x192"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicons/favicon-16x16.png"
            sizes="16x16"
          />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta
            name="msapplication-TileImage"
            content="/favicons/mstile-144x144.png"
          />
          <meta name="theme-color" content="#0080c6" />
          <link
            rel="apple-touch-icon"
            href="/apple-touch-icon-precomposed.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/apple-touch-icon-72x72-precomposed.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/apple-touch-icon-114x114-precomposed.png"
          />

          {/* Default OpenGraph/Twitter Meta */}
          <title>Daily Bruin - Since 1919</title>
          <meta
            name="description"
            content="the all new redesigned dailybruin.com"
          />
          <link rel="canonical" href="https://new.dailybruin.com/" />
          <meta
            property="og:image"
            content="https://dailybruin.com/images/2017/03/db-logo.png"
          />
          <meta
            property="twitter:image"
            content="https://dailybruin.com/images/2017/03/db-logo.png"
          />
          <meta property="og:url" content="https://new.dailybruin.com" />
          <meta property="og:title" content="The Daily Bruin" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Daily Bruin" />
          <meta
            property="og:description"
            content="the all new redesigned dailybruin.com"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="fb:pages" content="47311244274" />

          <meta name="twitter:title" content="Daily Bruin - Since 2020" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@dailybruin" />
          <meta name="twitter:creator" content="@dailybruin" />
          <meta
            name="twitter:description"
            content="the all new redesigned dailybruin.com"
          />
          <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />

          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Playfair+Display:wght@700&family=Source+Sans+Pro:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-28181852-29"
          ></script>
          {/* Broadstreet Ads */}
          <script src="https://cdn.broadstreetads.com/init-2.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
