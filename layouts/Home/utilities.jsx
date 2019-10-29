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

export function buildStoryList(type, list) {
  const mappedList = list.map(index => {
    return {
      title: index.title.rendered,
      text: index.excerpt.rendered,
      link: `/post/${index.slug}`,
    }
  })
  mappedList[1].text = "";
  mappedList[2].text = "";
  return (
    <StoryList
      type={type}
      story={mappedList}
      image={{
        src: list[0]._embedded['wp:featuredmedia'][0].source_url,
        alt: 'N/A',
      }}
    />
  )
}
