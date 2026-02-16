import React, { useState, useContext } from 'react';
import { useModes } from '@livepreso/content-react';
import { AccordionToggleAll } from './AccordionToggleAll';

export const AccordionControlContext = React.createContext(null);

export const useAccordionControls = () => {
  const context = useContext(AccordionControlContext);
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

  const value = {
    registerRow,
    unregisterRow,
    isOpen,
    toggleRow,
    hasRows,
    expandAll,
    collapseAll,
    allRowsOpen,
  };

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
