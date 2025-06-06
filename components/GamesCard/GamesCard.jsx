/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import { useState, useEffect } from "react";

import Westwordle from "./WestWordLogoCropped.png"
import WhackABruinLogo from "./WhackABruinLogo.png";

export default function GamesCard(props) {
    // Alternate between westworldle and whack-a-bruin logos every day
    // For future devs (if we have more than 2 games), maybe make cycling automatic
    const [selectedLogo, setSelectedLogo] = useState(null);

    useEffect(() => {
        const today = new Date();
        const isEvenDay = today.getDate() % 2 === 0;
        const logo = isEvenDay ? Westwordle : WhackABruinLogo;

        setSelectedLogo(logo);
    }, []);

    if (!selectedLogo) return null;

    return (
        <>
            <div
                css={css`
          ${globals.cardStyles}
          padding: 10px 10px 0;
        `}
            >
                <img
                    src={selectedLogo}
                    css={css`
                    max-width: 100%;
                    height: auto;
              `}
                ></img>
            </div>
        </>
    );
}
