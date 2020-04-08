import React from "react";
import App from "next/app";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  componentDidMount() {
    // if (typeof window !== "undefined") {
    //   // tslint:disable-next-line:no-var-requires
    //   const WebFontLoader = require("webfontloader");
    //   WebFontLoader.load({
    //     google: {
    //       families: [
    //         "Arimo:400",
    //         "Arimo:700",
    //         "PT Serif:400",
    //         "PT Serif:700",
    //         "Source Sans Pro:400",
    //         "Source Sans Pro:700",
    //         "Playfair Display:700"
    //       ]
    //     }
    //   });
    // }

    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "UA-28181852-29");

    // Broadstreet Ads
    window.broadstreet = window.broadstreet || { watch: function() {} };
    broadstreet.watch({ networkId: 5876 });

    /** Web fonts loaded here - only in a browser */
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
