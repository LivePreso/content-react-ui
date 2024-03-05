import { useSlideContext } from '@livepreso/content-react';

export function usePresoCreatedDate() {
  const [deckCreationTime] = useSlideContext('preso_date', null);
  if (!deckCreationTime) return new Date();
  return new Date(deckCreationTime);
}
