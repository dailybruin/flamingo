/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import { useState, useEffect } from "react";
import Image from "next/image";

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
                <Image
                    src={selectedLogo}
                    alt="Daily Bruin Game"
                    width={848}
                    height={1144}
                    layout="intrinsic"
                    sizes="20vw"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </div>
        </>
    );
}
