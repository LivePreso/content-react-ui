import React from 'react';
import PropTypes from 'prop-types';
import { getColWidth } from '@deck/js/data-processing/utils/generate-table-layout';
import { Row } from '../../ui/Table';
import { CELL_TYPES_MAP, columnPropTypes } from '../table-constants';
import { TextCell } from '../cells';

export function BodyRow(props) {
  const { cells, columns, className, uid } = props;
  const children = cells.map(cell => {
    const { type, config, ...cellProps } = cell;
    const { width } = getColWidth(columns, cells, cell);
    // augment with a key
    cellProps.key = cellProps.uid;
    cellProps.width = width;

    const CellComponent = CELL_TYPES_MAP[type];

    if (!CellComponent) {
      const errorMessage = { value: `unknown component '${type}' ` };
      return <TextCell {...cellProps} config={errorMessage} />;
    }

    return <CellComponent {...cellProps} {...config} />;
  });

  // not augmenting this with anything
  return (
    <Row key={uid} className={className}>
      {children}
    </Row>
  );
}

BodyRow.propTypes = {
  // We're letting the components further down check the types
  // rather than trying to check at the top level due to complexity of the propTypes.
  /* eslint-disable react/forbid-prop-types */
  cells: PropTypes.arrayOf(PropTypes.object),
  /* eslint-enable react/forbid-prop-types */

  columns: columnPropTypes,
  ...Row.propTypes
};

BodyRow.defaultProps = {
  ...Row.defaultProps,
  columns: []
};
