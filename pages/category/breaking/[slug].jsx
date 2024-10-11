import PageWrapper from "../../../layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../../config.js";
import Head from "next/head";

import BreakingFeedsHeader from "../../../components/BreakingFeedsHeader";
import BreakingLayout from "../../../layouts/Breaking";

/*
When we have a URL that is https://dailybruin.com/category/breaking/[tag name]
First we take the slug that is provided in the url, then we get the ID of that slug
Next we create a new query string
Category ID #27093 is the Category ID of breaking news
https://wp.dailybruin.com/wp-json/wp/v2/posts?categories=27093&tags=[TAG ID]
*/

class Tag extends Component {
    static async getInitialProps(context) {
        const { slug } = context.query;
        const tagRes = await fetch(
            `${Config.apiUrl}/wp-json/wp/v2/tags?slug=${slug}`
        );
        const tag = await tagRes.json();
        if (tag.length > 0) {
            const postsRes = await fetch(
                `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=27093&tags=${tag[0].id}`
            );
            const posts = await postsRes.json();
            const eventSummaryRes = await fetch(
                `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=27127&tags=${tag[0].id}`
            )
            const eventSummaries = await eventSummaryRes.json();
            /*
            This is temporary for the event summary, we will have to make a new tag / category for event Summary then pluck that 
            */
            const eventSummary = eventSummaries[0];
            posts.push(posts[1]);
            posts.push(posts[0]);
            posts.push(posts[1]);
            posts.push(posts[0]);
            return { tag, posts, eventSummary };
        }
        return { tag };
    }
    render() {
        if (this.props.tag.data != undefined || this.props.tag.length == 0)
            return <Error statusCode={404} />;
        return (
            <>
                <Head>
                    <title>{this.props.tag[0].name + " - Daily Bruin"}</title>
                </Head>
                <div>
                    <div style={{ padding: "6px" }}>
                        <BreakingFeedsHeader
                            tag={this.props.tag[0].name}
                            explainer={this.props.tag[0].description}
                        />
                    </div>
                    <BreakingLayout
                        tagID={this.props.tag[0].id}
                        posts={this.props.posts}
                        eventSummary={this.props.eventSummary}
                    />
                </div>
            </>
        );
    }
}

export default PageWrapper(Tag);
