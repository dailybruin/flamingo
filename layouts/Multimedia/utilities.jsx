import PhotoCard from "../../components/PhotoCard";

export function buildPhotoCard(story) {
  if (story != undefined) {
    return (
      <div className="grid-item">
        <PhotoCard
          headline={story.title != undefined ? story.title.rendered : ""}
          href={`/post/[slug]`}
          as={`/post/${story.slug}`}
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

export function buildPhotoList(stories) {
  let postArray = [];
  for (let story of stories) {
    postArray.push(buildPhotoCard(story));
  }
  return postArray;
}
