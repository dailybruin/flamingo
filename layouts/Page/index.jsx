import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";

import css from "../style.module.css";
import Page from "../../components/Page";

const ArticleAdStyle = {
  width: "100%",
  backgroundColor: "#aaa",
  height: "250px",
  lineHeight: "200px",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "sans-serif"
};
// TODO
class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.page = (
      <Page
        content={this.props.page.content.rendered}
        date={new Date(this.props.page.modified)}
        darkmode={this.props.darkmode}
      />);
  }

  render() {
    return (<div className={this.props.darkmode? css.card_dark : css.card}>
      {React.cloneElement(this.page, {darkmode: this.props.darkmode})}  
    </div>);
  }
}

export default PageLayout;
