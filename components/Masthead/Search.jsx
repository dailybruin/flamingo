/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function Search(props) {
  return (
    <div
      css={css`
        position: fixed;
        width: 500px;
        height: 500px;
      `}
    >
      <script
        async
        src="https://cse.google.com/cse.js?cx=006392094391191733900:lbuv5c9wef4"
      ></script>
      <div class="gcse-search"></div>
    </div>
  );
}
