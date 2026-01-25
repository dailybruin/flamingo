import * as React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";

export default class CommentFAB extends React.Component {
  timeout = null;
  state = {
    isScrolling: false
  };

  // componentDidMount() {
  //   window.addEventListener("scroll", this.onScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.onScroll);
  // }

  // onScroll = () => {
  //   this.setState({ isScrolling: true });

  //   clearTimeout(this.timeout);

  //   this.timeout = setTimeout(() => {
  //     this.setState({ isScrolling: false });
  //   }, 200);
  // };

  render() {
    return (
      <a
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSeCsyRAFuUVYEdSA9wQhdimmn6lzgSUBMepSvpP_QU5YsVSnQ/viewform"
        //href="https://docs.google.com/forms/d/e/1FAIpQLSdkQCXXAnvFuY7TJJq_kRrlOs8os7N8u9tJ25qQjfw9BttpWw/viewform?usp=sf_link"
        css={css`
          display: block;
          position: fixed;
          right: 20px;
          bottom: 20px;
          background-color: ${globals.DBblue};
          border-radius: 50%;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);
          margin: 0;
          transition: all 300ms;
          z-index: 100;
          /* transform: translateY(${
            this.state.isScrolling ? "100px" : "0"
          }); */
        `}
      >
        <img
          src={"/icons/comment.svg"}
          css={css`
            display: block;
            width: 24px;
            height: 24px;
            margin: 16px;
          `}
        />
      </a>
    );
  }
}
