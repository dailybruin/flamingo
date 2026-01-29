import React, { useMemo } from "react";
import Image from "next/image";

import css from "../style.module.css";
import * as utilities from "../utilities";
import Media from "react-media";

import ClassifiedsCard from "../../components/ClassifiedsCard";
import SponsoredLinks from "../../components/SponsoredLinks";
import GamesCard from "components/GamesCard/GamesCard";

// Helper component for article cards with display type
const ArticleCardWrapper = ({ id, card, displayType, priority }) => {
  if (!card) return null;
  return (
    <div id={id} className={css.card}>
      {React.cloneElement(card, { displayType, priority })}
    </div>
  );
};

// Helper component for story list cards
const StoryListWrapper = ({ id, card }) => {
  if (!card) return null;
  return (
    <div id={id} className={css.card}>
      {card}
    </div>
  );
};

// Helper component for ad zones
const AdZone = ({ id = "above-ad" }) => (
  <div id={id} style={{ textAlign: "center" }} className={css.card}>
    <broadstreet-zone zone-id="69405"></broadstreet-zone>
  </div>
);

// Helper component for breaking news placeholder
const BreakingPlaceholder = ({ show }) => {
  if (!show) return null;
  return <div className={css.card}></div>;
};

// Helper component for Prime image
const PrimeImage = () => (
  <div className={css.card}>
    <a href="https://prime.dailybruin.com">
      <Image
        src="https://wp.dailybruin.com/images/2020/09/prime_mainsite.jpg"
        alt="Prime Magazine"
        width={828}
        height={1375}
        sizes="20vw"
      />
    </a>
  </div>
);

// Helper component for Games card
const GamesCardWrapper = () => (
  <div id="game">
    <a href="/category/games">
      <div className={css.card}>
        <GamesCard />
      </div>
    </a>
  </div>
);

export default function HomeLayout({
  posts,
  media,
  classifieds,
  mappedBreaking = null,
  sponsoredLinks,
}) {
  const cards = useMemo(() => {
    return {
      aArticleCard: utilities.buildArticleCard(posts.aStory[0]),
      bArticleCard: utilities.buildArticleCard(posts.bStory[0]),
      c1ArticleCard: utilities.buildArticleCard(posts.c1Story[0]),
      c2ArticleCard: utilities.buildArticleCard(posts.c2Story[0]),
      d1ArticleCard: utilities.buildArticleCard(posts.d1Story[0]),
      d2ArticleCard: utilities.buildArticleCard(posts.d2Story[0]),
      f1ArticleCard: utilities.buildArticleCard(posts.f1Story[0]),
      f2ArticleCard: utilities.buildArticleCard(posts.f2Story[0]),

      m1MultimediaScroller: utilities.buildMultimediaScroller(media),

      gArticleCard: utilities.buildStoryList("", posts.gStory, "", true),
      hArticleCard: utilities.buildStoryList("", posts.hStory, ""),
      iArticleCard: utilities.buildStoryList("", posts.iStory, ""),
      jArticleCard: utilities.buildStoryList("", posts.jStory, ""),
      kArticleCard: utilities.buildStoryList("", posts.kStory, ""),
      lArticleCard: utilities.buildStoryList("", posts.lStory, ""),
    };
  }, [posts, media]);

  const hasBreaking = mappedBreaking != null;

  return (
    <div>
      <Media
        queries={{
          phone: "(max-width: 600px)",
          tablet: "(min-width: 601px) and (max-width: 900px)",
          desktop: "(min-width: 901px)",
        }}
        defaultMatches={{ desktop: true }}
      >
        {(matches) => (
          <div>
            {matches.phone && (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div id="a-b" className={css.column} style={{ width: "100%" }}>
                  <ArticleCardWrapper
                    id="c1"
                    card={cards.c1ArticleCard}
                    displayType="full"
                    priority={true}
                  />
                  <ArticleCardWrapper
                    id="a"
                    card={cards.aArticleCard}
                    displayType="full"
                  />
                  <ArticleCardWrapper
                    id="b"
                    card={cards.bArticleCard}
                    displayType="full"
                  />
                  <ArticleCardWrapper
                    id="c2"
                    card={cards.c2ArticleCard}
                    displayType="full"
                  />
                  <BreakingPlaceholder show={hasBreaking} />
                  <AdZone />
                  <StoryListWrapper id="g" card={cards.gArticleCard} />
                  <ArticleCardWrapper
                    id="d1"
                    card={cards.d1ArticleCard}
                    displayType="mini"
                  />
                  <ArticleCardWrapper
                    id="d2"
                    card={cards.d2ArticleCard}
                    displayType="mini"
                  />
                  <div id="MultimediaScroller" className={css.card}>
                    {cards.m1MultimediaScroller}
                  </div>
                  <BreakingPlaceholder show={!hasBreaking} />
                  <div id="classifieds" className={css.card}>
                    <ClassifiedsCard
                      header="Featured Classifieds"
                      classifieds={classifieds}
                    />
                  </div>
                  <ArticleCardWrapper
                    id="f1"
                    card={cards.f1ArticleCard}
                    displayType="mini"
                  />
                  <StoryListWrapper id="i" card={cards.iArticleCard} />
                  <ArticleCardWrapper
                    id="f2"
                    card={cards.f2ArticleCard}
                    displayType="mini"
                  />
                  <AdZone />
                  <StoryListWrapper id="h" card={cards.hArticleCard} />
                  <StoryListWrapper id="j" card={cards.jArticleCard} />
                  <AdZone />
                  <StoryListWrapper id="k" card={cards.kArticleCard} />
                  <StoryListWrapper id="l" card={cards.lArticleCard} />
                </div>
              </div>
            )}

            {matches.tablet && (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div
                  id="a-ad-b"
                  className={css.column}
                  style={{ width: "33.333%" }}
                >
                  <ArticleCardWrapper
                    id="a"
                    card={cards.aArticleCard}
                    displayType="vert"
                  />
                  <AdZone />
                  <ArticleCardWrapper
                    id="b"
                    card={cards.bArticleCard}
                    displayType="vert"
                  />
                  <StoryListWrapper id="g" card={cards.gArticleCard} />
                  <div id="classifieds" className={css.card}>
                    <ClassifiedsCard
                      header="Featured Classifieds"
                      classifieds={classifieds}
                    />
                  </div>
                  <ArticleCardWrapper
                    id="f1"
                    card={cards.f1ArticleCard}
                    displayType="mini"
                  />
                  <BreakingPlaceholder show={hasBreaking} />
                  <AdZone />
                  <ArticleCardWrapper
                    id="f2"
                    card={cards.f2ArticleCard}
                    displayType="mini"
                  />
                  <BreakingPlaceholder show={!hasBreaking} />
                </div>
                <div
                  id="c1-c2"
                  className={css.column}
                  style={{ width: "66.666%" }}
                >
                  <ArticleCardWrapper
                    id="c1"
                    card={cards.c1ArticleCard}
                    displayType="full"
                    priority={true}
                  />
                  <ArticleCardWrapper
                    id="c2"
                    card={cards.c2ArticleCard}
                    displayType="horz"
                  />
                  <div
                    id="g-d1-d2"
                    className={css.column}
                    style={{ width: "100%" }}
                  >
                    <div
                      id="g-d1-d2"
                      className={css.column}
                      style={{ width: "50%" }}
                    >
                      <ArticleCardWrapper
                        id="d1"
                        card={cards.d1ArticleCard}
                        displayType="mini"
                      />
                    </div>
                    <div
                      id="g-d1-d2"
                      className={css.column}
                      style={{ width: "50%" }}
                    >
                      <ArticleCardWrapper
                        id="d2"
                        card={cards.d2ArticleCard}
                        displayType="mini"
                      />
                    </div>
                    <div id="MultimediaScroller" className={css.card}>
                      {cards.m1MultimediaScroller}
                    </div>
                    <div className={css.column} style={{ width: "50%" }}>
                      <StoryListWrapper id="i" card={cards.iArticleCard} />
                      <StoryListWrapper id="j" card={cards.jArticleCard} />
                      <StoryListWrapper id="l" card={cards.lArticleCard} />
                    </div>
                    <div className={css.column} style={{ width: "50%" }}>
                      <StoryListWrapper id="k" card={cards.kArticleCard} />
                      <StoryListWrapper id="h" card={cards.hArticleCard} />
                      <PrimeImage />
                    </div>
                  </div>
                </div>
                <div className={css.card}>
                  <SponsoredLinks links={sponsoredLinks} />
                </div>
              </div>
            )}

            {matches.desktop && (
              <div id="ArticleGrid" style={{ width: "100%" }}>
                <div>
                  <div
                    id="left"
                    className={css.column}
                    style={{ width: "25%" }}
                  >
                    <ArticleCardWrapper
                      id="a"
                      card={cards.aArticleCard}
                      displayType="vert"
                      priority={true}
                    />
                    <ArticleCardWrapper
                      id="b"
                      card={cards.bArticleCard}
                      displayType="vert"
                    />
                    <div id="classifieds" className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={classifieds}
                      />
                    </div>
                    <div style={{ textAlign: "center" }} className={css.card}>
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <StoryListWrapper id="i" card={cards.iArticleCard} />
                    <StoryListWrapper id="j" card={cards.jArticleCard} />
                    {/* Put twitter feed here */}
                    <div className={css.card}></div>
                  </div>
                  <div
                    id="center"
                    className={css.column}
                    style={{ width: "50%" }}
                  >
                    <ArticleCardWrapper
                      id="c1"
                      card={cards.c1ArticleCard}
                      displayType="full"
                      priority={true}
                    />
                    <ArticleCardWrapper
                      id="c2"
                      card={cards.c2ArticleCard}
                      displayType="horz"
                    />
                    <div id="MultimediaScroller" className={css.card}>
                      {cards.m1MultimediaScroller}
                    </div>
                    <ArticleCardWrapper
                      id="f1"
                      card={cards.f1ArticleCard}
                      displayType="horz"
                    />
                    <ArticleCardWrapper
                      id="f2"
                      card={cards.f2ArticleCard}
                      displayType="horz"
                    />
                    <div className={css.column} style={{ width: "50%" }}>
                      <StoryListWrapper id="k" card={cards.kArticleCard} />
                    </div>
                    <div className={css.column} style={{ width: "50%" }}>
                      <StoryListWrapper id="l" card={cards.lArticleCard} />
                    </div>
                  </div>
                  <div id="right" className={css.column} style={{ width: "25%" }}>
                    <BreakingPlaceholder show={hasBreaking} />
                    <AdZone />
                    <StoryListWrapper id="g" card={cards.gArticleCard} />
                    <ArticleCardWrapper
                      id="d1"
                      card={cards.d1ArticleCard}
                      displayType="mini"
                    />
                    <ArticleCardWrapper
                      id="d2"
                      card={cards.d2ArticleCard}
                      displayType="mini"
                    />
                    <GamesCardWrapper />
                    <StoryListWrapper id="h" card={cards.hArticleCard} />
                    <PrimeImage />
                  </div>
                </div>
                <div>
                  <div className={css.column} style={{ width: "100%" }}>
                    <div className={css.card}>
                      <SponsoredLinks links={sponsoredLinks} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Media>
    </div>
  );
}
