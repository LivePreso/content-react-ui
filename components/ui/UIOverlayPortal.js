import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useTransitions } from '@livepreso/content-react';
import { SlideOverlayRefContext } from '../../contexts/slide-overlay-ref';

export function UIOverlayPortal({ children }) {
  const { entered, exiting, exited } = useTransitions();
  const slideRef = useContext(SlideOverlayRefContext);

  if (!slideRef.current || (!entered && !exiting) || exited) {
    return null;
  }

  return createPortal(children, slideRef.current);
}
