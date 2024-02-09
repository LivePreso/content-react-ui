import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './EditIcon.module.scss';

export function EditIcon({ className, color }) {
  const classes = classNames(className, style.editIcon);

  return (
    <svg
      className={classes}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon">
        <path
          id="Shape"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.58333 2.50006C9.81345 2.50006 10 2.68661 10 2.91673V3.75006C10 3.98018 9.81345 4.16673 9.58333 4.16673H4.16667V15.8334H15.8333V10.4167C15.8333 10.1866 16.0199 10.0001 16.25 10.0001H17.0833C17.3135 10.0001 17.5 10.1866 17.5 10.4167V17.0834C17.5 17.3135 17.3135 17.5001 17.0833 17.5001H2.91667C2.68655 17.5001 2.5 17.3135 2.5 17.0834V2.91673C2.5 2.68661 2.68655 2.50006 2.91667 2.50006H9.58333ZM16.1275 1.96091L18.0383 3.87165C18.201 4.03437 18.201 4.29819 18.0383 4.46091L10.8096 11.6676L8.33333 11.6667L8.30964 9.16757L15.5387 1.96046C15.7015 1.79816 15.965 1.79836 16.1275 1.96091Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

EditIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string
};

EditIcon.defaultProps = {
  color: null,
  className: ''
};
