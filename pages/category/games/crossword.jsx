import PageWrapper from "../../../layouts/PageWrapper";
import React, { Component } from "react";
import GameMeta from "../../../components/GameMeta";
import CrosswordLogo from "../../../components/GamesCard/CrosswordLogo.png";
import SectionHeader from "../../../components/SectionHeader";

class Games extends Component {
  render() {
    return (
      <>
        <GameMeta
          title="Crossword"
          description="Solve today's crossword puzzle!"
          logo={CrosswordLogo}
          path="/category/games/crossword"
        />

        <div style={{ padding: "6px" }}>
          <SectionHeader category={"Games"} />
        </div>

        <div style={{ padding: "6px" }}>
          <div
            style={{
              backgroundColor: "white",
              boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.25)",
              display: "flex",
              justifyContent: "center",
              height: "1050px",
              overflow: "hidden"
            }}
          >
            <iframe
              src="https://crossword.dailybruin.com"
              title="Crossword"
              id="iFrame1"
              style={{
                width: "100%",
                height: "auto",
                border: "none",
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default PageWrapper(Games);
