import React from 'react';
import PropTypes from 'prop-types';

export function SampleEditableText(props) {
  const { title } = props;

  return (
    <>
      {title && (
        <h4>
          <strong>{title}</strong>
        </h4>
      )}
      <h5>
        <strong>Title/ highlighted content goes here</strong>
      </h5>
      <p>
        Lorem ipsum dolor sit amet, sectetur adipiscing elitUt enim ad minim
        veniam, quis nostrud exercitation dolor sit amet, sectetur quis nostrud.
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
      <p>
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
        fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
        sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
        sit amet, consectetur
      </p>
    </>
  );
}

SampleEditableText.propTypes = {
  title: PropTypes.string
};

SampleEditableText.defaultProps = {
  title: ''
};
