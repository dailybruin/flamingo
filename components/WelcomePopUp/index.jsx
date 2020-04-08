import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Link from "next/link";

export default class WelcomePopUp extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = () => {
    this.props.sub2Newsletter();
  };

  render() {
    return (
      <div
        id="welcomepopup"
        css={css`
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            opacity: 90%;
            top: 0%;
            left: 0%;
            z-index: 3000;
          `}
          onClick={this.props.close}
        ></div>
        <div
          css={css`
            position: fixed;
            width: 490px;
            margin: auto;
            @media (max-width: 450px) {
              width: 260px;
            }
            height: 295px;
            top: 29%;
            left: 0;
            right: 0;
            background-color: #ffffff;
            box-shadow: ${globals.cardShadow};
            z-index: 3001;
          `}
        >
          <button
            css={css`
              position: absolute;
              width: 25px;
              height: 20px;
              top: 30px;
              left: 25px;
              border: none;
              font-family: Source Sans Pro;
              font-weight: bold;
              color: #000;
              font-size: 18px;
              z-index: 3002;
              cursor: pointer;
            `}
            type="button"
            onClick={this.props.close}
          >
            X
          </button>
          <div
            css={css`
              position: relative;
              width: 450px;
              @media (max-width: 450px) {
                width: 220px;
              }
              height: 256px;
              top: 20px;
              left: 20px;
              border: 5px solid #c4c4c4;
              z-index: 3001;
            `}
          >
            <div
              css={css`
                @media (max-width: 450px) {
                  font-size: 35px;
                  top: 15%;
                }
                position: relative;
                width: 100%;
                height: 30%;
                top: 15%;
                left: 0%;
                font-family: Playfair Display;
                font-style: normal;
                font-weight: bold;
                color: #0080c6;
                font-size: 50px;
                text-align: center;
                z-index: 3001;
              `}
            >
              Welcome!
            </div>
            <div
              css={css`
                @media (max-width: 450px) {
                  font-size: 18px;
                  top: 10%;
                }
                position: relative;
                width: 90%;
                height: 40%;
                top: 15%;
                left: 5%;
                font-family: "PT Serif";
                font-weight: bold;
                font-size: 30px;
                color: #474747;
                text-align: center;
                z-index: 3001;
              `}
            >
              {this.props.bodytext}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
