// Should take precedence over [slug].jsx
import PageWrapper from "../../layouts/PageWrapper";
import React from "react";
import Error from "next/error";

function Uncategorized() {
  return <Error statusCode={404} />;
}

export default PageWrapper(Uncategorized);
