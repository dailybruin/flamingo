// Using newer React function components
import PageWrapper from "../../layouts/PageWrapper";
import React from "react";

function OpinionColumnSeries() {
  return (
    <h2 style={{ textAlign: "center" }}>
      You found a page that's currently under construction! Please check back
      later!
    </h2>
  );
}

export default PageWrapper(OpinionColumnSeries);
