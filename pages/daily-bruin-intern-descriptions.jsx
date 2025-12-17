import PageWrapper from "../layouts/PageWrapper";
import React from "react";
import { Config } from "../config.js";

import PageLayout from "../layouts/Page";

function Page({ page }) {
  return <PageLayout page={page} />;
}

Page.getInitialProps = async () => {
  const pageRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/493000`);
  const page = await pageRes.json();
  return { page };
};

export default PageWrapper(Page);
