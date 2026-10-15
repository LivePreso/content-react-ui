import { useTargetKey } from '@livepreso/content-react';

/**
 * The target's key with an id after it, for a field whose key genuinely cannot
 * be declared - one built from a value at render time, or read rather than
 * rendered.
 *
 * Prefer declaring the component with defineEditableSource where the key can be
 * expressed as a template: a declared key is discovered by the build, and a key
 * composed here is invisible to everything outside the deck.
 *
 * This used to strip the template- prefix itself and carry a defineBuildComputable
 * twin that composed the same key at build time, with a comment asking whoever
 * touched one to remember the other. useTargetKey is already the stripped key,
 * and the build reads declarations now, so both halves of that are gone.
 */
export function useSlideKeyPrefix(id) {
  const targetKey = useTargetKey();

  return `${targetKey}-${id}`;
}
