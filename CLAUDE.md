# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@livepreso/content-react-ui` is the standard component library used when building LivePreso decks. It provides the React components, hooks, and utilities that deck authors use to compose slides — things like charts, layout primitives, stat displays, editable text, and navigation controls.

The library is consumed by individual deck projects, which bundle it themselves (there is no build step here). Components integrate with the LivePreso runtime via `@livepreso/content-react` (slide state management) and a host-injected `Bridge` global (navigation, external links, etc.).

Storybook is the primary development environment, allowing components to be built and reviewed in isolation with a simulated `SlideContext`.

## Commands

```bash
# Start Storybook dev server (port 6006)
pnpm run storybook

# Build static Storybook
pnpm run build-storybook

# Run linting (pre-commit only via husky)
pnpm run lint-staged
```

There is no test suite — `pnpm test` exits with an error by design.

## Architecture

This is **`@livepreso/content-react-ui`**, a React component library (plain JS, no TypeScript) that ships its source directly — there is no build step for the library itself. Consumers bundle it. It depends on `@livepreso/content-react` for slide state management.

### Module structure

The root `index.js` re-exports everything from four top-level modules:

| Module        | Contents                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `components/` | UI components grouped by domain (charts, design, forms, icons, layout, misc, slide, slide-types, stats, text, ui) |
| `hooks/`      | Custom hooks (`useNavigation`, `useFeed`, `useSlideVisible`, `useChartTheme`, etc.)                               |
| `contexts/`   | React contexts (`BrandingContext`)                                                                                |
| `bridge/`     | Utilities for interacting with the host environment (currently: `openExternalLink`)                               |

Utility functions (not exported from the main entry) are available separately via `@livepreso/content-react-ui/utils`.

SCSS is exported separately via `@livepreso/content-react-ui/styles.scss` → `css/base.scss`.

### Styling

- CSS Modules with SCSS, compiled via `sass-loader`
- Class names follow **kebab-case** (enforced by stylelint)
- CSS variables/tokens live in `css/variables/`; component-specific variables in `css/variables/components/`
- `css/core.scss` is used for Storybook; `css/base.scss` is the consumer-facing entry

### Storybook setup

Storybook uses `@livepreso/webpack-deck` for its webpack config. The `webpackFinal` in `.storybook/main.js` adds:

- Aliases from the shared webpack config
- `@ui` alias pointing to the repo root
- A `ProjectPlugin` from `@livepreso/webpack-deck`

Each story's preview wraps components in a `SlideContext.Provider` (from `@livepreso/content-react`) so hooks that consume slide state work correctly. The `Bridge` global is set to `null` in Storybook; in production it is injected by the host app.

### Global dependencies

The library assumes two runtime globals provided by the host environment:

- **`Bridge`** — host app bridge object (navigation, etc.); accessed via `bridge/navigation/open-external-link`
- **`moment`** — date formatting library (declared as an ESLint global)

### ESLint

Extends Airbnb + Prettier. Notable rule changes:

- `no-console` is an **error** (level 2)
- `react/prop-types` and `react/require-default-props` are disabled
- `import/no-unresolved` is disabled (module resolution handled by consumers)
- Accessibility rules (`jsx-a11y/*`) are warnings, not errors
