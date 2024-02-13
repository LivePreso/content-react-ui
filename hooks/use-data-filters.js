import { useState } from 'react';
import { useContext } from '@livepreso/content-react';
import {
  defaultMonthRanges,
  getGranularityOptions,
} from '@ui/components/ui/AgodaFilter/data-filter-options';

/**
 * Gets and sets current data filter selections
 *
 * Example:
 *
 *  const [dataFilters, setDataFilters] = useDataFilters(options);
 */
export function useDataFilters({ excludeDayGranularity } = {}) {
  const granularityOptions = getGranularityOptions({
    excludes: excludeDayGranularity ? ['day'] : [],
  });

  let [defaultGranularity] = useContext(
    'data_filters.default_granularity',
    granularityOptions[0],
  );

  const [defaultMonths] = useContext(
    'data_filters.default_months',
    defaultMonthRanges[0],
  );

  // replace if 'day' granularity selected in fieldsets when should be excluded
  if (excludeDayGranularity && defaultGranularity === 'day') {
    /* eslint-disable-next-line prefer-destructuring */
    defaultGranularity = granularityOptions[1];
  }

  const [includeMTD] = useContext('data_filters.include_mtd', false);

  const [granularity, setGranularity] = useState(defaultGranularity);
  const [months, setMonths] = useState(defaultMonths);

  function setDataFilters(filters) {
    if (filters.months != null) {
      setMonths(filters.months);
    }
    if (filters.granularity != null) {
      setGranularity(filters.granularity);
    }
  }

  const dataFilters = { granularity, months, includeMTD };

  return [dataFilters, setDataFilters];
}
