import React from "react";
import App from "next/app";
import Script from "next/script";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";

import style from "style.css";

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);

// Custom Date Formats - set at module level to avoid componentWillMount deprecation
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
    return (
      <>
        {/* Google Analytics - afterInteractive for analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-28181852-28"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-28181852-28');
          `}
        </Script>

        {/* Chartbeat - lazyOnload for non-critical analytics */}
        <Script id="chartbeat-config" strategy="lazyOnload">
          {`
            var _sf_async_config = window._sf_async_config = window._sf_async_config || {};
            _sf_async_config.uid = 61220;
            _sf_async_config.domain = 'dailybruin.com';
            _sf_async_config.flickerControl = false;
            _sf_async_config.useCanonical = true;
            _sf_async_config.useCanonicalDomain = true;
            _sf_async_config.sections = [];
            _sf_async_config.authors = '';
          `}
        </Script>
        <Script
          src="https://static.chartbeat.com/js/chartbeat_mab.js"
          strategy="lazyOnload"
        />

        {/* Flytedesk - lazyOnload for ads */}
        <Script
          id="flytedigital"
          src="https://digital.flytedesk.com/js/head.js#8b8311d2-981d-458c-8590-a1f98bff09cf"
          strategy="lazyOnload"
        />

        {/* Broadstreet Ads init - script loaded in _document.js with beforeInteractive */}
        <Script id="broadstreet-init" strategy="afterInteractive">
          {`
            window.broadstreet = window.broadstreet || { watch: function() {} };
            broadstreet.watch({ networkId: 5876 });
          `}
        </Script>

        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
