import React from 'react';
import { Row } from '../Row';

export function BodyRow(props) {
  const { children, className, ...rowProps } = props;

  return (
    <Row className={className} {...rowProps}>
      {children}
    </Row>
  );
}

BodyRow.propTypes = {
  ...Row.propTypes,
};

BodyRow.defaultProps = {
  ...Row.defaultProps,
};
