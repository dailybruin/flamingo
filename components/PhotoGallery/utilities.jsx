export function renderPhotographers(photographers) {
  let renderedPhotographers = [];
  if (photographers != undefined && photographers != null) {
    if (photographers.length === 0) {
      renderedPhotographers = <span>Daily Bruin Staff</span>;
    } else {
      for (const i in photographers) {
        if (i > 0) {
          renderedPhotographers.push(<span>, </span>);
        }
        if (i === photographers.length - 2) {
          renderedPhotographers.push(<span>and </span>);
        }
        renderedPhotographers.push(
          <a
            href={`/author/${photographers[i].slug}`}
            dangerouslySetInnerHTML={{ __html: photographers[i].name }}
          ></a>
        );
      }
    }
  }
  return renderedPhotographers;
}
