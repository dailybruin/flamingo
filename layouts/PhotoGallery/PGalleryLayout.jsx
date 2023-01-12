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
                darkmode={this.props.darkmode}
                headline={this.props.post.title.rendered}
                link={this.props.post.link}
                date={moment.utc(this.props.post.date)}
                authors={this.props.authors}
                categories={this.props.post["_embedded"]["wp:term"][0]}
                galleryID={this.props.galleryID}
                acf={this.props.post.acf}
            />
        );
    }

    render() {
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
                    <div>
                        {React.cloneElement(this.pgallery, {
                            darkmode: this.props.darkmode
                        })}
                        <div className={css.card}>
                            <CommentsCard
                                id={this.props.post.id}
                                link={this.props.post.link}
                            ></CommentsCard>
                        </div>
                    </div>
                </Media>
            </div>);


    }
}
