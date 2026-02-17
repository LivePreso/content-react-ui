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
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [expandByDefault, setExpandByDefault] = useState(isPdfScreenshot);

  const isOpen = (uid) => expandedRows.has(uid);

  const hasRows = registry.size > 0;
  const allRowsOpen = hasRows && expandedRows.size === registry.size;

  const registerRow = (uid) => {
    setRegistry((prev) => new Set(prev).add(uid));

    if (expandByDefault) {
      setExpandedRows((prev) => new Set(prev).add(uid));
    }
  };

  const unregisterRow = (uid) => {
    setRegistry((prev) => {
      const newSet = new Set(prev);
      newSet.delete(uid);
      return newSet;
    });
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      newSet.delete(uid);
      return newSet;
    });
  };

  const toggleRow = (uid) => {
    setExpandedRows((prev) => {
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
    setExpandedRows(new Set(registry));
    setExpandByDefault(true);
  };

  const collapseAll = () => {
    setExpandedRows(new Set());
    setExpandByDefault(false);
  };

  const value = useMemo(
    () => ({
      registerRow,
      unregisterRow,
      isOpen,
      toggleRow,
      hasRows,
      expandAll,
      collapseAll,
      allRowsOpen,
      hasController: true,
    }),
    [
      registerRow,
      unregisterRow,
      isOpen,
      toggleRow,
      hasRows,
      expandAll,
      collapseAll,
      allRowsOpen,
    ],
  );

  return (
    <AccordionControlContext.Provider value={value}>
      {hasRows && (
        <div style={{ position: 'relative' }}>
          <AccordionToggleAll />
        </div>
      )}

      {children}
    </AccordionControlContext.Provider>
  );
}
