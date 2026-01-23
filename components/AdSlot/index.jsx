import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/core";

/**
 * AdSlot component with reserved height to prevent CLS when ads load.
 * 
 * @param {string} zoneId - Broadstreet zone ID
 * @param {string} variant - "banner" (728x90), "medium" (300x250), "mobile" (320x100)
 */
export default function AdSlot({ zoneId, variant = "medium" }) {
  const heights = {
    banner: 90,
    medium: 250,
    mobile: 100,
  };

  const minHeight = heights[variant] || heights.medium;

  return (
    <div
      css={css`
        min-height: ${minHeight}px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      `}
    >
      <broadstreet-zone zone-id={zoneId}></broadstreet-zone>
    </div>
  );
}

