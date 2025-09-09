import React from "react";
import PageWrapper from "../layouts/PageWrapper";
import PageLayout from "../layouts/Page";
import { Config } from "../config.js";

const Page = ({ page }) => {
  return (
    <div className="staff-wrapper">
      <PageLayout page={page} />
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
}

Page.getInitialProps = async (context) => {
  const { slug } = context.query;
  const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/10`);
  const page = await pageRes.json();
  return { page };
};

export default PageWrapper(Page);
