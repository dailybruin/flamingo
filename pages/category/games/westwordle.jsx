import PageWrapper from "../../../layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../../config.js";
import Head from "next/head";
import SectionHeader from "../../../components/SectionHeader";

// function resizeIFrameToFitContent(iFrame) {

//     iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
//     iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
// }

// window.addEventListener('DOMContentLoaded', function (e) {

    // var iframes = document.querySelectorAll("iframe");
    // for (var i = 0; i < iframes.length; i++) {
    //     resizeIFrameToFitContent(iframes[i]);
    // }
// });



class Games extends Component {
    static async getInitialProps(context) {
        
    }

    ComponentDidMount() {
        var iFrame = document.getElementById('iFrame1');
        iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
        iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
    }
    
    render() {
        return (
            <>
                <Head>
                    <title>{"Games - Daily Bruin"}</title>
                </Head>
                <div style={{ padding: "6px" }}>
                    <SectionHeader
                        category={"Games"}
                    />
                </div>
                <iframe
                    src="/westwordle_build/index.html"
                    style={{ width: '100%', height: '1050px', border: 'none', overflow: 'hidden' }}
                    title="React App"
                    id='iFrame1'
                />
                

            </>
        );
    }
}

export default PageWrapper(Games);


