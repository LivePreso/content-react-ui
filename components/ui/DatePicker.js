import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { CalendarIcon } from '../icons';
import style from './DatePicker.module.scss';

export function DatePicker({
  className,
  iconClassName,
  value,
  icon,
  onChange,
  dateFormat,
  minDate,
  maxDate,
}) {
  // const slideEl = Bridge?.Slides.getArticle()[0];
  const classes = classNames(className, style.datePicker);

  // TODO: Inline is a little bit better... not quite though, will still need to be hidden etc.
  // const options = { wrap: true, dateFormat, inline: true };
  const options = { wrap: true, dateFormat };

  // if (slideEl) options.appendTo = slideEl;
  if (minDate) options.minDate = minDate;
  if (maxDate) options.maxDate = maxDate;

  const handleChange = ([selectedDate]) => {
    onChange(selectedDate);
  };

  // TODO: try using the onOpen function to DOM manipulate the calendar into the scale and position you want

  return (
    <div className={style.wrapper}>
      <Flatpickr
        data-input
        value={value}
        onChange={handleChange}
        options={options}
      >
        <div className={classNames(iconClassName, style.icon)}>
          {icon || <CalendarIcon />}
        </div>
        <input type="text" data-input className={classes} />
      </Flatpickr>
    </div>
  );
}

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  onChange: PropTypes.func,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  icon: PropTypes.node,
};

DatePicker.defaultProps = {
  value: null,
  className: null,
  iconClassName: null,
  onChange: () => {},
  minDate: null,
  maxDate: null,
  dateFormat: 'j / n / Y',
  icon: null,
};
