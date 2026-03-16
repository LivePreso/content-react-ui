import React from 'react';
import PropTypes from 'prop-types';

export function SampleParagraph({ title = '', content = '' }) {
  return (
    <>
      {title && (
        <h5>
          <strong>{title}</strong>
        </h5>
      )}
      <p>
        {content ||
          `Lorem ipsum dolor sit amet, sectetur adipiscing elitUt enim ad minim
        veniam, quis nostrud exercitation dolor sit amet, sectetur quis nostrud`}
      </p>
    </>
  );
}

SampleParagraph.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
