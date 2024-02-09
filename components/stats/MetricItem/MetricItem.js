import React from 'react';
import PropTypes from 'prop-types';
import { DeltaValue } from '@deck/components/stats';
import { DeltaValueBubble } from '@deck/components/stats/DeltaValueBubble';
import { isValidNumber } from '@deck/js/data-processing/utils/math-utils';
import { Errors } from '@deck/components/misc/Errors';
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
  bubble: PropTypes.shape({ DeltaValueBubble }.propTypes)
};

MetricItem.defaultProps = {
  title: '',
  metric: {},
  bubble: null
};
