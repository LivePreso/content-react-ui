import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Cell, Row } from '../../ui/Table';
import { SubTitleCell } from '../cells';
import style from './HeaderRow.module.scss';
import { CELL_TYPES } from '../table-constants';

/*  this is unique as it accepts the column config,
vs a series of cells, as its input */
export function HeaderRow(props) {
  const { columns, className, uid } = props;

  const children = columns.map((headerCellConfig) => {
    const { title, type, config, uid: colUid, width } = headerCellConfig;
    if (type === CELL_TYPES.SUBTITLE) {
      const { title: cellTitle, subtitle } = config;
      return (
        <SubTitleCell
          key={colUid}
          title={cellTitle}
          subtitle={subtitle}
          width={width}
        />
      );
    }
    return (
      <Cell key={colUid} width={width}>
        {title}
      </Cell>
    );
  });

  return (
    <Row key={uid} uid={uid} className={classNames(style.headerRow, className)}>
      {children}
    </Row>
  );
}

HeaderRow.propTypes = {
  uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
      title: PropTypes.string,
      config: PropTypes.oneOfType([PropTypes.shape(SubTitleCell.propTypes)]),
    }),
  ),
  className: PropTypes.string,
};

HeaderRow.defaultProps = {
  uid: 'row0',
  columns: [],
  className: '',
};
