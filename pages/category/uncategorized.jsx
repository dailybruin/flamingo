// Should take precedence over [slug].jsx
import PageWrapper from "../../layouts/PageWrapper";
import React, { Component } from "react";
import Error from "next/error";

class Uncategorized extends Component {
  render() {
    return <Error statusCode={404} />;
  }
}

export default PageWrapper(Uncategorized);
