import PageWrapper from "../layouts/PageWrapper";
import React, { useEffect } from "react";

function Page() {
  useEffect(() => {
    window.location.href = "https://dailybruin.com/category/opinion";
  }, []);

  return (
    <p>
      Oops! We meant to redirect you to
      https://dailybruin.com/category/opinion
    </p>
  );
}

export default PageWrapper(Page);
