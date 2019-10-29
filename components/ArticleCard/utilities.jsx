/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Link from "next/link";
import * as globals from "../globals";
import * as locals from "./locals";

export function date2string(d) {
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var month = months[d.getMonth()];
  var date = d.getDate();
  var hour = d.getHours();
  var min = addZero(d.getMinutes());
  var s = month + " " + date + ", " + hour + ":" + min;
  return s;
}

export function collectAuthors(a) {
  const authors = [];
  if (a.length === 0) {
    authors[0] = <span>Daily Bruin Staff</span>;
  } else {
    for (const author of a) {
      authors.push(
        <Link href={author.href} as={author.as}>
          <a
            href={author.as}
            css={css`
              text-decoration: none;
              color: ${globals.DBblue};

              &:hover {
                text-decoration: underline;
              }
            `}
          >
            {author.name}
          </a>
        </Link>
      );
    }
  }
  return authors;
}
