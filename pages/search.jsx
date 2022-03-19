import PageWrapper from "../layouts/PageWrapper";
import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Error from "next/error";
import Head from "next/head";
import SearchResults from "../components/SearchResults";

class Search extends React.Component {
  static async getInitialProps(context) {
    const { q } = context.query;
    return { q };
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src =
      "https://cse.google.com/cse.js?cx=006392094391191733900:lbuv5c9wef4";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div
        css={css`
          padding: 6px;
        `}
      >
        <Head>
          <title>{`Search: ${decodeURI(this.props.q)} - Daily Bruin`}</title>
        </Head>
        <SearchResults darkmode={this.props.darkmode} query={decodeURI(this.props.q)}></SearchResults>
      </div>
    );
  }
}

export default PageWrapper(Search);
