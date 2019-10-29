import * as globals from '../globals'

export const headline = `
  font-family: ${globals.headlineFont};
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.15;
  color: #000000;
  &:hover {
    color: ${globals.DBblue};
  }`

export const excerpt = `
  font-family: ${globals.bodyFont};
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  color: #000000;

  p {
    margin: 0;
  }`
