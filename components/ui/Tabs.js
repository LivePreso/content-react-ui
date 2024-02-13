import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row } from '@ui/components/layout';
import { Tab } from './Tab';
import style from './Tabs.module.scss';

export function Tabs({
  className,
  selected,
  items,
  renderItem,
  onChange,
  disabled,
}) {
  const classes = classNames(className, style.tabs);

  const tabs = items.map((tab, idx) => {
    const active = tab.value === selected;

    if (typeof renderItem === 'function') {
      return renderItem({ index: idx, ...tab }, active);
    }

    return (
      <Tab
        index={idx}
        key={tab.value}
        label={tab.label}
        active={active}
        disabled={disabled}
        onClick={() => onChange(tab.value)}
      />
    );
  });

  return (
    <Row className={classes} gap="none" role="tablist">
      {tabs}
    </Row>
  );
}

Tabs.propTypes = {
  selected: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      className: PropTypes.string,
      labelClassName: PropTypes.string,
    }),
  ),
  renderItem: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Tabs.defaultProps = {
  items: [],
  renderItem: null,
  disabled: false,
  onChange: () => {},
  className: '',
};
