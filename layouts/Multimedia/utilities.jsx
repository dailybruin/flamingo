import PhotoCard from "../../components/PhotoCard";

export function buildPhotoCard(story) {
  return (
    <div className="grid-item">
      <PhotoCard
        headline={story.title.rendered}
        href={`/post/[slug]`}
        as={`/post/${story.slug}`}
        image={story._embedded["wp:featuredmedia"][0].source_url}
        excerpt={story.excerpt.rendered}
      />
    </div>
  );
}

export function buildPhotoList(stories) {
  var i;
  let postArray = [];
  for (i = 0; i < stories.length; i++) {
    postArray.push(buildPhotoCard(stories[i]));
  }
  return postArray;
}
