import { isEmpty } from 'lodash-es';

export function useFeed(feedKey, defaultValue = {}) {
  const feed = Bridge.Feed.get(feedKey).raw();
  return isEmpty(feed) ? defaultValue : feed;
}
