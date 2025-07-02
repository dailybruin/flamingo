import React from "react";
import PageWrapper from "../layouts/PageWrapper";
import PageLayout from "../layouts/Page";
import { Config } from "../config.js";

const Page = ({ page }) => {
  return <PageLayout page={page} />;
};

Page.getInitialProps = async (context) => {
  const { slug } = context.query;
  const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/10`);
  const page = await pageRes.json();
  return { page };
};

export default PageWrapper(Page);
