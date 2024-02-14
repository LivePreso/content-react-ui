// get a column config, taking into account colspans of preceding rows
export function getColWidth(columnWidths, rowItems, targetItem) {
  const targetColumnIndex = rowItems.reduce(
    (_runningIndex, column, columnIndex) => {
      let runningIndex = _runningIndex;
      if (columnIndex >= rowItems.indexOf(targetItem)) return runningIndex;
      runningIndex += column.colSpan ? column.colSpan : 1;
      return runningIndex;
    },
    0,
  );
  return columnWidths[targetColumnIndex];
}
