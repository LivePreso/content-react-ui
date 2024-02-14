import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '../Row';

export function BodyRow(props) {
  const { children, className, uid } = props;

  return (
    <Row key={uid} className={className}>
      {children}
    </Row>
  );
}

BodyRow.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ...Row.propTypes,
};

BodyRow.defaultProps = {
  ...Row.defaultProps,
};
