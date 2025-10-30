import PageWrapper from "../layouts/PageWrapper";
import React from "react";
import { Config } from "../config.js";

import PageLayout from "../layouts/Page";

function Page({ page }) {
  return <PageLayout page={page} />;
}

Page.getInitialProps = async (context) => {
  const { slug } = context.query;
  const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/388408`);
  const page = await pageRes.json();
  return { page };
};

export default PageWrapper(Page);
