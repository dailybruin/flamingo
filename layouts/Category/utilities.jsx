import ArticleCard from '../../components/ArticleCard'
import StoryList from '../../components/StoryList'

export function buildArticleCard(story) {
  return (
    <ArticleCard
      headline={story.title.rendered}
      excerpt={story.excerpt.rendered}
      href={`/post/[slug]`}
      as={`/post/${story.slug}`}
      // TODO: format date
      date={new Date(story.date)}
      authors={[
        {
          name: story._embedded.author[0].name,
          href: `/author/[slug]`,
          as: `/author/${story._embedded.author[0].slug}`,
        },
      ]}
      category={{
        name: story._embedded['wp:term'][0][0].name,
        href: `/category/[slug]`,
        as: `/category/${story._embedded['wp:term'][0][0].slug}`,
      }}
      imageurl={story._embedded['wp:featuredmedia'][0].source_url}
      caption={story._embedded['wp:featuredmedia'][0].caption.rendered}
    />
  )
}

export function buildArticleList(stories) {
    var i
    let postArray = []
    for (i = 0; i < stories.length; i++) {
      postArray.push(buildArticleCard(stories[i]))
    }
    return (postArray)
}
