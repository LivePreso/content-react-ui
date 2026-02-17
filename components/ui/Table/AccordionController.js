import React, { useState, useContext, useMemo } from 'react';

import { useModes } from '@livepreso/content-react';

import { AccordionToggleAll } from './AccordionToggleAll';

export const AccordionControlContext = React.createContext({
  registerRow: () => {},
  unregisterRow: () => {},
  isOpen: () => false,
  toggleRow: () => {},
  hasRows: false,
  expandAll: () => {},
  collapseAll: () => {},
  allRowsOpen: false,
  hasController: false,
});

export const useAccordionControls = () => {
  const context = useContext(AccordionControlContext);

  if (!context.hasController) {
    throw new Error(`
      useAccordionControls must be used within an AccordionController.
      Please wrap your table with AccordionController to use this hook.
    `);
  }

  return context;
};

export function AccordionController({ children }) {
  const { isPdfScreenshot } = useModes();
  const [registry, setRegistry] = useState(new Set());
  const [exceptions, setExceptions] = useState(new Set());
  const [isAllOpen, setIsAllOpen] = useState(isPdfScreenshot);

  const isRowExpanded = (uid) => {
    // If Global is OPEN, an exception means CLOSED.
    // If Global is CLOSED, an exception means OPEN.
    return isAllOpen ? !exceptions.has(uid) : exceptions.has(uid);
  };

  const hasRows = registry.size > 0;
  const allRowsOpen =
    (isAllOpen && exceptions.size === 0) ||
    (!isAllOpen && exceptions.size === registry.size);

  const registerRow = (uid) => {
    setRegistry((prev) => new Set(prev).add(uid));
  };

  const unregisterRow = (uid) => {
    setRegistry((prev) => {
      const newSet = new Set(prev);
      newSet.delete(uid);
      return newSet;
    });
  };

  const toggleRow = (uid) => {
    setExceptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(uid)) {
        newSet.delete(uid);
      } else {
        newSet.add(uid);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setIsAllOpen(true);
    setExceptions(new Set());
  };

  const collapseAll = () => {
    setIsAllOpen(false);
    setExceptions(new Set());
  };

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
