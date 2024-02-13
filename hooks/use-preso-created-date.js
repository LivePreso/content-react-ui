import { useContext } from '@livepreso/content-react';

export function usePresoCreatedDate() {
  const [deckCreationTime] = useContext('preso_date', null);
  if (!deckCreationTime) return new Date();
  return new Date(deckCreationTime);
}
