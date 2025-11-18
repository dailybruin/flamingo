import PageWrapper from "../../../layouts/PageWrapper";
import React from "react";
import Error from "next/error";
import { Config } from "../../../config.js";
import Head from "next/head";

import SectionHeader from "../../../components/SectionHeader";
import CategoryLayout from "../../../layouts/Category";

/*
When we have a URL that is https://dailybruin.com/category/breaking/[tag name]
First we take the slug that is provided in the url, then we get the ID of that slug
Next we create a new query string
Category ID #27093 is the Category ID of breaking news
https://wp.dailybruin.com/wp-json/wp/v2/posts?categories=27093&tags=[TAG ID]
*/

function Tag({ posts }) {
    return (
        <>
            <Head>
                <title>{"Breaking News - Daily Bruin"}</title>
            </Head>
            <div style={{ padding: "6px" }}>
                <SectionHeader
                    category={'Breaking News'}
                />
            </div>
            <CategoryLayout
                posts={posts}
                categoryID={27093}
            />
        </>
    );
}

Tag.getInitialProps = async (context) => {
    const postsRes = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=27093`
    );
    const posts = await postsRes.json();
    return { posts };
};

export default PageWrapper(Tag);
