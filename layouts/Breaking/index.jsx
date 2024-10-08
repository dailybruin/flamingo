import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.module.css";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";
import Media from "react-media";
import LoadingBear from "../../components/LoadingBear";
import ClassifiedsCard from "../../components/ClassifiedsCard";

export default class BreakingLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherArticleCards: utilities.buildArticleList(this.props.posts),
            more: true
        };
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts(page) {
        fetch(
            `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=${this.props.categoryID}&page=${page}`
        )
            .then(response => response.json())
            .then(
                json => {
                    if (json.data == undefined && json.length != 0) {
                        console.log(json.length())
                        this.setState({
                            otherArticleCards: this.state.otherArticleCards.concat(
                                utilities.buildArticleList(json)
                            )
                        });
                    } else {
                        this.setState({
                            more: false
                        });
                    }
                },
                error => {
                    this.setState({
                        more: false
                    });
                }
            )
            .catch(err =>
                this.setState({
                    more: false
                })
            );
    }

    render() {
        return (
            <Media
                queries={{
                    phone: "(max-width: 600px)",
                    tablet: "(min-width: 601px) and (max-width: 900px)",
                    desktop: "(min-width: 901px)"
                }}
                defaultMatches={{ desktop: true }}
            >
                {matches => (
                    <>
                        {matches.phone && (
                            <div
                                id="ArticleGrid"
                                style={{
                                    width: "100%"
                                }}
                            >
                                <div
                                    id="c"
                                    className={css.column}
                                    style={{
                                        width: "100%"
                                    }}
                                >
                                    <InfiniteScroll
                                        pageStart={1}
                                        loadMore={this.getPosts}
                                        hasMore={this.state.more}
                                        threshold={3000}
                                        loader={
                                            <LoadingBear text={"searching for more articles..."} />
                                        }
                                    >
                                        {utilities.renderPostArray(
                                            this.state.otherArticleCards,
                                            "full"
                                        )}
                                    </InfiniteScroll>
                                    {!this.state.more ? (
                                        <p
                                            style={{
                                                color: "#404040",
                                                fontFamily: "'Source Sans Pro', sans-serif",
                                                textAlign: "center"
                                            }}
                                        >
                                            no more articles!
                                        </p>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
                        )}
                        {matches.tablet && (
                            <div id="ArticleGrid" style={{ width: "100%" }}>
                                <div
                                    id="a-ad-b"
                                    className={css.column}
                                    style={{
                                        width: "100%"
                                    }}
                                >
                                    <div>
                                        <InfiniteScroll
                                            pageStart={1}
                                            loadMore={this.getPosts}
                                            hasMore={this.state.more}
                                            threshold={3000}
                                            loader={
                                                <LoadingBear text={"searching for more articles..."} />
                                            }
                                        >
                                            {utilities.renderPostArray(
                                                this.state.otherArticleCards,
                                                "horz"
                                            )}
                                        </InfiniteScroll>
                                        {!this.state.more ? (
                                            <p
                                                style={{
                                                    color: "#404040",
                                                    fontFamily: "'Source Sans Pro', sans-serif",
                                                    textAlign: "center"
                                                }}
                                            >
                                                no more articles!
                                            </p>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {matches.desktop && (
                            <div id="ArticleGrid" style={{ width: "100%" }}>
                                <div
                                    id="Articles"
                                    className={css.column}
                                    style={{ width: "100%" }}
                                >
                                    <div>
                                        <InfiniteScroll
                                            pageStart={1}
                                            loadMore={this.getPosts}
                                            hasMore={this.state.more}
                                            threshold={3000}
                                            loader={
                                                <LoadingBear text={"searching for more posts..."} />
                                            }
                                        >
                                            {utilities.renderPostArray(
                                                this.state.otherArticleCards,
                                                "breaking"
                                            )}
                                        </InfiniteScroll>
                                        {!this.state.more ? (
                                            <p
                                                style={{
                                                    color: "#404040",
                                                    fontFamily: "'Source Sans Pro', sans-serif",
                                                    textAlign: "center"
                                                }}
                                            >
                                                End of Breaking Feed!
                                            </p>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Media>
        );
    }
}
