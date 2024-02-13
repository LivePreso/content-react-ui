import { useMemo } from 'react';

/**
 * Takes a list of functions and returns it memoized (to prevent accidental re-rendering
 * in the chart).
 *
 * Optionally adds a base agoda theme.
 */
export function useChartTheme(themeFunctions, includeBaseTheme = true) {
  return useMemo(() => {
    if (!includeBaseTheme) {
      return themeFunctions;
    }
    return [...themeFunctions];
  }, [themeFunctions, includeBaseTheme]);
}
