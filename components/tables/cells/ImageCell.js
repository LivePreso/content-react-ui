import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Cell } from '@ui/components/ui/Table';
import style from './ImageCell.module.scss';

export function ImageCell(props) {
  const { label, imageStyle, ...cellProps } = props;

  const imageClasses = classNames(imageStyle, style.image);

  return (
    <Cell {...cellProps}>
      {label && (
        <h5>
          <strong>{label}</strong>
        </h5>
      )}
      <div className={imageClasses} />
    </Cell>
  );
}

ImageCell.propTypes = {
  label: PropTypes.string,
  imageStyle: PropTypes.string.isRequired,
  ...Cell.propTypes,
};

ImageCell.defaultProps = {
  label: null,
  ...Cell.defaultProps,
};
