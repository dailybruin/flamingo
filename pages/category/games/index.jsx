import PageWrapper from "../../../layouts/PageWrapper";
import React from "react";
import Link from "next/link"; 
import Head from "next/head";
import SectionHeader from "../../../components/SectionHeader";
import WestwordleLogo from "../../../components/GamesCard/WestWordLogoCropped.png"; 
import WhackaBruinLogo from "../../../components/GamesCard/WhackABruinLogo.png"; 
import PhotoCard from "../../../components/PhotoCard"; 
// import * as utilities from "../../../components/PhotoCard/utilities";

const GamesIndex = () => {
  return (
    <>
      <Head>
        <title>{"Games - Daily Bruin"}</title>
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader category={"Games"} />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "50px" }}>
        
        <PhotoCard
          headline="Westwordle"
          href="/category/games/westwordle"
          as="/category/games/westwordle"
          link="/category/games/westwordle"
          image={WestwordleLogo} 
          excerpt="Guess the Daily Bruin-themed word in 6 tries."
          authors={[{ "display_name": "Daily Bruin Games Team" }]}
        />

        <PhotoCard
          headline="Whack-a-Mole"
          href="/category/games/whack-a-bruin"
          as="/category/games/whack-a-bruin"
          link="/category/games/whack-a-bruin"
          image={WhackaBruinLogo} 
          excerpt="Whack the Bruins and beat your high score!"
          authors={[{ "display_name": "Daily Bruin Games Team" }]}
        />
      </div>
    </>
  );
};

export default PageWrapper(GamesIndex);
