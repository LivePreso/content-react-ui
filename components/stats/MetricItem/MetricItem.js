import React from 'react';
import PropTypes from 'prop-types';
import { DeltaValue } from '@ui/components/stats';
import { DeltaValueBubble } from '@ui/components/stats/DeltaValueBubble';
import { isValidNumber } from '@ui/js/data-processing/utils/math-utils';
import { Errors } from '@ui/components/misc/Errors';
import style from './MetricItem.module.scss';

export function MetricItem(props) {
  const { title, metric, bubble } = props;

  return (
    <div className={style.metric}>
      <div className={style.metricName}>{title}</div>
      {isValidNumber(metric.primary) ? (
        <DeltaValue className={style.deltaValue} theme="large" {...metric} />
      ) : (
        <Errors errors={['Data not found']} />
      )}
      {bubble && <DeltaValueBubble className={style.deltaValue} {...bubble} />}
    </div>
  );
}

MetricItem.propTypes = {
  title: PropTypes.string,
  metric: PropTypes.shape({ DeltaValue }.propTypes),
  bubble: PropTypes.shape({ DeltaValueBubble }.propTypes),
};

MetricItem.defaultProps = {
  title: '',
  metric: {},
  bubble: null,
};
