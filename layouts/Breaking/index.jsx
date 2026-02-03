import React, { Component } from "react";
import Error from "next/error";
import { Config } from "../../config.js";
import css from "../style.module.css";
/** @jsxImportSource @emotion/react */
import {css as cssEmotion, jsx} from "@emotion/core";
import * as utilities from "../utilities";
import InfiniteScroll from "react-infinite-scroller";
import Media from "react-media";
import LoadingBear from "../../components/LoadingBear";
import ClassifiedsCard from "../../components/ClassifiedsCard";
import ArticleCard from "components/ArticleCard/index.jsx";
import Head from 'next/head';

export default class BreakingLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherArticleCards: utilities.buildArticleList(this.props.posts),
            more: true,
            isFixed: false
        };
        this.getPosts = this.getPosts.bind(this);
        this.stickyRef = React.createRef(); // Reference to the sticky element
        this.handleScroll = this.handleScroll.bind(this); // Binding the scroll handler
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll); // Attach scroll listener
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll); // Clean up listener
    }

    handleScroll() {
        const element = this.stickyRef.current;
        if (element == null){
            return; // this line is for mobile
        }
        const parent = element.parentElement;
        const parentRect = parent.getBoundingClientRect();
        const stickyTop = 70; // Matches the top value of sticky

        // Switch to fixed when the parent container's bottom goes above the stickyTop
        if (parentRect.bottom <= stickyTop) {
            this.setState({ isFixed: true });
        } else {
            this.setState({ isFixed: false });
        }
    }

    getPosts(page) {
        fetch(
            `${Config.apiUrl}/wp-json/wp/v2/posts?_embed&categories=27179&tags=${this.props.tagID}&page=${page}` //27179 is the category ID of breaking feed posts
        )
            .then(response => response.json())
            .then(
                json => {
                    if (json.data == undefined && json.length != 0) {
                        // Trim posts to reduce memory usage
                        const trimmedPosts = utilities.trimClientPosts(json);
                        this.setState({
                            otherArticleCards: this.state.otherArticleCards.concat(
                                utilities.buildArticleList(trimmedPosts, "breaking")
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
        const { isFixed } = this.state;
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
                                    <div id="one">
                                        {this.props.eventSummary && utilities.buildArticleCard(this.props.eventSummary, "breakingOverview")}
                                    </div>
                                    <InfiniteScroll
                                        pageStart={1}
                                        loadMore={this.getPosts}
                                        hasMore={this.state.more}
                                        threshold={3000}
                                        loader={
                                            <LoadingBear key="loader" text={"searching for more articles..."} />
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
                                            End of news feed
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
                                        <div id="one">
                                            {this.props.eventSummary && utilities.buildArticleCard(this.props.eventSummary, "breakingOverview")}
                                        </div>
                                        <InfiniteScroll
                                            pageStart={1}
                                            loadMore={this.getPosts}
                                            hasMore={this.state.more}
                                            threshold={3000}
                                            loader={
                                                <LoadingBear key="loader" text={"searching for more articles..."} />
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
                                                End of news feed
                                            </p>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        {matches.desktop && (
                            <div id="ArticleGrid" style={{ width: "100%"}}>
                                <div>
                                    <div
                                        id="left"
                                        className={css.column}
                                        ref={this.stickyRef}
                                        style={{
                                            width: "25%",
                                            position: isFixed ? "fixed" : "sticky",
                                            top: isFixed ? "0px" : "70px",
                                            marginTop: "7px"
                                        }}>
                                            {/*
                                            Normally you might just be able to do position: sticky to get the card to stick to the top of the 
                                            screen, but the stick only applies for the height of the div.
                                            Instead of calculating the height of the screen to make the height of the div, we can instead
                                            just put the position to fixed when the top of the div (from getBoundingClientRect)
                                            
                                            */}
                                        <div id="one" style={{
                                            position: "sticky", 
                                            top: "70px",
                                            maxHeight: "calc(100vh - 70px)", 
                                            overflowY: "scroll", 
                                            scrollbarWidth: "none",  
                                            msOverflowStyle: "none"
                                        }}>
                                            {this.props.eventSummary && utilities.buildArticleCard(this.props.eventSummary, "breakingOverview")} 
                                        </div>
                                    </div>
                                    <div
                                        id="center"
                                        className={css.column}
                                        style={{
                                            width: "50%"
                                        }}
                                    >
                                        <div>
                                            <InfiniteScroll
                                                pageStart={1}
                                                loadMore={this.getPosts}
                                                hasMore={this.state.more}
                                                threshold={3000}
                                                loader={
                                                    <LoadingBear key="loader" text={"searching for more posts..."} />
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
                                                    End of news feed
                                                </p>
                                            ) : (
                                                <span></span>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        id="right"
                                        className={css.column}
                                        style={{ width: "25%" }}
                                    >
                                        <div
                                            id="above-ad"
                                            className={css.card}
                                            style={{ textAlign: "center" }}
                                        >
                                            <broadstreet-zone zone-id="69405"></broadstreet-zone>
                                        </div>
                                        <div
                                            id="above-ad2"
                                            className={css.card}
                                            style={{ textAlign: "center", marginTop: "10px"}}
                                        >
                                            <broadstreet-zone zone-id="69405"></broadstreet-zone>
                                        </div>
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
