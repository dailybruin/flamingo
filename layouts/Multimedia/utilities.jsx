import PhotoCard from "../../components/PhotoCard";

export function buildPhotoCard(story) {
  if (story != undefined) {
    return (
      <div className="grid-item">
        <PhotoCard
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

export function buildPhotoList(stories) {
  let postArray = [];
  for (let story of stories) {
    postArray.push(buildPhotoCard(story));
  }
  return postArray;
}

/**
 * Trims multimedia posts for client-side infinite scroll.
 * Only keeps fields needed for PhotoCard rendering.
 */
export function trimMultimediaPosts(posts) {
  if (!Array.isArray(posts)) return [];
  
  return posts.map(post => ({
    title: post.title,
    link: post.link,
    coauthors: post.coauthors,
    excerpt: post.excerpt,
    _embedded: {
      "wp:featuredmedia": post._embedded?.["wp:featuredmedia"]?.map(media => ({
        source_url: media.source_url,
      })) || [],
    },
  }));
}
