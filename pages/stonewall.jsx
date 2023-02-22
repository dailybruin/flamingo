import React, { Component } from "react";
import { Config } from "../config.js";
import PageWrapper from "../layouts/PageWrapper";
import Head from "next/head";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import * as globals from "../components/globals";

class Stonewall extends Component {
  componentDidMount() {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS_pSjFbLe53S0TbEI_7BL_X9TqdTTB2AHRib0pu1FzP20QG6J6D6jOevX7A0-uld9V62hdPEUU2E6J/pub?output=tsv")
    .then(x => x.text())
    .then(x => {
      var array = x.split("\r\n");
      let result = [];
      let headers = array[0].split("\t");
      // for (let str of array) {
      //   console.log(str);
      // } {}
      // console.log(x.split("\r"));
      for (let i = 1; i < array.length - 1; i++) {
        let obj = {};
        let str = array[i].split("\t");
        // let s = '';
        for (let j in headers) {
          obj[headers[j]] = str[j].trim();
        }
        console.log(obj);
        result.push(obj);
      }
    })
    jQuery(document).ready(function() {
      let position = ["top", "center", "bottom"];

      //source file is https://docs.google.com/spreadsheets/d/1e9Fi-WgpB-JVF0v7jepWvywZ1IW4gV9IS39n9JnqXO4/edit#gid=0
      //owner is online@media.ucla.edu
      jQuery(function showstones() {
        jQuery.getJSON(
          "https://spreadsheets.google.com/feeds/list/1e9Fi-WgpB-JVF0v7jepWvywZ1IW4gV9IS39n9JnqXO4/od6/public/values?alt=json",

          function(data) {
            jQuery("div#stonewall").append('<div class="stone"></div>');
            jQuery.each(data.feed.entry.reverse(), function(i, entry) {
              if (entry.gsx$date.$t && entry.gsx$copystatus.$t) {
                let append =
                  '<li class="accordion-navigation stone s' +
                  ((i % 3) + 1) +
                  '">';
                append +=
                  '<a href="#panel' +
                  i +
                  'a" class="stone-title" id="t' +
                  i +
                  '"></a>';
                append +=
                  '<div id="panel' +
                  i +
                  'a" class="content stone-desc" id="desc' +
                  i +
                  '"></div>';
                append += "</li>";
                jQuery("ul#stonewall").append(append);
                let title =
                  "<b>" + entry.gsx$date.$t + ":</b> " + entry.gsx$reason.$t;
                let desc = entry.gsx$description.$t;
                jQuery("#t" + i + "").append(title);
                jQuery("#panel" + i + "a").append(desc);
              }
            });
          }
        );
      });
    });
  }

  render() {
    let d = new Date();

    return (
      <>
        <Head>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
        </Head>
        <div
          css={css`
            display: block;
            padding: 10px 30px;
            box-shadow: ${globals.cardShadow};
            background-color: #ffffff;
            margin: 6px;

            .accordion {
              margin: 0;
              padding: 0;
            }

            .accordion .accordion-navigation > a {
              background: none;
              color: #222222 !important;
              display: block;
              font-family: ${globals.bodyFont};
              font-size: 1.5rem;
            }

            .accordion .accordion-navigation.active > a {
              background: none;
            }
            .accordion .accordion-navigation.active > a:hover {
              text-decoration: none;
            }

            .accordion .accordion-navigation {
              margin-bottom: 1rem !important;
            }
            #title {
              text-align: center;
              font-family: ${globals.headlineFont};
            }

            #title h2 {
              font-size: 6rem;
              font-weight: 400;
              color: #333 !important;
              display: inline-block;
              font-family: ${globals.headlineFont};

              /*text-transform: uppercase;*/
            }
            #title h3 {
              font-weight: 400;
              color: #555 !important;
              line-height: 2;
              font-family: ${globals.headlineFont};

              /*text-transform: uppercase;*/
            }

            #stonewall-wrap ul {
              list-style-type: none;
              font-size: 1rem;
            }

            .stone-title {
              font-size: 1.5rem;
            }

            #blurb {
              text-indent: 70px;
              background: #eee;
              width: 100%;

              margin-bottom: 2px;
            }
            #blurb p {
              padding-left: 15px;
              padding: 10px;
              font-size: 1rem;
            }

            .stone {
              margin-bottom: 1rem;
              background-size: 50%;
              padding: 10px;
            }

            .s1 {
              background-image: url("http://dailybruin.com/images/2015/02/stonewall.jpg");
              background-position: top;
            }

            .s2 {
              background-image: url("http://dailybruin.com/images/2015/02/stonewall.jpg");
              background-position: bottom;
            }

            .s3 {
              background-image: url("http://dailybruin.com/images/2015/02/stonewall.jpg");
              background-position: center;
            }

            #stonewall-wrap {
              font-family: ${globals.bodyFont};
              margin-top: 2rem;
              max-width: 1170px;
              margin-left: auto;
              margin-right: auto;
            }

            .db-next {
              display: none !important;
            }

            @media (max-width: 600px) {
              #title h2 {
                font-size: 15vw;
              }
              .stone-title,
              .accordion .accordion-navigation > a {
                font-size: 1rem;
              }

              .content.stone-desc {
                font-size: 0.8rem;
              }
            }
          `}
        >
          <div id="stonewall-wrap">
            <div id="title">
              <h2 className="animated fadeInDown">S</h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 0.3s;
                `}
              >
                t
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 0.6s;
                `}
              >
                o
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 0.9s;
                `}
              >
                n
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 1.2s;
                `}
              >
                e
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 1.5s;
                `}
              >
                w
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 1.8s;
                `}
              >
                a
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 2.1s;
                `}
              >
                l
              </h2>
              <h2
                className="animated fadeInDown"
                css={css`
                  animation-delay: 2.4s;
                `}
              >
                l
              </h2>
              <h3>From the Daily Bruin</h3>
            </div>
            <div id="blurb">
              <p>
                For <span>{d.getFullYear() - 1920}</span> years, the Daily Bruin
                has strived to hold UCLA accountable to the community it serves.
                We take that responsibility seriously. And when the Bruin is
                unjustly thwarted in its efforts to inform students, we believe
                you have a right to know. Each time our reporters are
                stonewalled in their attempts to inform readers, we will record
                that here, stone by stone. No stonewalling that week, no new
                stone. Below, you can click each stone to read about why it's
                there.
              </p>
            </div>
            <ul id="stonewall" className="accordion" data-accordion></ul>
          </div>
        </div>
      </>
    );
  }
}

export default PageWrapper(Stonewall);
