import React from "react";
import css from "../style.module.css";
import Media from "react-media";

import { buildArticleCard } from "../utilities";
import moment from "moment";

import * as globals from "components/globals";

import Article from "components/Article";
import ClassifiedsCard from "components/ClassifiedsCard";
import CommentsCard from "components/CommentsCard";

class PGalleryLayout extends React.Component {
    constructor(props) {
        super(props);
        this.pgallery = (
            <PGallery
                headline={this.props.article.title.rendered}
                link={this.props.article.link}
                date={moment.utc(this.props.article.date)}
                authors={this.props.authors}
                categories={this.props.article["_embedded"]["wp:term"][0]}
                galleryID={this.props.galleryID}
                acf={this.props.article.acf}
            />
        );
    }

    render() {
        <Media
            queries={{
                phone: "(max-width: 600px)",
                tablet: "(min-width: 601px) and (max-width: 900px)",
                desktop: "(min-width: 901px)"
            }}
            defaultMatches={{ desktop: true }}
        >
            {this.pgallery}
            <div className={css.card}>
                <CommentsCard
                    id={this.props.article.id}
                    link={this.props.article.link}
                ></CommentsCard>
            </div>
        </Media>

    }
}
