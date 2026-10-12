import * as globals from "../globals";

/** Outer wrapper: same column width as the article text around it */
export const wrapper = `
  max-width: 640px;
  margin: 24px auto;
  font-family: ${globals.bodyFont};
`;

/** Positions the arrows over the photo area */
export const stage = `
  position: relative;
  background: ${globals.lightGray};
`;

/** Horizontally scrolling, snap-to-slide track */
export const track = `
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** One slide: a fixed 3:2 box so the page doesn't jump between photos */
export const slide = `
  position: relative;
  flex: 0 0 100%;
  scroll-snap-align: center;
  padding-top: 66.67%;
  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Previous / next buttons: translucent white, solid on hover */
export const arrow = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: background 0.15s;
  color: ${globals.black};
  font-size: 28px;
  line-height: 44px;
  cursor: pointer;
  &:hover {
    background: ${globals.white};
  }
  &:disabled {
    display: none;
  }
`;

/** "2 / 8" counter in the corner of the photo */
export const counter = `
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 3px 10px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.75);
  color: ${globals.white};
  font-size: 13px;
  font-weight: 700;
`;

/** Caption and credit under the photo; matches inline photo captions */
export const caption = `
  margin-top: 6px;
  color: gray;
  font-size: 0.85rem;
  line-height: 1.5;
  & p {
    display: inline;
    margin: 0;
  }
`;
