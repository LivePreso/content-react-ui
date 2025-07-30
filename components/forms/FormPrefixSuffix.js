import React from 'react';

import { SUFFIX_AREA } from './constants';

export function FormPrefixSuffix({ className, value }) {
  if (!value) return null;

  if (value === SUFFIX_AREA)
    return (
      <span className={className}>
        m<sup>2</sup>
      </span>
    );

  return <span className={className}>{value}</span>;
}
