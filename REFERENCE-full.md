# SKILL-reference.md

Reference appendix for `@livepreso/content-react-ui`. Load this file when you need UI controls (Button, Dropdown, Modal, Checkbox), additional hooks, or the theming/color system. For the core components used on most slides, see **SKILL.md**.

> **Global note:** All components accept a `className` prop (string) for additional CSS classes. This is not repeated in individual prop tables below.

---

## UI Controls

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Button text |
| `onClick` | function | **required** | Click handler |
| `variant` | string | `'primary'` | `'primary'` `'secondary'` `'text'` |
| `leftIcon` | ReactNode | — | Icon left of label |
| `rightIcon` | ReactNode | — | Icon right of label |
| `disabled` | bool | false | Disable button |
| `invertColors` | bool | false | Invert colour scheme |
| `isPresoManagerInteractive` | bool | false | Allow interaction in PresoManager |

```jsx
<Button label="Save Changes" onClick={handleSave} />
<Button label="Schedule" variant="secondary" leftIcon={<CalendarIcon />} onClick={handleSchedule} />
<Button label="Cancel" variant="text" onClick={handleCancel} />
```

### Dropdown

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | array | — | `[{ label, value, data? }]` |
| `selected` | string\|number\|array | — | Selected value(s) |
| `onChange` | function | — | Called with `(value, data)` |
| `placeholder` | string | — | Placeholder when nothing selected |
| `isMultiSelect` | bool | false | Multi-select mode — `selected` must be an array |
| `disabled` | bool | false | Disable interaction |
| `readonly` | bool | false | Prevent changes |
| `direction` | string | `'bottom'` | `'bottom'` or `'top'` |
| `renderItem` | function | — | Custom item renderer: `(item) => ReactNode` |
| `leftIcon` | ReactNode | — | Icon in the input area |
| `width` | string\|number | — | Fixed width |

```jsx
const [region, setRegion] = useState('apac');

<Dropdown
  selected={region}
  options={[
    { label: 'Asia Pacific', value: 'apac' },
    { label: 'Europe',       value: 'emea' },
    { label: 'Americas',     value: 'amer' },
  ]}
  onChange={setRegion}
/>

{/* Multi-select — selected must be an array */}
const [channels, setChannels] = useState([]);

<Dropdown
  selected={channels}
  isMultiSelect
  options={[
    { label: 'Direct', value: 'direct' },
    { label: 'OTA',    value: 'ota'    },
    { label: 'GDS',    value: 'gds'    },
  ]}
  onChange={setChannels}
/>
```

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | — | Modal content |
| `onClose` | function | — | Called when backdrop clicked (makes backdrop clickable) |

```jsx
{isOpen && (
  <Modal onClose={() => setIsOpen(false)}>
    <h2>Confirm Action</h2>
    <p>Are you sure you want to continue?</p>
    <Row gap="small">
      <Button label="Cancel"  variant="secondary" onClick={() => setIsOpen(false)} />
      <Button label="Confirm" onClick={handleConfirm} />
    </Row>
  </Modal>
)}
```

### Checkbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | bool | false | Checked state |
| `onChange` | function | — | Called with new boolean |
| `label` | string | — | Label text |
| `disabled` | bool | false | Disable checkbox |
| `icon` | ReactElement | CheckMarkIcon | Icon inside the box |

```jsx
const [includeVAT, setIncludeVAT] = useState(true);
<Checkbox active={includeVAT} onChange={setIncludeVAT} label="Include VAT" />
```

### LoadingSpinner

Animated spinner. Accepts `Row` layout props: `justify`, `align`, `width`, `height`.

```jsx
<LoadingSpinner />

{/* Centred in a container */}
<LoadingSpinner justify="center" width="100%" height="200px" />
```

### MiddleEllipsisText

Truncates long strings in the middle rather than the end.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | string\|number | — | Text to display |
| `minAfter` | number | `5` | Minimum characters after the ellipsis |

```jsx
{/* Displays: "very-long-file-na…e.pdf" */}
<MiddleEllipsisText>very-long-file-name-that-doesnt-fit.pdf</MiddleEllipsisText>
```

---

## Additional Hooks

| Hook | Returns | Description |
|------|---------|-------------|
| `useShowPrepEditable(id)` | bool | Whether a prep field should render — always true in preview/presomanager/thumbnail, otherwise true only if the field has a non-empty value |
| `useSlideKeyPrefix(id)` | string | Slide-scoped field key: strips `template-` from the slide key and appends `id` |
| `usePresoCreatedDate()` | Date | Presentation creation date, or today if unset |
| `useNavigation()` | navigation module | Access `openExternalLink` |

### useShowPrepEditable

Use to conditionally render prep content that should only appear when a value has been set.

```jsx
const showInsight = useShowPrepEditable('key-insight');

{showInsight && (
  <EditableText id="key-insight" isPrep tag="p">
    Key insight content.
  </EditableText>
)}
```

### useSlideKeyPrefix

Generates a field key scoped to the current slide, preventing collisions when the same component is used across multiple slides from the same template.

```js
// If slide key is "template-q1-review", returns "q1-review-revenue-target"
const fieldKey = useSlideKeyPrefix('revenue-target');
```

### usePresoCreatedDate

```js
const createdDate = usePresoCreatedDate();
const year = createdDate.getFullYear();
```

### useNavigation / openExternalLink

Two ways to open an external URL. Prefer `openExternalLink` when you have a direct import; use `useNavigation` when you need access to the full navigation module.

```jsx
import { openExternalLink } from '@livepreso/content-react-ui';

<Button
  label="Learn More"
  onClick={() => openExternalLink('https://example.com')}
/>
```

```jsx
const navigation = useNavigation();
navigation.openExternalLink('https://example.com');
```

---

## Theming & Colors

The color system is defined as CSS custom properties on `:root`. Use tokens everywhere — never hardcode hex values — because the branding system overrides these per-client.

> **The default hex values in the tables below are illustrative.** Every client deployment overrides them via the branding system. Do not design around the specific defaults — a slide that looks correct against `#2206c2` may look completely different in production. Always reference tokens; let the runtime supply the actual colours.

### Brand colors

| Token | Default value |
|-------|--------------|
| `--color-brand-1` | `#2206c2` |
| `--color-brand-1-l4` through `--color-brand-1-l1` | Lighter tints of brand-1 |
| `--color-brand-1-d1` through `--color-brand-1-d4` | Darker shades of brand-1 |
| `--color-brand-1-l` | Alias for `--color-brand-1-l2` |
| `--color-brand-1-d` | Alias for `--color-brand-1-d3` |
| `--color-brand-2` | `#6d57ff` |
| `--color-brand-3` | `#7a06ee` |
| `--color-brand-4` | `#c702e6` |
| `--color-brand-5` | `#ff3111` |
| `--color-brand-6` | `#cbfe3a` |
| `--color-brand-7` | `#0efbed` |

### Greys

`--color-white`, `--color-grey-l6` → `--color-grey-d6`, `--color-black`

### Semantic tokens

| Token | Default |
|-------|---------|
| `--color-text` | `#000` |
| `--color-text-contrast` | `#fff` |
| `--color-neutral-2` | `#666` |
| `--color-bg-1` through `--color-bg-5` | White → brand colours |
| `--color-contrast-1` through `--color-contrast-5` | Readable foreground for respective bg |

### Typography tokens

| Token | Value |
|-------|-------|
| `--main-font` | `arial, helvetica, sans-serif` |
| `--heading-font` | alias for `--main-font` |
| `--text-fz-h1` through `--text-fz-h6` | `80px` → `20px` |
| `--text-fz-p` | `26px` |
| `--text-fz-table` | `18px` |
| `--text-fw-normal` | `400` |
| `--text-fw-bold` | `700` |
| `--text-fw-heading` | alias for `--text-fw-normal` |

### Spacing tokens

| Token | Value |
|-------|-------|
| `--space-xsml` | `8px` |
| `--space-sml` | `10px` |
| `--space-med` | `30px` |
| `--space-lrg` | `60px` |
| `--space-xlrg` | `80px` |

### Using color tokens in SCSS

```scss
.my-element {
  color: var(--color-text);
  background: var(--color-bg-1);
  border-color: var(--color-brand-1);
}
```

### Using color tokens in component props

When a component prop accepts a color (e.g. `DeltaValue`'s `color` function, `posNegFactory`), pass the token name **without** `--` or `var()`:

```js
// Correct — token name only
posNegFactory({ pos: 'color-brand-3', neg: 'color-brand-4' })

// Wrong
posNegFactory({ pos: 'var(--color-brand-3)', neg: '#7a06ee' })
```

### BrandingContext

Client-specific theming overrides are delivered through `BrandingContext`. The host runtime sets this — you read it, not set it.

```js
import { useContext } from 'react';
import { BrandingContext } from '@livepreso/content-react-ui';

const { className, ssVariables } = useContext(BrandingContext);
// className    — CSS class on the deck root for client-specific styles
// ssVariables  — CSS custom property overrides: { '--color-brand-1': '#ff0000', ... }
```

All color tokens can be overridden by `ssVariables`, which is why hardcoding hex values breaks client branding.
