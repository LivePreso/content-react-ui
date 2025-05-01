import {
  VALID_INLINE_FORMATS,
  VALID_BLOCK_ELEMENTS,
  VALID_LIST_ELEMENTS,
} from './constants';

export function getValidTags(toolbar) {
  const validTags = [...VALID_INLINE_FORMATS];

  if (toolbar.includes('link')) {
    validTags.push('a');
  }

  if (toolbar.includes('format')) {
    validTags.push(...VALID_BLOCK_ELEMENTS);
  }

  if (toolbar.includes('list')) {
    validTags.push(...VALID_LIST_ELEMENTS);
  }

  return validTags;
}
