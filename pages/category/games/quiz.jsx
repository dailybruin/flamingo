import PageWrapper from "../../../layouts/PageWrapper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Router from "next/router";
import SectionHeader from "../../../components/SectionHeader";
import { NEWS_QUIZ } from "../../../config";
import { newsQuizPagePath, validQuizSlug } from "../../../lib/newsQuiz";

const QUIZ_ORIGIN = new URL(NEWS_QUIZ.url).origin;

// Used until the quiz reports its real height, and for good if it never does
// (script blocked, old browser). The frame scrolls inside itself then, so
// nothing is cut off.
const FALLBACK_HEIGHT = 800;

function frameSrc(slug, archive) {
  if (archive) return `${QUIZ_ORIGIN}/archive`;
  return slug ? `${QUIZ_ORIGIN}/?slug=${slug}` : QUIZ_ORIGIN;
}

// How far down the page the sticky masthead reaches, so "bring the quiz into
// view" doesn't tuck its top under it.
// Looks at everything stacked at the top edge, not just the topmost element,
// so an overlay sitting above the masthead doesn't hide it.
function stickyOffset(container) {
  const x = container.getBoundingClientRect().left + 10;
  let offset = 0;
  for (let node of document.elementsFromPoint(x, 1)) {
    if (container.contains(node)) continue;
    for (; node && node !== document.body; node = node.parentElement) {
      const { position } = window.getComputedStyle(node);
      if (position === "sticky" || position === "fixed") {
        const rect = node.getBoundingClientRect();
        // Pinned to the top and shorter than half the screen: a header, not
        // a full-screen layer.
        if (rect.top <= 1 && rect.height < window.innerHeight / 2) {
          offset = Math.max(offset, rect.bottom);
        }
        break;
      }
    }
  }
  return offset;
}

function NewsQuiz({ slug, archive }) {
  const container = useRef(null);
  const frame = useRef(null);
  // Fixed for the life of the page. The quiz moves between screens inside
  // the frame, and the page's address follows it, but the frame itself must
  // never reload under the reader.
  const [src] = useState(() => frameSrc(slug, archive));
  const [height, setHeight] = useState(null);

  const showTop = useCallback(() => {
    if (!container.current) return;
    const top = container.current.getBoundingClientRect().top;
    const offset = stickyOffset(container.current);
    if (top >= offset) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({ top: top - offset - 6, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    // Whether the quiz has told us where it is yet. After that, a `fresh`
    // location means a link inside the quiz (an archive row, "Play this
    // week's quiz") loaded a new page in the frame. The reader clicked near
    // the bottom of the old one, so take them to the top of the new one.
    let located = false;

    const onMessage = (event) => {
      if (event.origin !== QUIZ_ORIGIN) return;
      if (!frame.current || event.source !== frame.current.contentWindow) return;
      const data = event.data;
      if (!data || data.source !== "db-quiz") return;

      if (data.type === "height") {
        const next = Number(data.height);
        if (Number.isFinite(next) && next > 0) setHeight(Math.min(Math.ceil(next), 20000));
      } else if (data.type === "top") {
        showTop();
      } else if (data.type === "location") {
        if (located && data.fresh === true) showTop();
        located = true;
        // Keep the address bar on the quiz being shown, so refreshing or
        // sharing the page lands on it rather than on whichever is current.
        const path = newsQuizPagePath({ slug: data.slug, archive: data.archive === true });
        if (path !== Router.asPath) {
          Router.replace(path, undefined, { shallow: true, scroll: false });
        }
      }
    };
    window.addEventListener("message", onMessage);

    // The quiz may have loaded before this page started listening (it's far
    // lighter than this page's scripts), and its first messages are gone.
    // Ask again. If the frame is still blank this goes nowhere, which is fine:
    // the quiz will speak up itself when it starts.
    try {
      frame.current.contentWindow.postMessage(
        { source: "db-quiz-host", type: "hello" },
        QUIZ_ORIGIN
      );
    } catch (err) {
      /* Nothing to do: the quiz reports on its own once it loads. */
    }

    return () => window.removeEventListener("message", onMessage);
  }, [showTop]);

  return (
    <>
      <Head>
        <title>{"News Quiz - Daily Bruin"}</title>
      </Head>

      <div style={{ padding: "6px" }}>
        <SectionHeader category={"Games"} />
      </div>

      <div style={{ padding: "6px" }}>
        <div
          ref={container}
          style={{
            backgroundColor: "white",
            boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.25)"
          }}
        >
          <iframe
            ref={frame}
            src={src}
            title="News Quiz"
            style={{
              display: "block",
              width: "100%",
              height: `${height || FALLBACK_HEIGHT}px`,
              border: "none"
            }}
          />
        </div>
      </div>
    </>
  );
}

NewsQuiz.getInitialProps = async ({ query }) => ({
  slug: validQuizSlug(query.slug),
  archive: query.view === "archive"
});

export default PageWrapper(NewsQuiz);
