import { useSlide } from '@livepreso/content-react';

export function useSlideKeyPrefix(id) {
  const { slideKey } = useSlide();

  // "template-" is added to the start of the slideKey of user and PM templates
  // this is not included in CWE field keys specified in the project.yaml and needs
  // to be removed when slideKey is used to generate a field key.
  const slideKeyPrefix = slideKey.startsWith('template-')
    ? slideKey?.replace('template-', '')
    : slideKey;

  const key = `${slideKeyPrefix}-${id}`;

  return key;
}
