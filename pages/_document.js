import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Preconnect critical origins for faster LCP */}
          <link rel="preconnect" href="https://wp.dailybruin.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://dailybruin.com" />
          <link rel="preconnect" href="https://secure.gravatar.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://gravatar.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://static.chartbeat.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://cdn.broadstreetads.com" crossOrigin="anonymous" />
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
          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,550;0,700;1,550;1,700&family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Source+Sans+Pro:wght@400;700&display=swap&family=DM+Serif+Text:ital@0;1&display=swap"
            rel="stylesheet"
          />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-28181852-28"
            strategy="afterInteractive"
          />

          {/* Chartbeat */}
          <Script
            src="//static.chartbeat.com/js/chartbeat_mab.js"
            strategy="afterInteractive"
          />

          {
          /* 
           * Broadstreet Ads
           * Note that this MUST be beforeInteractive.
           * Otherwise the ads may not load
           */
          }
          <Script
            src="https://cdn.broadstreetads.com/init-2.min.js"
            strategy="beforeInteractive"
          />
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
