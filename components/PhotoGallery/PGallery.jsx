import React, { useState, useEffect } from "react";
import css_selector from "../../layouts/style.module.css";
import { css } from "@emotion/core";

import ShareButtons from "../ShareButtons";
import AuthorCard from "../AuthorCard";
import ContainerItem from "./ContainerItem";
import Header from "./Header";

import { dummyDataBig } from "./dummyData";
import { safeJsonParse } from "lib/fetchHelpers";

const BASE_URL = "https://gallery.dailybruin.com/django/get_gallery_data";

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

  useEffect(() => {
    if (testing) {
      setLayout(dummyDataBig.layout);
      setEntries(dummyDataBig.data);
      return;
    }

    let cancelled = false;

    async function fetchGallery() {
      try {
        const galleryID = props?.galleryID ?? "";
        const res = await fetch(`${BASE_URL}/${galleryID}`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await safeJsonParse(res);

        if (!cancelled) {
          setLayout(data?.layout ?? null);
          setEntries(Array.isArray(data?.data) ? data.data : []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setLayout(null);
          setEntries([]);
        }
      }
    }

    fetchGallery();

    return () => {
      cancelled = true;
    };
  }, [props?.galleryID]);

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
    <>
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
    </>
  );
}

export default PGallery;
