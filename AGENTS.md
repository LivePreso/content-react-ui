# AGENTS.md - Development Guide for content-react-ui

## Project Overview

This is a React component library for content creation, used with Storybook for documentation and development.

## Build / Lint / Test Commands

### Running the Project

```bash
# Start Storybook (development server on port 6006)
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Linting

ESLint and Prettier run automatically on commit via lint-staged and husky. To run manually:

```bash
# Run lint-staged (runs eslint --fix and prettier on staged files)
npm run lint-staged
```

Note: There is no dedicated `npm run lint` script. Linting is handled via pre-commit hooks.

### Testing

**No test framework is currently configured.** The test script echoes an error:

```bash
npm test
# Output: "Error: no test specified" && exit 1
```

To add tests, consider setting up Jest or Vitest.

---

## Code Style Guidelines

### General Conventions

- **Language**: JavaScript (ES2020+), React 18.3.1
- **File extensions**: `.js` for components/hooks/utils, `.stories.js` for Storybook stories
- **Component style**: Use function declarations (`export function ComponentName`)
- **No TypeScript**: This project uses PropTypes for runtime type checking

### Formatting (Prettier)

- **Single quotes** for all strings (enforced in `.prettierrc`)
- **No semicolons** (airbnb style)
- Run `npx prettier --write` before committing

### ESLint Configuration

Based on airbnb config with these key rules:

- `no-console`: Error (use console.warn/console.error sparingly)
- `react/prop-types`: Warning (use PropTypes for all components)
- `jsx-a11y/*`: Warnings for accessibility

### Imports

- Use named exports: `import { Component } from './path'`
- Group imports: React → external libs → internal components/utils → styles
- Avoid default exports for components

### Naming Conventions

- **Components**: PascalCase (`Table.js`, `Form.js`)
- **Hooks**: camelCase, prefix with `use` (`useContentDimensions.js`)
- **Utils**: camelCase (`data-formatting.js`)
- **CSS Classes**: kebab-case (enforced by stylelint: `^([a-z][a-z0-9]*)(-[a-z0-9]+)*$`)
- **Files**: Generally PascalCase for components, camelCase for utilities

### PropTypes

Always define PropTypes for components:

```javascript
import PropTypes from 'prop-types';

function MyComponent({ title, items = [] }) {
  // ...
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ),
};

MyComponent.defaultProps = {
  items: [],
};
```

### JSDoc Documentation

Use JSDoc for documenting components and functions:

```javascript
/**
 * Description of what this component does.
 *
 * @param {Object} props
 * @param {string} props.title - The title to display
 * @param {Array} props.items - List of items
 * @returns {React.ReactNode}
 */
export function MyComponent({ title, items }) {
  // ...
}
```

### Styling

- Use SCSS modules: `import style from './Component.module.scss'`
- Class names follow kebab-case pattern
- Use CSS custom properties (variables) where appropriate
- Stylelint enforces SCSS best practices

### Error Handling

- Use `console.warn` for recoverable issues
- Use `console.error` for critical issues
- Avoid `console.log` in production code

### Storybook Stories

- Place stories alongside components with `.stories.js` extension
- Use default export for story metadata, named exports for stories

```javascript
import React from 'react';
import { MyComponent } from './MyComponent';

export default {
  title: 'Category/MyComponent',
  component: MyComponent,
};

export const Default = () => <MyComponent title="Hello" />;
```

---

## Project Structure

```
content-react-ui/
├── components/          # React components
│   ├── charts/         # Chart components
│   ├── design/         # Design elements (arrows, etc.)
│   ├── forms/         # Form components
│   ├── icons/         # Icon components
│   ├── layout/        # Layout components (Flex, Row, Column, Block)
│   ├── misc/          # Miscellaneous components
│   ├── slide/         # Slide-related components
│   ├── slide-types/   # Slide type components
│   ├── stats/         # Statistics components
│   ├── text/          # Text components
│   └── ui/            # General UI components
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── bridge/            # Bridge-related code
├── css/               # Global styles
└── docs/              # Documentation
```

### Component Organization

Each component should have:

- Main component file: `ComponentName.js`
- Index file for exports: `index.js` (barrel file)
- Styles: `ComponentName.module.scss` (if needed)
- Stories: `ComponentName.stories.js` (for Storybook)

---

## Common Dependencies

- **React**: ~18.3.1
- **lodash-es**: For utility functions
- **classnames**: For conditional class names
- **@dnd-kit/core**: For drag and drop
- **@floating-ui/react**: For floating UI elements
- **flatpickr**: For date picking
- **@amcharts/amcharts4**: For charts

---

## Key Patterns

### Conditional Classes

```javascript
import classNames from 'classnames';

// With condition
<div className={classNames(style.base, { [style.active]: isActive })} />

// Multiple conditions
<div className={classNames(style.item, { [style.disabled]: isDisabled, [style.selected]: isSelected })} />
```

### Event Handlers

```javascript
function handleInputChange(key, value) {
  onChange({ [key]: value });
}
```

### Factory Functions

Many utilities use the factory pattern:

```javascript
export function percentifyFactory(options) {
  return (val) => percentify(val, options);
}
```
