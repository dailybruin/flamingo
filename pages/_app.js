import React from "react";
import App from "next/app";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";

import style from "style.css";
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

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

  componentWillMount() {
    // Custom Date Formats
    dayjs.updateLocale("en", {
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
  }

  componentDidMount() {
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

      function flyteDeskSetup (s, p)  { 
        var f = document.getElementsByTagName(s)[0]; 
        var j = document.createElement(s);
        j.id = 'flytedigital';
        j.async = true;
        j.src = 'https://digital.flytedesk.com/js/head.js#' + p;
        f.parentNode.insertBefore(j, f) 
      };
      flyteDeskSetup('script', '8b8311d2-981d-458c-8590-a1f98bff09cf');
    }
    ctag();
    

    // Broadstreet Ads
    window.broadstreet = window.broadstreet || { watch: function() {} };
    broadstreet.watch({ networkId: 5876 });

  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
