import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import 'flatpickr/dist/themes/airbnb.css';
import Flatpickr from 'react-flatpickr';
import { Row } from '../layout';
import { Button } from './Button';
import { CalendarIcon, CloseIcon } from '../icons';
import style from './DatePicker.module.scss';

export function DatePicker({
  className = null,
  iconClassName = null,
  value = null,
  icon = null,
  removeIcon = null,
  onChange = () => {},
  dateFormat = 'j / n / Y',
  minDate = null,
  maxDate = null,
  canRemove = false,
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

  const handleClear = () => {
    onChange(null);
  };

  // TODO: try using the onOpen function to DOM manipulate the calendar into the scale and position you want

  return (
    <Row className={style.wrapper} width="100%">
      <Flatpickr
        data-input
        value={value}
        onChange={handleChange}
        options={options}
      >
        <div
          className={classNames(iconClassName, style.icon, style.calendarIcon)}
        >
          {icon || <CalendarIcon />}
        </div>
        <input type="text" data-input className={classes} />
      </Flatpickr>

      {canRemove && (
        <Button
          className={style.removeButton}
          leftIcon={removeIcon || <CloseIcon className={style.icon} />}
          variant="text"
          size="small"
          onClick={handleClear}
          disabled={!value}
        />
      )}
    </Row>
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
  removeIcon: PropTypes.node,
  canRemove: PropTypes.bool,
};
