import React from "react";
import Head from "next/head";
import Error from "next/error";
import PageWrapper from "../layouts/PageWrapper";
import PageLayout from "../layouts/Page";
import { Config } from "../config.js";

/**
 * Staff page component
 * Fetches the staff directory page from WordPress by slug
 * Includes custom styling for staff page layout
 */
const Page = ({ page }) => {
  // Handle error cases: undefined, error response, or empty array
  if (!page || page.data !== undefined || page.length === 0) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="staff-wrapper">
      <Head>
        <title
          dangerouslySetInnerHTML={{
            __html: page[0].title.rendered + " - Daily Bruin"
          }}
        />
      </Head>
      <PageLayout page={page[0]} />
      <style jsx>{`
        /* Scoped to this page: target any .text inside PageLayout */
        .staff-wrapper :global(.text) {
          margin: 0px !important;
        }

        .staff-wrapper :global(img) {
          margin-top: 10px !important;
          margin-bottom: 10px !important;
        }
      `}</style>
    </div>
  );
};

Page.getInitialProps = async () => {
  const pageRes = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/pages?slug=staff&_embed`
  );
  const page = await pageRes.json();
  return { page };
};

export default PageWrapper(Page);
