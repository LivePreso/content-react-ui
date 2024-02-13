import { uniqueId } from 'lodash-es';

export function addUids(targetArray, uidParam = 'uid', prefix = null) {
  if (!targetArray) return targetArray;
  return targetArray.map((element) => {
    if (element[uidParam]) return element;
    return { ...element, [uidParam]: uniqueId(prefix) };
  });
}

/** iterates both rows and cells in a table to add UIDs */
export function addRowAndCellUids(rows, uidParam = 'uid', prefix = 'id-') {
  return addUids(
    rows.map((row) => ({ ...row, cells: addUids(row.cells) })),
    uidParam,
    prefix,
  );
}
