import PhotoCard from "../../components/PhotoCard";

export function buildPhotoCard(story, darkmode) {
  if (story != undefined) {
    return (
      <div className="grid-item">
        <PhotoCard
          darkmode={darkmode}
          headline={story.title != undefined ? story.title.rendered : ""}
          href={`/post/[slug]`}
          as={story.link}
          link={story.link}
          authors={story.coauthors}
          image={
            story._embedded["wp:featuredmedia"] != undefined
              ? story._embedded["wp:featuredmedia"][0].source_url
              : ""
          }
          excerpt={story.excerpt.rendered}
        />
      </div>
    );
  } else {
    return null;
  }
}

export function buildPhotoList(stories, darkmode) {
  let postArray = [];
  for (let story of stories) {
    postArray.push(buildPhotoCard(story, darkmode));
  }
  return postArray;
}
