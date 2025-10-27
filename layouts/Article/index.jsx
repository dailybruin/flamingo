import React from "react";
import css from "../style.module.css";
import Media from "react-media";

import { buildArticleCard } from "../utilities";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import * as globals from "components/globals";

import Article from "components/Article";
import ClassifiedsCard from "components/ClassifiedsCard";
import CommentsCard from "components/CommentsCard";

function ArticleLayout({article, authors, relatedPosts, classifieds})
{
  let articleBuild = (
    <Article
      headline={article.title.rendered}
      link={article.link}
      date={dayjs.utc(article.date)}
      authors={authors}
      categories={article["_embedded"]["wp:term"][0]}
      featureimg={
        article._embedded["wp:featuredmedia"] != undefined &&
        !article._embedded["wp:featuredmedia"].empty &&
        article._embedded["wp:featuredmedia"][0].data == undefined
          ? article._embedded["wp:featuredmedia"][0].source_url
          : ""
      }
      caption={
        article._embedded["wp:featuredmedia"] != undefined &&
        !article._embedded["wp:featuredmedia"].empty &&
        article._embedded["wp:featuredmedia"][0].data == undefined
          ? article._embedded["wp:featuredmedia"][0].caption
              .rendered
          : ""
      }
      content={article.content.rendered}
      acf={article.acf}
    />
  );

  let renderedRelatedPosts = [];
    for (let relatedPost of relatedPosts) {
      renderedRelatedPosts.push(
        <div key={relatedPost.id} className={css.card}>
          {buildArticleCard(relatedPost, "mini")}
        </div>
      );
    }
    return (
      <div>
        <Media
          queries={{
            phone: "(max-width: 600px)",
            tablet: "(min-width: 601px) and (max-width: 900px)",
            desktop: "(min-width: 901px)"
          }}
          defaultMatches={{ desktop: true }}
        >
          {matches => (
            <div>
              {matches.phone && (
                <div id="ArticleGrid" style={{ width: "100%" }}>
                  <div
                    id="article"
                    className={css.column}
                    style={{
                      width: "100%"
                    }}
                  >
                    <div className={css.card}>{articleBuild}</div>
                    <div>
                      <div className={css.card}>
                        <div
                          style={{
                            backgroundColor: "#000000",
                            height: "27px",
                            padding: "2px 10px 0",
                            boxShadow: globals.cardShadow,
                            fontFamily: globals.menuFont,
                            fontStyle: "normal",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "24px",
                            textTransform: "uppercase",
                            color: "#ffffff"
                          }}
                        >
                          Related Posts
                        </div>
                      </div>
                      {renderedRelatedPosts}
                    </div>
                    <div className={css.card}>
                      <CommentsCard
                        id={article.id}
                        link={article.link}
                      ></CommentsCard>
                    </div>
                    <div className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={classifieds}
                      />
                    </div>
                  </div>
                </div>
              )}
              {matches.tablet && (
                <div id="ArticleGrid" style={{ width: "100%" }}>
                  <div
                    id="article"
                    className={css.column}
                    style={{
                      width: "100%"
                    }}
                  >
                    <div className={css.card}>{articleBuild}</div>
                    <div className={css.card}>
                      <CommentsCard
                        id={article.id}
                        link={article.link}
                      ></CommentsCard>
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: "33.33%"
                    }}
                  >
                    <div>
                      <div className={css.card}>
                        <div
                          style={{
                            backgroundColor: "#000000",
                            height: "27px",
                            padding: "2px 10px 0",
                            boxShadow: globals.cardShadow,
                            fontFamily: globals.menuFont,
                            fontStyle: "normal",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "24px",
                            textTransform: "uppercase",
                            color: "#ffffff"
                          }}
                        >
                          Related Posts
                        </div>
                      </div>
                      {renderedRelatedPosts}
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: "33.33%"
                    }}
                  >
                    <div className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={classifieds}
                      />
                    </div>
                  </div>
                  <div
                    className={css.column}
                    style={{
                      width: "33.33%"
                    }}
                  >
                    <div className={css.card}>
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                  </div>
                </div>
              )}
              {matches.desktop && (
                <div id="ArticleGrid" style={{ width: "100%" }}>
                  <div
                    id="article"
                    className={css.column}
                    style={{
                      width: "75%"
                    }}
                  >
                    <div className={css.card}>{articleBuild}</div>
                    <div className={css.card}>
                      <CommentsCard
                        id={article.id}
                        link={article.link}
                      ></CommentsCard>
                    </div>
                  </div>
                  <div
                    id="extras"
                    className={css.column}
                    style={{
                      width: "25%"
                    }}
                  >
                    <div className={css.card}>
                      <broadstreet-zone zone-id="69405"></broadstreet-zone>
                    </div>
                    <div className={css.card}>
                      <ClassifiedsCard
                        header="Featured Classifieds"
                        classifieds={classifieds}
                      />
                    </div>
                    <div id='related-posts'>
                      <div className={css.card}>
                        <div
                          style={{
                            backgroundColor: "#000000",
                            height: "27px",
                            padding: "2px 10px 0",
                            boxShadow: globals.cardShadow,
                            fontFamily: globals.menuFont,
                            fontStyle: "normal",
                            fontWeight: "900",
                            fontSize: "18px",
                            lineHeight: "24px",
                            textTransform: "uppercase",
                            color: "#ffffff"
                          }}
                        >
                          Related Posts
                        </div>
                      </div>
                      {renderedRelatedPosts}
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

export default ArticleLayout;
