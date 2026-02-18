import React, { useState, useMemo, useCallback } from 'react';

import { useModes } from '@livepreso/content-react';
import { AccordionControlContext } from './use-accordion-controls';

import { AccordionToggleAll } from './AccordionToggleAll';

export function AccordionController({ children }) {
  const { isPdfScreenshot } = useModes();
  const [registry, setRegistry] = useState(new Set());
  const [exceptions, setExceptions] = useState(new Set());
  const [isAllOpen, setIsAllOpen] = useState(isPdfScreenshot);

  const isRowExpanded = useCallback(
    (uid) => {
      // If Global is OPEN, an exception means CLOSED.
      // If Global is CLOSED, an exception means OPEN.
      return isAllOpen ? !exceptions.has(uid) : exceptions.has(uid);
    },
    [isAllOpen, exceptions],
  );

  const hasRows = registry.size > 0;
  const allRowsOpen =
    (isAllOpen && exceptions.size === 0) ||
    (!isAllOpen && exceptions.size === registry.size);

  const registerRow = useCallback(
    (uid) => {
      setRegistry((prev) => new Set(prev).add(uid));
    },
    [setRegistry],
  );

  const unregisterRow = useCallback(
    (uid) => {
      setRegistry((prev) => {
        const newSet = new Set(prev);
        newSet.delete(uid);
        return newSet;
      });
    },
    [setRegistry],
  );

  const toggleRow = useCallback(
    (uid) => {
      setExceptions((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(uid)) {
          newSet.delete(uid);
        } else {
          newSet.add(uid);
        }
        return newSet;
      });
    },
    [setExceptions],
  );

  const expandAll = useCallback(() => {
    setIsAllOpen(true);
    setExceptions(new Set());
  }, [setIsAllOpen, setExceptions]);

  const collapseAll = useCallback(() => {
    setIsAllOpen(false);
    setExceptions(new Set());
  }, [setIsAllOpen, setExceptions]);

  const value = useMemo(
    () => ({
      registerRow,
      unregisterRow,
      isRowExpanded,
      toggleRow,
      hasRows,
      expandAll,
      collapseAll,
      isAllOpen,
      allRowsOpen,
      hasController: true,
    }),
    [
      registerRow,
      unregisterRow,
      isRowExpanded,
      toggleRow,
      hasRows,
      expandAll,
      collapseAll,
      isAllOpen,
      allRowsOpen,
    ],
  );

  return (
    <AccordionControlContext.Provider value={value}>
      {hasRows && !isPdfScreenshot && (
        <div style={{ position: 'relative' }}>
          <AccordionToggleAll />
        </div>
      )}

      {children}
    </AccordionControlContext.Provider>
  );
}
