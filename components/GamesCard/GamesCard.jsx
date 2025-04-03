/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import Link from "next/link"

import Westwordle from "./WestWordLogoCropped.png"

export default function GamesCard(props) {
    return (
        <>
            <div
                css={css`
          ${globals.cardStyles}
          padding: 10px 10px 0;
        `}
            >
                <img
                        src={Westwordle}
                    css={css`
                    max-width: 100%;
                    height: auto;
              `}
                ></img>
            </div>
        </>
    );
}
