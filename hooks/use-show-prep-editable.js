import trim from 'lodash-es/trim';
import { useModes, usePrepEditable } from '@livepreso/content-react';

/**
 * Returns true or false whether a prep editable should be shown, based on the following
 * logic:
 *
 * - Has the user changed the default value?
 * - If not, it should always show in prep mode, presomanager and during screenshots.
 */
export function useShowPrepEditable(id) {
  const { hasValue: hasEditableValue, value } = usePrepEditable(id);
  const { isPreview, isPresomanager, isThumbnailScreenshot } = useModes();

  const alwaysShowEditable =
    isPresomanager || isThumbnailScreenshot || isPreview;

  if (alwaysShowEditable) {
    return true;
  }

  return hasEditableValue && trim(value) !== '';
}
