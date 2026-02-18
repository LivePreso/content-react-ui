import React, { useContext } from 'react';

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
