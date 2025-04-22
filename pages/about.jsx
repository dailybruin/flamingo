// pages/[slug].tsx
import PageWrapper from "../layouts/PageWrapper";
import React from "react";
import useSWR from 'swr';
import PageLayout from "../layouts/Page";

const fetcher = (url) => fetch(url).then(res => res.json());

function Page({ slug }) {
  const TTL = 432000  // Update once every 5 days
  const { data, error, isLoading } = useSWR(`/api/227543?ttl=${TTL}`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading page</div>;

  return <PageLayout page={data} />;
}

export default PageWrapper(Page);