import PhotoCard from "../../components/PhotoCard";

export function buildPhotoCard(story) {
  // 1. Immediate safety check: if 'story' is null/undefined, render nothing.
  if (!story) {
    return null;
  }

  // 2. Extract data safely with fallbacks
  const headline = story.title?.rendered ?? "Untitled";
  const link = story.link ?? "#";
  const authors = story.coauthors ?? [];

  // 3. Safely grab the image object, URL, and dimensions
  const featuredMedia = story._embedded?.["wp:featuredmedia"]?.[0];
  const imageUrl = featuredMedia?.source_url ?? "";
  
  // Extract dimensions (default to 0 if missing so Next/Image can handle it safely)
  const imgWidth = featuredMedia?.media_details?.width ?? 0;
  const imgHeight = featuredMedia?.media_details?.height ?? 0;

  const excerpt = story.excerpt?.rendered ?? "";

  return (
    <div className="grid-item">
      <PhotoCard
        headline={headline}
        href={`/post/[slug]`}
        as={link}
        link={link}
        authors={authors}
        image={imageUrl}
        imageWidth={imgWidth}
        imageHeight={imgHeight}
        excerpt={excerpt}
      />
    </div>
  );
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
    title: { rendered: post.title?.rendered },
    link: post.link,
    coauthors: post.coauthors,
    excerpt: { rendered: post.excerpt?.rendered },
    _embedded: {
      "wp:featuredmedia": post._embedded?.["wp:featuredmedia"]?.map(media => ({
        source_url: media.source_url,
        media_details: media.media_details ? {
          width: media.media_details.width,
          height: media.media_details.height,
        } : null,
      })) || [],
    },
  }));
}
