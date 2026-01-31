/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/core";
import * as globals from "../globals";
import { useState, useEffect } from "react";
import Image from "next/image";

import Westwordle from "./WestWordLogoCropped.png"
import WhackABruinLogo from "./WhackABruinLogo.png";
import CrosswordLogo from "./CrosswordLogo.png"
import MiniCrosswordLogo from "./MiniCrosswordLogo.png"

export default function GamesCard(props) {
    const [selectedLogo, setSelectedLogo] = useState(null);

    useEffect(() => {
        // Array of all game logos
        const logos = [Westwordle, WhackABruinLogo, CrosswordLogo, MiniCrosswordLogo];
        
        // Get the day of the year (1-366)
        const today = new Date();
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today - start;
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Use modulo to cycle through logos array
        const logoIndex = dayOfYear % logos.length;
        setSelectedLogo(logos[logoIndex]);
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
                />
            </div>
        </>
    );
}