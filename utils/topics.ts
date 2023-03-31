import { SearchTopic, SearchTopics } from 'types/search-tags';

export function getTopicByText(topics: SearchTopics, text: string): SearchTopic | null {
  text = text.toLowerCase()

  for (const topic of topics) {
    if (
      topic.slug.toLocaleLowerCase() === text ||
      topic.title.toLocaleLowerCase() === text ||
      false
    ) {
      return topic
    }
  }

  return null
}
