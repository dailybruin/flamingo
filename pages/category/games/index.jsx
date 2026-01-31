import PageWrapper from "../../../layouts/PageWrapper";
import React from "react";
import Link from "next/link"; 
import Head from "next/head";
import SectionHeader from "../../../components/SectionHeader";
import WestwordleLogo from "../../../components/GamesCard/WestWordLogoCropped.png"; 
import WhackaBruinLogo from "../../../components/GamesCard/WhackABruinLogo.png"; 
import CrosswordLogo from "../../../components/GamesCard/CrosswordLogo.png"
import MiniCrosswordLogo from "../../../components/GamesCard/MiniCrosswordLogo.png"
import PhotoCard from "../../../components/PhotoCard"; 
import styles from "./index.module.css";

const GamesIndex = () => {
  return (
    <>
      <Head>
        <title>{"Games - Daily Bruin"}</title>
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader category={"Games"} />
      </div>

      <div className={styles.gamesGrid}>
        <PhotoCard
          headline="Mini Crossword"
          href="/category/games/mini-crossword"
          as="/category/games/mini-crossword"
          link="/category/games/mini-crossword"
          image={MiniCrosswordLogo} 
          excerpt="Solve today's mini crossword!"
          authors={[
            { "display_name": "Narek Germirlian", "user_nicename": "NarekGermirlian" }
          ]}
        />
        
        <PhotoCard
          headline="Crossword"
          href="/category/games/crossword"
          as="/category/games/crossword"
          link="/category/games/crossword"
          image={CrosswordLogo} 
          excerpt="Solve today's crossword puzzle!"
          authors={[
            { "display_name": "Narek Germirlian", "user_nicename": "NarekGermirlian" }
          ]}
        />

        <PhotoCard
          headline="Whack-a-Mole"
          href="/category/games/whack-a-bruin"
          as="/category/games/whack-a-bruin"
          link="/category/games/whack-a-bruin"
          image={WhackaBruinLogo} 
          excerpt="Whack the Bruins and beat your high score!"
          authors={[
            { "display_name": "Johnny Zheng", "user_nicename": "JohnnyZheng" },
            { "display_name": "Hillary Nguyen", "user_nicename": "HNguyen" },
            { "display_name": "Aileen Chen", "user_nicename": "AChen" }
          ]}
        />

        <PhotoCard
          headline="Westwordle"
          href="/category/games/westwordle"
          as="/category/games/westwordle"
          link="/category/games/westwordle"
          image={WestwordleLogo} 
          excerpt="Guess the Daily Bruin-themed word in 6 tries."
          authors={[{ "display_name": "Daily Bruin Games Team" }]}
        />
      </div>
    </>
  );
};

export default PageWrapper(GamesIndex);
