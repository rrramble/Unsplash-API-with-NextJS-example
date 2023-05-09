import { datatype, lorem } from 'faker';
import { SearchTopic, SearchTopics } from 'types/search-tags';

function makeMockSearchTopic(attributes?: Partial<SearchTopic>): SearchTopic {
  return {
    id: attributes?.id ?? datatype.uuid(),
    slug: attributes?.slug ?? lorem.slug(),
    title: attributes?.slug ?? datatype.string(),
  };
}

export function makeMockSearchTopics(count: number): SearchTopics {
  return new Array(count).
    fill({}).
    map(() => makeMockSearchTopic());
}
