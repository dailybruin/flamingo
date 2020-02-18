import * as React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Link from "next/link";
import Cookies from "js-cookie";

export default class EmailPopUp extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = () => {
    this.props.sub2Newsletter();
  };

  render() {
    return (
      <div id="popup">
        <div>
          <div
            css={css`
              position: fixed;
              width: 1440px;
              height: 800px;
              background-color: rgba(0, 0, 0, 0.3);
              opacity: 90%;
              top: 0%;
              left: 0%;
              z-index: 3000;
            `}
          ></div>
          <div
            css={css`
              position: fixed;
              width: 490px;
              @media (max-width: 950px) {
                width: 260px;
              }
              height: 295px;
              top: 29%;
              left: 33%;
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
                @media (max-width: 950px) {
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
                  @media (max-width: 950px) {
                    font-size: 25px;
                    top: 30px;
                  }
                  position: relative;
                  width: 90%;
                  height: 40px;
                  top: 40px;
                  left: 20px;
                  font-family: Playfair Display;
                  font-style: normal;
                  font-weight: bold;
                  color: #0080c6;
                  font-size: 40px;
                  text-align: left;
                  z-index: 3001;
                `}
              >
                Get what's Bruin,
              </div>
              <div
                css={css`
                  @media (max-width: 950px) {
                    font-size: 18px;
                    top: 40px;
                  }
                  position: relative;
                  width: 90%;
                  height: 80px;
                  top: 20px;
                  left: 20px;
                  font-family: "PT Serif";
                  font-weight: bold;
                  font-size: 30px;
                  color: #474747;
                  text-align: left;
                  z-index: 3001;
                `}
              >
                <p>
                  every morning,<br></br>right in your inbox.
                </p>
              </div>
              <form
                onClick={this.onSubmit}
                action="//dailybruin.us15.list-manage.com/subscribe/post?u=15fa3629ea46e975a3174fe51&amp;id=ee621e262a"
                method="post"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_blank"
                noValidate=""
              >
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Enter your e-mail"
                  css={css`
                    @media (max-width: 950px) {
                      width: 170px;
                      top: 20px;
                      font-size: 12px;
                    }
                    position: relative;
                    width: 235px;
                    height: 30px;
                    top: 40px;
                    left: 20px;
                    padding-left: 5px;
                    border: 2px solid #cccccc;
                    font-family: "PT Serif";
                    font-size: 15px;
                    font-weight: bold;
                    z-index: 3001;
                  `}
                ></input>
                <input
                  type="submit"
                  value="Subscribe"
                  css={css`
                    position: relative;
                    @media (max-width: 950px) {
                      width: 170px;
                      font-size: 15px;
                      left: 20px;
                      top: 30px;
                    }
                    width: 130px;
                    height: 30px;
                    top: 40px;
                    left: 42px;
                    border: 3px solid ${globals.DBblue};
                    background: ${globals.DBblue};
                    font-family: "PT Serif";
                    font-weight: bolder;
                    font-size: 16px;
                    color: #ffffff;
                    z-index: 3001;
                    cursor: pointer;
                  `}
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
