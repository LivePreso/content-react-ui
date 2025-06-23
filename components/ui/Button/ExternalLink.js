import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useModes } from '@livepreso/content-react';
import { Button } from './Button';
import { buttonPropTypes, buttonDefaultProps } from './button-prop-types';
import style from './ExternalLink.module.scss';

export function ExternalLink({ url, onClick, ...buttonProps }) {
  const { isPdfScreenshot } = useModes();

  const openLink = useCallback(() => {
    onClick();
    if (!window.Bridge || isPdfScreenshot) return;
    Bridge.Navigation.openExternalLink(url);
  }, [isPdfScreenshot, onClick, url]);

  if (isPdfScreenshot) {
    return (
      <a href={url} target="_blank" rel="noreferrer" className={style.link}>
        <Button onClick={onClick} {...buttonProps} />
      </a>
    );
  }

  return <Button onClick={openLink} {...buttonProps} />;
}

ExternalLink.propTypes = {
  ...buttonPropTypes,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

ExternalLink.defaultProps = {
  ...buttonDefaultProps,
  onClick: () => {},
};
