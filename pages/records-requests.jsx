import PageWrapper from "../layouts/PageWrapper";
import React from "react";
import Head from "next/head";
import Error from "next/error";
import { Config } from "../config.js";
import PageLayout from "../layouts/Page";

/**
 * Records Requests page component
 * Fetches the records request information from WordPress by slug
 */
function Page({ page }) {
  // Handle error cases: undefined, error response, or empty array
  if (!page || page.data !== undefined || page.length === 0) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <Head>
        <title
          dangerouslySetInnerHTML={{
            __html: page[0].title.rendered + " - Daily Bruin"
          }}
        />
      </Head>
      <PageLayout page={page[0]} />
    </div>
  );
}

Page.getInitialProps = async () => {
  const pageRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/pages?slug=records-requests&_embed`
  );
  const page = await pageRes.json();
  return { page };
};

export default PageWrapper(Page);
