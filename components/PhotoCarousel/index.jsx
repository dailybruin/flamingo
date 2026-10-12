/**
 * PhotoCarousel component: a swipeable photo carousel built from a Gallery
 * Maker gallery, shown inside an article where an editor typed
 * `[carousel <gallery id>]`.
 *
 * Renders nothing if the gallery can't be loaded, has no photos, or the
 * carousel hits an error while rendering; the article around it is unaffected.
 *
 * Props:
 *   galleryID
 */

import React, { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";
import ReactMarkdown from "react-markdown";

import { safeJsonParse, fetchWithTimeout } from "lib/fetchHelpers";
import { buildSlides } from "./utilities";
import * as styles from "./styles";

const BASE_URL = "https://gallery.dailybruin.com/django/get_gallery_data";
const SLIDE_MS = 300;

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function Carousel({ galleryID }) {
  // null while loading, [] if the gallery failed or is empty
  const [slides, setSlides] = useState(null);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  // Slide an arrow click is heading to, and the animation frame taking it there
  const targetRef = useRef(0);
  const frameRef = useRef(null);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  useEffect(() => {
    let cancelled = false;

    async function fetchGallery() {
      try {
        const res = await fetchWithTimeout(`${BASE_URL}/${galleryID}`);
        const data = await safeJsonParse(res);
        if (!cancelled) setSlides(buildSlides(data?.data));
      } catch (err) {
        console.error(err);
        if (!cancelled) setSlides([]);
      }
    }

    fetchGallery();

    return () => {
      cancelled = true;
    };
  }, [galleryID]);

  if (slides && slides.length === 0) return null;

  // Reserve the photo area while the gallery loads
  if (!slides) {
    return (
      <div css={css`${styles.wrapper}`}>
        <div css={css`${styles.stage}`}>
          <div css={css`${styles.slide}`} />
        </div>
      </div>
    );
  }

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;

    const target = Math.max(0, Math.min(i, slides.length - 1));
    targetRef.current = target;
    const from = track.scrollLeft;
    const to = target * track.clientWidth;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.style.scrollSnapType = "";
      track.scrollLeft = to;
      return;
    }

    // Snapping fights a scripted scroll, so it's off while the slide animates
    track.style.scrollSnapType = "none";
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / SLIDE_MS, 1);
      track.scrollLeft = from + (to - from) * easeInOut(t);
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = null;
        track.style.scrollSnapType = "";
      }
    };
    frameRef.current = requestAnimationFrame(step);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    // A swipe (not an arrow click) moves the target along with it
    if (frameRef.current === null) targetRef.current = i;
    if (i !== index) setIndex(i);
  };

  const current = slides[Math.min(index, slides.length - 1)];

  return (
    <div css={css`${styles.wrapper}`}>
      <div css={css`${styles.stage}`}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          tabIndex={0}
          role="group"
          aria-label="Photo carousel"
          css={css`${styles.track}`}
        >
          {slides.map((slide, i) => (
            <div key={i} css={css`${styles.slide}`}>
              <img
                src={slide.img_url}
                alt={slide.caption || "Carousel photo"}
                // Load the neighbours early so they're ready before they slide in
                loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          disabled={index === 0}
          onClick={() => goTo(targetRef.current - 1)}
          css={css`${styles.arrow} left: 8px;`}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next photo"
          disabled={index >= slides.length - 1}
          onClick={() => goTo(targetRef.current + 1)}
          css={css`${styles.arrow} right: 8px;`}
        >
          ›
        </button>

        <div css={css`${styles.counter}`}>
          {index + 1} / {slides.length}
        </div>
      </div>

      <div css={css`${styles.caption}`}>
        <ReactMarkdown children={current.caption} />
        {/* Skip the credit when the caption already ends with it */}
        {current.credits &&
          !current.caption.includes(current.credits) &&
          ` (${current.credits})`}
      </div>
    </div>
  );
}

// Keeps a carousel error from taking the rest of the article down with it
class CarouselBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("PhotoCarousel failed to render:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function PhotoCarousel({ galleryID }) {
  return (
    <CarouselBoundary>
      <Carousel galleryID={galleryID} />
    </CarouselBoundary>
  );
}
