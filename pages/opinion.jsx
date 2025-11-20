import PageWrapper from "../layouts/PageWrapper";
import React from "react";

function Page() {
  // If the window isn't loaded yet, don't let it throw an error
  if (typeof window === "undefined") {
    <p>
      Oops! We meant to redirect you to
      https://dailybruin.com/category/opinion
    </p>;
  } else {
    // Redirect
    window.location.href = "https://dailybruin.com/category/opinion";
  }
  return null;
}

export default PageWrapper(Page);
