import PageWrapper from "../layouts/PageWrapper";
import React, { useEffect } from "react";

function Page() {
  useEffect(() => {
    // Redirect on client-side, runs once on mount
    window.location.href = "https://dailybruin.com/category/arts-entertainment";
  }, []);

  // Show message during server-side rendering (before redirect happens)
  return (
    <p>
      Oops! We meant to redirect you to https://dailybruin.com/category/arts
    </p>
  );
}

export default PageWrapper(Page);
