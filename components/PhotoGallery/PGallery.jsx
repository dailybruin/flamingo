import React, { useState, useEffect } from "react";
import css_selector from "../../layouts/style.module.css";
import { css, jsx } from "@emotion/core";

import axios_to_gallery from "./axios_to_gallery";
import ShareButtons from "../ShareButtons";
import AuthorCard from "../AuthorCard";
import ContainerItem from "./ContainerItem";
import Header from "./Header";

import { dummyDataBig } from "./dummyData";

var counter = -1;
const getAltVal = type => {
  if (type == "alt-photo") {
    counter++;
    return counter % 2;
  } else {
    return -1; //TODO: this can be used to catch errors down the line
  }
};
const wrapCredits = credits => {
  if (credits != undefined && credits != "") {
    return `(${credits})`;
  } else {
    return credits;
  }
};

function PGallery(props) {
  // index is odd --> left
  // index is even --> right
  const [layout, setLayout] = useState();
  const [entries, setEntries] = useState([]);

  var testing = false;
  if (testing) {
    useEffect(() => {
      async function fetchData() {
        setLayout(dummyDataBig["layout"]);
        setEntries(dummyDataBig["data"]);
      }
      fetchData();
    }, []);
  } else {
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await axios_to_gallery.get(`/${props?.galleryID ?? ""}`);
          const data = res?.data ?? {};

          setLayout(data?.layout ?? null);
          setEntries(Array.isArray(data?.data) ? data.data : []);
        } catch (e) {
          console.log(e);
          setLayout(null);
          setEntries([]);
        }
      }

      fetchData();
    }, [props?.galleryID]);
  }
  if (!entries) {
    return <div>Loading photo galleries</div>;
  }

  // Boiler plate
  let renderedAuthorCards = [];
  for (let author of props.authors) {
    renderedAuthorCards.push(
      <div
        css={css`
          padding: 20px 0;
        `}
      >
        <AuthorCard
          image={
            author.simple_local_avatar != null
              ? author.simple_local_avatar.full
              : author.avatar_urls[512]
          }
          name={author.name}
          description={author.description}
          position={author.acf.position}
          twitter={author.acf.twitter}
          email={author.media_email}
          link={author.link}
        />
      </div>
    );
  }
  let photosContainerType = "alternating-container";

  if (layout === "big-centered-stream") {
    photosContainerType = "big-centered-stream-container";
  }
  return (
    <React.Fragment>
      <Header
        headline={props.headline}
        photographers={props.authors}
        date={props.date}
      />

      <div className={css_selector[photosContainerType]}>
        {(entries ?? []).map((entry = {}, index) => (
          <ContainerItem
            key={index}
            layout_type={layout ?? "alternating"}
            type={entry?.type ?? "unknown"}
            description={entry?.description ?? ""}
            img_url={entry?.img_url ?? ""}
            first={getAltVal(entry?.type)}
            credits={wrapCredits(entry?.credits ?? "")}
            related_articles={entry?.related_links ?? null}
          />
        ))}
      </div>

      <div>
        <ShareButtons title={props.headline} url={props.link}></ShareButtons>
      </div>
      <div
        css={css`
          max-width: 600px;
          margin: auto;
        `}
      >
        {renderedAuthorCards}
      </div>
    </React.Fragment>
  );
}

export default PGallery;
