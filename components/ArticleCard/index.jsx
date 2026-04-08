/**
 * ArticleCard: dispatcher component that renders the appropriate card variant
 * based on the `displayType` prop.
 *
 * Supported display types:
 *   vert, horz, long, full (default), mini, video, podcast, breaking, breakingOverview
 */
import * as React from "react";

import Vert from "./Vert";
import Horz from "./Horz";
import Long from "./Long";
import Full from "./Full";
import Mini from "./Mini";
import Video from "./Video";
import Podcast from "./Podcast";
import Breaking from "./Breaking";
import BreakingOverview from "./BreakingOverview";

/** Maps each displayType string to its corresponding card component */
const CARD_VARIANTS = {
  vert: Vert,
  horz: Horz,
  long: Long,
  full: Full,
  mini: Mini,
  video: Video,
  podcast: Podcast,
  breaking: Breaking,
  breakingOverview: BreakingOverview
};

export default function ArticleCard({ displayType, ...rest }) {
  const CardComponent = CARD_VARIANTS[displayType] || Full;
  return <CardComponent {...rest} />;
}
