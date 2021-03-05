import React from "react";
import css from "../style.module.css";
import Media from "react-media";

import moment from "moment";

import * as globals from "components/globals";

import PGallery from "components/PhotoGallery/PGallery";
import CommentsCard from "components/CommentsCard";

export default class PGalleryLayout extends React.Component {
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
        return (
            <div>
                {this.pgallery}
                <div className={css.card}>
                    <CommentsCard
                        id={this.props.article.id}
                        link={this.props.article.link}
                    ></CommentsCard>
                </div>
            </div>);

    }
}
