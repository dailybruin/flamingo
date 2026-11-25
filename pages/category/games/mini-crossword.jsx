import PageWrapper from "../../../layouts/PageWrapper";
import React, { Component } from "react";
import GameMeta from "../../../components/GameMeta";
import MiniCrosswordLogo from "../../../components/GamesCard/MiniCrosswordLogo.png";
import SectionHeader from "../../../components/SectionHeader";

class Games extends Component {
  render() {
    return (
      <>
        <GameMeta
          title="Mini Crossword"
          description="Solve today's mini crossword!"
          logo={MiniCrosswordLogo}
          path="/category/games/mini-crossword"
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
              src="https://crossword.dailybruin.com/mini"
              title="Mini Crossword"
              id="mini-crossword"
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
