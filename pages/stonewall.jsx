import React, { Component, useEffect, useState } from "react";
import { Config } from "../config.js";
import PageWrapper from "../layouts/PageWrapper";
import Head from "next/head";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import * as globals from "../components/globals";

const Stonewall = () => {

    const [stones, setStones] = useState([]);

    useEffect(() => {
        fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS_pSjFbLe53S0TbEI_7BL_X9TqdTTB2AHRib0pu1FzP20QG6J6D6jOevX7A0-uld9V62hdPEUU2E6J/pub?output=tsv")
        .then(x => x.text())
        .then(x => {
            var array = x.split("\r\n");
            let result = [];
            let headers = array[0].split("\t");
            for (let i = 1; i < array.length; i++) {
                let obj = {};
                let str = array[i].split("\t");
                for (let j in headers) {
                obj[headers[j]] = str[j].trim();
                }
                result.push(obj);
            }
            setStones(result);
        })
    }, [])
    
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
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 1rem;
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
                background-color: #D9D9D9;
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
                @keyframes fadeInDown {
                    0% {
                        opacity: 0;
                        transform: translateY(-20%);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0%);
                    }
                }
            `}
            >
            <div id="stonewall-wrap">
                <div id="title">
                    {"STONEWALL".split('').map((letter, i) => {
                        return <h2 key={i} style={{opacity: 0, animation: 'fadeInDown 1s ease !important', animationDelay: `${(0.15 * (i + 1))}s !important`, animationFillMode: 'forwards !important'}}>{letter}</h2>
                    })}
                <h3>From the Daily Bruin</h3>
                </div>
                <div id="blurb">
                <p>
                    For <span>{new Date().getFullYear() - 1920}</span> years, the Daily Bruin
                    has strived to hold UCLA to the community it serves.
                    We take that seriously. And when the Bruin is
                    unjustly thwarted in its efforts to inform students, we believe
                    you have a right to know. Each time our reporters are
                    stonewalled in their attempts to inform readers, we will record
                    that here, stone by stone. No stonewalling that week, no new
                    stone. Below, you can click each stone to read about why it's
                    there.
                </p>
                </div>
                <ul id="stonewall" className="accordion" data-accordion>
                {stones && stones.map((data, i) => {
                    return <li className="accordion-navigation stone s" key={i}>
                    <div className="stone-title" id={`t${i}`}>
                        <b>{`${data.Date}: ${data.Reason}`}</b>
                    </div>
                    <div id={`panel ${i}a`} className="content stone-desc">
                        {data.Description}
                    </div>
                    </li>
                })}
                </ul>
            </div>
            </div>
        </>
    )
}

export default PageWrapper(Stonewall);