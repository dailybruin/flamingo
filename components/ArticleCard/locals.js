import * as globals from "../globals";

export const headline = `
  font-family: ${globals.headlineFont};
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.25;
  color: ${globals.darkMode ? "#ffffff" : "#000000"};
  &:hover {
    color: ${globals.DBblue};
  }`;

export const excerpt = `
  font-family: ${globals.bodyFont};
  font-weight: 300;
  font-size: 0.75rem;
  color: ${globals.darkMode ? "#ffffff" : "#000000"};

  p {
    margin: 0;
  }
  
  br {
    display: none;
  }
  `;
