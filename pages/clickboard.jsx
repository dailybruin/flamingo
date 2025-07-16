import PageWrapper from "../layouts/PageWrapper";
import React from "react";
import useSWR from 'swr';
import PageLayout from "../layouts/Page";
import { Config } from "../config.js";

const fetcher = (url) => fetch(url).then(res => res.json());

function Page() {
  const TTL = 432000  // Update once every 5 days
  const url = encodeURIComponent(`${Config.apiUrl}/wp-json/wp/v2/pages/14`);
  const { data, error, isLoading } = useSWR(`/api/${url}?ttl=${TTL}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;

  return <PageLayout page={data} />;
}

export default PageWrapper(Page);
