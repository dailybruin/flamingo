import React, { Component } from "react";
import fetch from "isomorphic-unfetch";
import Error from "next/error";
import Link from "next/link";

import EmailPopUp from "../components/EmailSignUp";

export default class Playground extends Component {
  render() {
    return (
      <div style={{ margin: "auto", maxWidth: "1236px" }}>
        <EmailPopUp />
      </div>
    );
  }
}
