import * as globals from "../globals";

export const headline = `
  font-family: ${globals.headlineFont};
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.25;
  color: #000;
  &:hover {
    color: ${globals.DBblue};
  }`;

export const darkheadline = `
  font-family: ${globals.headlineFont};
  font-style: normal;
  font-weight: 550;
  font-size: 1.5rem;
  line-height: 1.25;
  color: #ddd;
  &:hover {
    color: ${globals.DBblue};
  }`;

export const excerpt = `
  font-family: ${globals.bodyFont};
  font-weight: 300;
  font-size: 0.75rem;
  color: #000;

  p {
    margin: 0;
  }
  
  br {
    display: none;
  }
  `;

export const darkexcerpt = `
  font-family: ${globals.bodyFont};
  font-weight: 300;
  font-size: 0.75rem;
  color: #ddd;

  p {
    margin: 0;
  }
  
  br {
    display: none;
  }
  `;
