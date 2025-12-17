import React from "react";
import css from "../../layouts/style.module.css";
import ReactMarkdown from "react-markdown";
import Media from "react-media";

function ContainerItem(props) {
  const renderRelated = () => {
    const list = props?.related_articles;

    // Must be a non-empty array
    if (!Array.isArray(list) || list.length === 0) return null;

    // Filter out invalid entries
    const cleaned = list.filter(
      item =>
        item &&
        typeof item === "object" &&
        typeof item.text === "string" &&
        item.text.trim() !== "" &&
        typeof item.url === "string" &&
        item.url.trim() !== ""
    );

    if (cleaned.length === 0) return null;

    return (
      <div className={css["related-links"]}>
        {cleaned.map((item, idx) => (
          <p key={idx} style={{ margin: "4px 0" }}>
            <b>[Related:{" "}
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.text}
                </a>
            ]</b>
          </p>
        ))}
      </div>
    );
  };

  let content = null;

  if (props.type == "center-photo") {
    content = (
      <div className={css["row"]}>
        <div className={css["center-img-col"]}>
          <img
            className={css["center-photo"]}
            src={props.img_url}
            alt="gallery-image"
          />
          <p className={css["credits"]}>{props.credits}</p>
        </div>
      </div>
    );
  } else if (props.type == "article-text") {
    if (props.layout_type == "alternating") {
      content = (
        <div className={css["row"]}>
          <p className={css["article-text"]}>
            <ReactMarkdown children={props.description} />
          </p>
        </div>
      );
    } else {
      content = (
        <div>
          <Media
            queries={{
              phone: "(max-width: 600px)",
              desktop: "(min-width: 601px)"
            }}
            defaultMatches={{ desktop: true }}
          >
            {matches => (
              <>
                {matches.phone && (
                  <p className={css["article-text-gallery-mobile"]}>
                    <ReactMarkdown children={props.description} />
                  </p>
                )}
                {matches.desktop && (
                  <p className={css["article-text-large-gallery"]}>
                    <ReactMarkdown children={props.description} />
                  </p>
                )}
              </>
            )}
          </Media>
        </div>
      );
    }
  } else if (props.type == "alt-photo") {
    if (props.first == 0) {
      content = (
        <div className={css["row"]}>
          <div className={css["caption"]}>
            <ReactMarkdown children={props.description} />
          </div>
          <div className={css["img-col"]}>
            <img
              className={css["image"]}
              src={props.img_url}
              alt="gallery-image"
            />
            <p className={css["credits"]} style={{ textAlign: "right" }}>
              {props.credits}
            </p>
          </div>
        </div>
      );
    } else {
      content = (
        <div className={css["row"]}>
          <div className={css["img-col"]}>
            <img
              className={css["image"]}
              src={props.img_url}
              alt="gallery-image"
            />
            <p className={css["credits"]}>{props.credits}</p>
          </div>
          <div className={css["caption"]}>
            <ReactMarkdown children={props.description} />
          </div>
        </div>
      );
    }
  } else if (props.type == "big-center-photo") {
    content = (
      <div>
        <img
          className={css["big-center-photo"]}
          src={props.img_url}
          alt="big-center-photo"
        />
        <p className={css["credits"]}>{props.credits}</p>
      </div>
    );
  } else if (props.type == "corrections-text") {
    content = (
      <div>
        <p className={css["credits"]}>
          <ReactMarkdown children={props.description} />
        </p>
      </div>
    );
  } else {
    /* Unknown type: do nothing */
    return null;
  }

  // Wrap all content + related link together
  return (
    <div>
      {content}
      {renderRelated()}
    </div>
  );
}

export default ContainerItem;
