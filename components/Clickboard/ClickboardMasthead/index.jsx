import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import Link from "next/link";

import Media from "react-media";
import * as globals from "../../globals";

import Desktop from "./Desktop";
import Mobile from "./Mobile";

export default class Masthead extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Media
        queries={{
          phone: "(max-width: 600px)",
          desktop: "(min-width: 601px)"
        }}
        defaultMatches={{ desktop: true }}
      >
        {matches => (
          <>
            {matches.phone && <Mobile {...this.props}></Mobile>}
            {matches.desktop && <Desktop {...this.props}></Desktop>}
          </>
        )}
      </Media>
    );
  }
}
