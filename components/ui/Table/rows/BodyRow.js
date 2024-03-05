import React from 'react';
import { Row } from '../Row';

export function BodyRow(props) {
  const { children, className } = props;

  return <Row className={className}>{children}</Row>;
}

BodyRow.propTypes = {
  ...Row.propTypes,
};

BodyRow.defaultProps = {
  ...Row.defaultProps,
};
