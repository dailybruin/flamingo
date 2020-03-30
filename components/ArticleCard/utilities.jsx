export function renderAuthors(authors) {
  let renderedAuthors = [];
  if (authors != undefined && authors != null) {
    if (authors.length === 0) {
      renderedAuthors = <span>Daily Bruin Staff</span>;
    } else {
      for (const i in authors) {
        if (i > 0 && authors.length > 2) {
          renderedAuthors.push(<span>, </span>);
        }
        if (i == authors.length - 1 && authors.length > 1) {
          renderedAuthors.push(
            <span>{authors.length == 2 ? " " : ""}and </span>
          );
        }
        renderedAuthors.push(
          <a href={`/author/${authors[i]["user_nicename"]}`}>
            {authors[i]["display_name"]}
          </a>
        );
      }
    }
  }
  return renderedAuthors;
}
