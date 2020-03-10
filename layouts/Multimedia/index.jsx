import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import { Config } from "../../config.js";
import * as utilities from "./utilities";

import PhotoCard from "../../components/PhotoCard";
import PhotoGrid from "../../components/PhotoGrid";

export default class MultimediaLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPhotoCards: utilities.buildPhotoList(this.props.posts)
    };
  }

  render() {
    return (
      <div>
        <PhotoGrid stories={this.state.allPhotoCards} />
      </div>
    );
  }
}
