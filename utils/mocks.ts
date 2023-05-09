import { datatype, lorem } from 'faker';
import { HistoryEntries, HistoryEntry } from 'types/history';
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

function makeMockHistoryEntry(attributes?: Partial<HistoryEntry>): HistoryEntry {
  const id = Math.random() < 0.5 ? datatype.uuid() : undefined;
  const slug = Math.random() < 0.5 ? lorem.slug() : undefined;

  return {
    id: attributes?.id ?? id,
    slug: attributes?.slug ?? slug,
    title: attributes?.title ?? datatype.string(),
  };
}

export function makeMockHistoryEntries(count: number): HistoryEntries {
  if (count === 0) {
    return [];
  }

  return new Array(count).
    fill({}).
    map(() => makeMockHistoryEntry());
}
