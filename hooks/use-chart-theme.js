import { useMemo } from 'react';

/**
 * Takes a list of functions and returns it memoized (to prevent accidental re-rendering
 * in the chart).
 */
export function useChartTheme(themeFunctions) {
  return useMemo(() => {
    return [...themeFunctions];
  }, [themeFunctions]);
}
