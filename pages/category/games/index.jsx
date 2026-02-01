import PageWrapper from "../../../layouts/PageWrapper";
import React from "react";
import Link from "next/link"; 
import Head from "next/head";
import SectionHeader from "../../../components/SectionHeader";
import games from "./gamesData";
import PhotoCard from "../../../components/PhotoCard"; 
import styles from "./index.module.css";

const GamesIndex = () => {
  return (
    <>
      <Head>
        <title>{"Games - Daily Bruin"}</title>
        <meta
          name="description"
          content="Play Daily Bruin's collection of games and puzzles."
        />
      </Head>
      <div style={{ padding: "6px" }}>
        <SectionHeader category={"Games"} />
      </div>

      <div className={styles.gamesGrid}>
        {games.map((g) => (
          <PhotoCard key={g.href} {...g} />
        ))}
      </div>
    </>
  );
};

export default PageWrapper(GamesIndex);
