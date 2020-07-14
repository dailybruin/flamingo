import React from "react";
import App from "next/app";
import * as moment from "moment";

import style from "style.css";

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
    // Custom Date Formats
    moment.updateLocale("en", {
      monthsShort: [
        "Jan.",
        "Feb.",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec."
      ],
      meridiem: function(hour, minute, isLowerCase) {
        if (hour < 12) {
          return "a.m.";
        } else {
          return "p.m.";
        }
      }
    });

    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-28181852-28");

    // Chartbeat
    function ctag() {
      var _sf_async_config = (window._sf_async_config =
        window._sf_async_config || {});
      _sf_async_config.uid = 61220;
      _sf_async_config.domain = "dailybruin.com";
      _sf_async_config.flickerControl = false;
      _sf_async_config.useCanonical = true;
      _sf_async_config.useCanonicalDomain = true;
      _sf_async_config.sections = [];
      _sf_async_config.authors = "";

      function loadChartbeat() {
        var e = document.createElement("script");
        var n = document.getElementsByTagName("script")[0];
        e.type = "text/javascript";
        e.async = true;
        e.src = "//static.chartbeat.com/js/chartbeat.js";
        n.parentNode.insertBefore(e, n);
      }
      loadChartbeat();
    }
    ctag();

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
