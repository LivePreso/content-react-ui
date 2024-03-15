/**
 * Takes all available props, and returns only keys that start with
 * 'data-'. This is useful for passing through all extra data- keys into
 * a particular element. Example:
 *
 * <div {...getDataProps(this.props}>...</div>
 */
export function getDataProps(props) {
  return Object.keys(props).reduce((resp, key) => {
    if (key.startsWith('data-')) {
      return {
        ...resp,
        [key]: props[key],
      };
    }
    return resp;
  }, {});
}
