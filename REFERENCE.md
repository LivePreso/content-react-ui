# SKILL.md

This file documents the components and patterns used on the majority of LivePreso deck slides. For UI controls (Button, Dropdown, Modal, Checkbox), additional hooks, and the full theming/color reference, see **SKILL-reference.md**.

> **Global note:** All components accept a `className` prop (string) for additional CSS classes. This is not repeated in individual prop tables below.

---

## Imports

```js
// Components, hooks, bridge, contexts — all from the main entry
import {
  Slide, Header, Content, Footer,
  Row, Column, Flex, Block,
  Button, Dropdown, Modal, Table, Tabs, Toggle, Checkbox,
  EditableText, EditableInput,
  DeltaValue, BigStat,
  CategoryChart, DateChart, PieChart, ValueChart, QuadrantChart,
  MiddleEllipsisText, LoadingSpinner,
  useFeed, useNavigation, useSlideVisible, useSectionVisible,
  useShowPrepEditable, useSlideKeyPrefix, usePresoCreatedDate,
  BrandingContext,
  openExternalLink,
} from '@livepreso/content-react-ui';

// Utility functions (separate entry point)
import {
  percentifyFactory, currencifyFactory, currencyCodifyFactory,
  cleanNumberFactory, decimalifyFactory, prettyNumberifyFactory,
  posNegFactory, undefinedAsDash, getPlural,
  isInvalidNumber, isValidNumber, roundOffDecimal,
  toPercentGrowth, capitalise, slugify,
  toDateString, getDateRange, getDateRangeByDays, groupByGranularity,
  getFeedDataInRange, calculateAverageByMetric,
  findMinMax, calculatePercent,
} from '@livepreso/content-react-ui/utils';

// Styles (import in your SCSS entry)
@use '@livepreso/content-react-ui/styles.scss';
```

---

## Quick Start — Complete Slide Example

This is the pattern you'll use on most slides: a header, a row of KPI stats, a chart, and a data table. Read this before anything else.

```jsx
import React, { useState } from 'react';
import {
  Slide, Header, Content, Footer,
  Row, Flex,
  BigStat, DeltaValue,
  CategoryChart,
  Table, HeaderRow, BodyRow, HighlightRow, TitleCell, TableCell,
  Tabs,
  useFeed,
} from '@livepreso/content-react-ui';
import {
  percentifyFactory,
  currencifyFactory,
  posNegFactory,
} from '@livepreso/content-react-ui/utils';

// Create formatters at module scope — never inside a component
const percentify = percentifyFactory({ numDecimal: 1 });
const currencify = currencifyFactory({ numDecimal: 0, currencyCode: 'USD' });
const posGreen   = posNegFactory({ pos: 'color-brand-3', neg: 'color-brand-4' });

export default function PerformanceSlide() {
  const data = useFeed('hotel_performance', []);
  const [activeTab, setActiveTab] = useState('summary');

  const totals = data.totals ?? {};
  const rows   = data.hotels ?? [];

  return (
    <Slide>
      <Header>Hotel Performance Overview</Header>

      <Content>
        {/* KPI row */}
        <Row gap="flex-between">
          <BigStat flex={1} label="Total Revenue"  value={totals.revenue}   format="currency" />
          <BigStat flex={1} label="Occupancy"      value={totals.occupancy} format="percent"  />
          <BigStat flex={1} label="ADR"            value={totals.adr}       format="currency" />
          <Flex flex={1}>
            <DeltaValue
              primary={totals.revpar_delta}
              formatter={percentify}
              color={posGreen}
              secondary="RevPAR vs LY"
            />
          </Flex>
        </Row>

        {/* Tab-switched chart / table */}
        <Tabs
          selected={activeTab}
          items={[
            { label: 'Chart View', value: 'summary' },
            { label: 'Table View', value: 'detail'  },
          ]}
          onChange={setActiveTab}
        />

        {activeTab === 'summary' && (
          <CategoryChart
            width="100%"
            height="400px"
            data={rows}
            series={[
              { type: 'column', name: 'Revenue',   dataFieldX: 'hotel', dataFieldY: 'revenue',   valueAxisKey: 'revenue' },
              { type: 'line',   name: 'Occupancy', dataFieldX: 'hotel', dataFieldY: 'occupancy', valueAxisKey: 'occupancy' },
            ]}
            yAxes={[
              { key: 'revenue',   title: 'Revenue ($)' },
              { key: 'occupancy', title: 'Occupancy (%)', opposite: true },
            ]}
            tooltips={{ active: true, combineSeries: true }}
          />
        )}

        {activeTab === 'detail' && (
          <Table columnWidths={['40%', '20%', '20%', '20%']}>
            <HeaderRow uid="h1">
              <TableCell uid="h1-c1">Hotel</TableCell>
              <TableCell uid="h1-c2">Revenue</TableCell>
              <TableCell uid="h1-c3">Occupancy</TableCell>
              <TableCell uid="h1-c4">ADR</TableCell>
            </HeaderRow>
            {rows.map((row) => (
              <BodyRow uid={`row-${row.id}`} key={row.id}>
                <TitleCell uid={`row-${row.id}-name`}    title={row.hotel} />
                <TableCell uid={`row-${row.id}-revenue`}>{currencify(row.revenue)}</TableCell>
                <TableCell uid={`row-${row.id}-occ`}    >{percentify(row.occupancy)}</TableCell>
                <TableCell uid={`row-${row.id}-adr`}    >{currencify(row.adr)}</TableCell>
              </BodyRow>
            ))}
            <HighlightRow uid="total">
              <TitleCell uid="total-name"    title="Total / Avg" />
              <TableCell uid="total-revenue">{currencify(totals.revenue)}</TableCell>
              <TableCell uid="total-occ"    >{percentify(totals.occupancy)}</TableCell>
              <TableCell uid="total-adr"    >{currencify(totals.adr)}</TableCell>
            </HighlightRow>
          </Table>
        )}
      </Content>

      <Footer>Source: Internal Data · Confidential</Footer>
    </Slide>
  );
}
```

---

## Data Flow

Slide data comes from Bridge feeds, accessed via `useFeed`. The first argument is the feed key configured in the deck; the second is the default value returned when the feed is empty.

```js
const data   = useFeed('hotel_performance', []);
const config = useFeed('presentation_config', {});
```

`useFeed` reads synchronously — there is no loading state to manage. Always provide a safe default that matches the shape your component expects, so the slide renders without crashing when feed data is absent.

---

## Slide Structure

### Slide

Full-height flex column — the root wrapper for every slide.

### Header

Renders an editable `<h1>`. Company-wide editable by default.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | string | — | Header text |
| `isPrep` | bool | false | Prep-editable |
| `isCompany` | bool | true | Company-wide editable |

### Footer

Renders an editable `<h6>`. Company-wide editable by default.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | — | Footer text |
| `isPrep` | bool | false | Prep-editable |
| `isCompany` | bool | true | Company-wide editable |

### Content

Flex-growing `Column` wrapper for the slide body.

```jsx
<Slide>
  <Header>Title</Header>
  <Content>
    {/* Everything between header and footer */}
  </Content>
  <Footer>Disclaimer</Footer>
</Slide>
```

---

## Layout

### Row

Horizontal flex container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `gap` | string | — | `'none'` `'x-small'` `'small'` `'medium'` `'large'` `'x-large'` `'flex-around'` `'flex-between'` `'flex-evenly'` |
| `justify` | string | — | `'start'` `'end'` `'center'` (ignored when using `flex-*` gaps) |
| `reverse` | bool | false | Reverse flex direction |

```jsx
<Row gap="flex-between">
  <Flex><p>Left</p></Flex>
  <Flex><p>Centre</p></Flex>
  <Flex><p>Right</p></Flex>
</Row>
```

### Column

Vertical flex container. Identical props to `Row`.

```jsx
<Column gap="small">
  <h2>Section Title</h2>
  <p>Supporting text.</p>
</Column>
```

### Flex

Flexible child element. Use inside `Row` or `Column` to control proportional sizing.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flex` | number\|string | `1` | CSS flex value |
| `width` | string\|number | — | CSS width |
| `height` | string\|number | — | CSS height |

```jsx
{/* Two-thirds / one-third split */}
<Row>
  <Flex flex={2}><CategoryChart ... /></Flex>
  <Flex flex={1}><DeltaValue ... /></Flex>
</Row>
```

### Block

Rigid block container with optional border and padding controls. Use when you need a fixed-size box that doesn't stretch.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `flex` | string | `'none'` | CSS flex value |
| `width` | string\|number | `'auto'` | CSS width |
| `height` | string\|number | `'auto'` | CSS height |
| `maxHeight` | string\|number | — | CSS max-height |
| `hasBorder` | bool | false | Add border |
| `hasMarginBottom` | bool | false | Add bottom margin |
| `noPadding` | bool | false | Remove padding |
| `isHidden` | bool | false | Hide with CSS |

Also exports `BlockTitle` for titled blocks:

```jsx
<Block hasBorder width="300px">
  <BlockTitle>Revenue Summary</BlockTitle>
  <p>Content below the title.</p>
</Block>
```

---

## Data-Driven Components

### BigStat

Large prominently displayed statistic. Accepts `Column` flex props (`flex`, `width`, `height`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Stat value |
| `label` | string | — | Label above the stat |
| `format` | string | `'number'` | `'number'` `'currency'` `'percent'` |

```jsx
{/* Row of KPIs — a very common pattern */}
<Row gap="flex-between">
  <BigStat flex={1} label="Revenue"   value={1250000} format="currency" />
  <BigStat flex={1} label="Occupancy" value={0.847}   format="percent"  />
  <BigStat flex={1} label="ADR"       value={285}     format="currency" />
</Row>
```

### DeltaValue

Primary metric with optional directional arrow and secondary label. Commonly used in table cells and alongside `BigStat`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `primary` | number | `0` | Main value |
| `secondary` | string\|number | — | Secondary text below |
| `formatter` | function | identity | `(num) => string` |
| `color` | function | `() => 'color-text'` | `(num) => colorTokenName` — return a CSS token name (e.g. `'color-brand-3'`) based on the value |
| `showArrow` | bool | true | Show up/down arrow |
| `theme` | string | — | `'large'` for a larger variant |

```jsx
const percentify = percentifyFactory({ numDecimal: 1 });
const currencify = currencifyFactory({ numDecimal: 2, currencyCode: 'USD' });
const posGreen   = posNegFactory({ pos: 'color-brand-3', neg: 'color-brand-4' });
// Inverted — green when negative (e.g. cost reduction is good)
const negGreen   = posNegFactory({ pos: 'color-brand-4', neg: 'color-brand-3' });

<DeltaValue
  primary={0.342}
  formatter={percentify}
  color={posGreen}
  secondary={currencify(1200)}
/>

{/* No arrow — just coloured value */}
<DeltaValue
  primary={-0.05}
  formatter={percentify}
  color={negGreen}
  showArrow={false}
  secondary="vs. last year"
/>
```

### Charts

All charts wrap amcharts4. The high-level components handle axis and series construction. Use `chartFunction` for direct amcharts access when needed.

**Common props across all charts:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | array | — | Data rows |
| `series` | array\|object | — | Series configuration |
| `yAxes` | array | — | Y-axis configuration |
| `xAxis` | object | — | X-axis configuration |
| `tooltips` | object | — | `{ active, combineSeries }` |
| `showLegend` | bool | — | Show legend |
| `colors` | array | — | Override colours |
| `width` | string | `'100%'` | Container width |
| `height` | string | `'100%'` | Container height |
| `enableAnimation` | bool | — | Enable amcharts animations |
| `chartFunction` | function | — | Raw amcharts setup: `(chart) => void` |

#### CategoryChart

Bar/line chart with a string category x-axis.

**Series item shape:**
```js
{
  type: 'column' | 'line',
  name: string,         // Legend label
  dataFieldX: string,   // Key in data for x-axis (the category)
  dataFieldY: string,   // Key in data for y-axis value
  valueAxisKey: string, // Matches a key in yAxes (required for dual-axis)
  showValue: bool,      // Show value labels on columns
}
```

**Y-axis item shape:**
```js
{
  key: string,      // Unique key; series reference this via valueAxisKey
  title: string,    // Axis label
  opposite: bool,   // Place on right side
  min: number,
  max: number,
}
```

```jsx
{/* Single series */}
<CategoryChart
  width="100%" height="400px"
  data={[
    { hotel: 'Grand Plaza',  room_nights: 150 },
    { hotel: "Ceasar's",     room_nights: 200 },
    { hotel: 'Hampton Town', room_nights: 100 },
  ]}
  series={[{
    type: 'column', name: 'Room Nights',
    dataFieldX: 'hotel', dataFieldY: 'room_nights',
    showValue: true,
  }]}
  yAxes={[{ key: 'room_nights', title: 'Room Nights' }]}
  tooltips={{ active: true }}
/>

{/* Dual-axis: columns + line */}
<CategoryChart
  width="100%" height="400px"
  data={[
    { hotel: 'Grand Plaza',  room_nights: 125, room_nights_ly: 150, adr: 1200, adr_ly: 1000 },
    { hotel: "Ceasar's",     room_nights: 230, room_nights_ly: 200, adr: 1500, adr_ly: 1570 },
    { hotel: 'Hampton Town', room_nights:  80, room_nights_ly: 100, adr: 2180, adr_ly: 2100 },
  ]}
  series={[
    { type: 'column', name: 'Room Nights',    dataFieldX: 'hotel', dataFieldY: 'room_nights',    valueAxisKey: 'room_nights' },
    { type: 'column', name: 'Room Nights LY', dataFieldX: 'hotel', dataFieldY: 'room_nights_ly', valueAxisKey: 'room_nights' },
    { type: 'line',   name: 'ADR',            dataFieldX: 'hotel', dataFieldY: 'adr',            valueAxisKey: 'adr' },
    { type: 'line',   name: 'ADR LY',         dataFieldX: 'hotel', dataFieldY: 'adr_ly',         valueAxisKey: 'adr' },
  ]}
  yAxes={[
    { key: 'room_nights', title: 'Room Nights' },
    { key: 'adr',         title: 'ADR', opposite: true },
  ]}
  tooltips={{ active: true, combineSeries: true }}
/>
```

#### DateChart

Same API as `CategoryChart` but the x-axis is date-based. Supply ISO date strings in `dataFieldX`.

```jsx
<DateChart
  width="100%" height="400px"
  data={[
    { date: '2023-03-01', room_nights: 100 },
    { date: '2023-04-01', room_nights: 200 },
    { date: '2023-05-01', room_nights: 150 },
  ]}
  series={[{
    type: 'column', name: 'Room Nights',
    dataFieldX: 'date', dataFieldY: 'room_nights',
  }]}
  yAxes={[{ key: 'room_nights', title: 'Room Nights' }]}
/>
```

#### PieChart

**Series shape:**
```js
{
  name: string,
  dataFieldCategory: string, // Key for slice labels
  dataFieldValue: string,    // Key for slice values
  hideLabels: bool,
}
```

```jsx
{/* Solid pie */}
<PieChart
  width="100%" height="400px"
  data={[
    { hotel: 'Grand Plaza',  room_nights: 150 },
    { hotel: "Ceasar's",     room_nights: 200 },
    { hotel: 'Hampton Town', room_nights: 100 },
  ]}
  series={{ name: 'Room Nights', dataFieldCategory: 'hotel', dataFieldValue: 'room_nights' }}
  tooltips={{ active: true }}
/>

{/* Donut — add innerRadius */}
<PieChart
  width="100%" height="400px"
  innerRadius={60}
  data={[
    { channel: 'Direct', bookings: 450 },
    { channel: 'OTA',    bookings: 320 },
    { channel: 'GDS',    bookings: 180 },
  ]}
  series={{ name: 'Bookings', dataFieldCategory: 'channel', dataFieldValue: 'bookings', hideLabels: true }}
/>
```

#### ValueChart

Scatter/bubble chart with numeric x and y axes.

```jsx
{/* Basic bubble */}
<ValueChart
  width="100%" height="400px"
  data={[
    { adr: 1000, room_nights: 150 },
    { adr: 1500, room_nights: 200 },
    { adr: 2000, room_nights: 100 },
  ]}
  series={[{ type: 'bubble', name: 'Properties', dataFieldX: 'adr', dataFieldY: 'room_nights' }]}
  yAxes={[{ key: 'room_nights', title: 'Room Nights' }]}
  tooltips={{ active: true }}
/>

{/* Heat bubble — colour intensity from a third field */}
<ValueChart
  width="100%" height="400px"
  data={[
    { country: 'Spain',     adr: 1000, room_nights: 150, rank: 1 },
    { country: 'UK',        adr: 1500, room_nights: 200, rank: 2 },
    { country: 'Australia', adr: 2000, room_nights: 100, rank: 3 },
  ]}
  series={[{
    type: 'bubble', name: 'Countries',
    dataFieldX: 'adr', dataFieldY: 'room_nights',
    dataFieldHeat: 'rank', dataFieldName: 'country',
    showValue: true,
  }]}
  xAxis={{ title: 'ADR' }}
  yAxes={[{ key: 'room_nights', title: 'Room Nights' }]}
/>
```

#### QuadrantChart

Bubble chart divided into four labelled quadrants.

```jsx
<QuadrantChart
  width="100%" height="500px"
  data={[{
    city_impressions: 20,      city_booking_conversion: 80,
    area_impressions: 50,      area_booking_conversion: 50,
    comp_set_impressions: 100, comp_set_booking_conversion: 20,
    property_impressions: 30,  property_booking_conversion: 70,
  }]}
  series={[
    { type: 'bubble', name: 'Same star (City)', dataFieldX: 'city_impressions',     dataFieldY: 'city_booking_conversion' },
    { type: 'bubble', name: 'Same star (Area)', dataFieldX: 'area_impressions',     dataFieldY: 'area_booking_conversion' },
    { type: 'bubble', name: 'Comp set',         dataFieldX: 'comp_set_impressions', dataFieldY: 'comp_set_booking_conversion' },
    { type: 'bubble', name: 'Your property',    dataFieldX: 'property_impressions', dataFieldY: 'property_booking_conversion' },
  ]}
  quadrants={[
    { label: 'High CVRs / Low PVs' },  // top-left
    { label: 'High CVRs & PVs' },      // top-right
    { label: 'Low CVRs & PVs' },       // bottom-left
    { label: 'Low CVRs / High PVs' },  // bottom-right
  ]}
  xAxis={{ title: 'Impressions', min: 0, max: 100 }}
  yAxes={[{ key: 'booking_conversion', title: 'Booking Conversion (%)', min: 0, max: 100 }]}
  tooltips={{ active: true, text: '{name}' }}
/>
```

### Table

Every row and cell requires a unique `uid` string. UIDs must be unique within the table — collisions cause React rendering bugs. Use a consistent naming convention: `row-{id}` for rows, `row-{id}-{field}` for cells. When rows come from data, derive UIDs from stable record identifiers (not array indices).

**Row components:**

| Component | Purpose |
|-----------|---------|
| `HeaderRow` | Column header |
| `SubheaderRow` | Secondary grouping header |
| `HighlightRow` | Emphasised row (totals, averages) |
| `BodyRow` | Standard data row |
| `TableRow` | Unstyled row |

**Cell components:**

| Component | Purpose |
|-----------|---------|
| `TableCell` | Standard cell — accepts `colSpan`, `rowSpan` |
| `TitleCell` | Row label cell — pass text via `title` prop, not children |

**Table props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnWidths` | array | — | e.g. `['40%', '30%', '30%']` |
| `sticky` | string | `'none'` | `'none'` `'row'` `'column'` `'both'` |
| `hasBorder` | bool | false | Add border |
| `onReorder` | function | — | Enables drag-to-reorder when provided |

```jsx
{/* Standard table */}
<Table columnWidths={['40%', '30%', '30%']}>
  <HeaderRow uid="h1">
    <TableCell uid="h1-c1">Property</TableCell>
    <TableCell uid="h1-c2">Room Nights</TableCell>
    <TableCell uid="h1-c3">ADR</TableCell>
  </HeaderRow>
  <BodyRow uid="row-grand-plaza">
    <TitleCell uid="row-grand-plaza-name" title="Grand Plaza" />
    <TableCell uid="row-grand-plaza-rn">1,234</TableCell>
    <TableCell uid="row-grand-plaza-adr">$285</TableCell>
  </BodyRow>
  <HighlightRow uid="total">
    <TitleCell uid="total-label" title="Total" />
    <TableCell uid="total-rn">2,221</TableCell>
    <TableCell uid="total-adr">$296</TableCell>
  </HighlightRow>
</Table>

{/* Grouped with subheaders */}
<Table columnWidths={['40%', '30%', '30%']}>
  <HeaderRow uid="h1">
    <TableCell uid="h1-c1">Property</TableCell>
    <TableCell uid="h1-c2">Revenue</TableCell>
    <TableCell uid="h1-c3">Delta</TableCell>
  </HeaderRow>
  <SubheaderRow uid="group-luxury">
    <TableCell uid="group-luxury-label" colSpan={3}>Luxury Tier</TableCell>
  </SubheaderRow>
  <BodyRow uid="row-grand-plaza">
    <TitleCell uid="row-grand-plaza-name" title="Grand Plaza" />
    <TableCell uid="row-grand-plaza-rev">$420,000</TableCell>
    <TableCell uid="row-grand-plaza-delta">+12%</TableCell>
  </BodyRow>
</Table>

{/* Data-driven rows */}
<Table columnWidths={['50%', '25%', '25%']}>
  <HeaderRow uid="h1">
    <TableCell uid="h1-name">Hotel</TableCell>
    <TableCell uid="h1-rev">Revenue</TableCell>
    <TableCell uid="h1-occ">Occupancy</TableCell>
  </HeaderRow>
  {hotels.map((hotel) => (
    <BodyRow uid={`row-${hotel.id}`} key={hotel.id}>
      <TitleCell uid={`row-${hotel.id}-name`} title={hotel.name} />
      <TableCell uid={`row-${hotel.id}-rev`}>{currencify(hotel.revenue)}</TableCell>
      <TableCell uid={`row-${hotel.id}-occ`}>{percentify(hotel.occupancy)}</TableCell>
    </BodyRow>
  ))}
</Table>

{/* Sticky first column for wide tables */}
<Table sticky="column" columnWidths={['30%', '17.5%', '17.5%', '17.5%', '17.5%']}>
  <HeaderRow uid="h1">
    <TableCell uid="h1-c1">Hotel</TableCell>
    <TableCell uid="h1-c2">Jan</TableCell>
    <TableCell uid="h1-c3">Feb</TableCell>
    <TableCell uid="h1-c4">Mar</TableCell>
    <TableCell uid="h1-c5">Apr</TableCell>
  </HeaderRow>
  {/* body rows... */}
</Table>
```

---

## Editability

The LivePreso editing system is driven by data attributes that `EditableText` and related components set automatically. Three modes:

- **`isPrep`** — editable during presentation prep (sales rep customises before a meeting)
- **`isCompany`** — editable company-wide (admin sets once, shared across presentations)
- **`isGlobal`** — company-wide field shared across all slides (cannot combine with `isPrep`)

### EditableText

The core editable content primitive. Renders any HTML tag with editability metadata.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | **required** | Unique field identifier |
| `tag` | string | `'div'` | HTML tag: `'div'` `'p'` `'h1'`–`'h6'` |
| `isPrep` | bool | false | Prep-editable |
| `isCompany` | bool | false | Company-wide editable |
| `isGlobal` | bool | false | Global CWE (shared across slides; cannot combine with `isPrep`) |
| `prepId` | string | — | Override the prep field key (defaults to `id`) |
| `label` | ReactNode | — | Optional label rendered before the element |
| `toolbar` | array | — | Toolbar options |
| `disableSmartPaste` | bool | false | Disable smart paste |
| `stopPropagation` | bool | false | Stop click propagation |
| `children` | ReactNode | — | Field content |

```jsx
{/* Prep-editable paragraph */}
<EditableText id="description" isPrep tag="p">
  Editable by the sales rep before each meeting.
</EditableText>

{/* Company-wide editable heading */}
<EditableText id="company-tagline" isCompany tag="h2">
  Company tagline set by admin.
</EditableText>

{/* Global CWE — same value on every slide */}
<EditableText id="legal-disclaimer" isCompany isGlobal tag="p">
  Legal disclaimer shared across all slides.
</EditableText>

{/* With a label */}
<EditableText id="insight" isPrep tag="p" label="Key Insight">
  Your insight here.
</EditableText>
```

### EditableInput

Inline editable input that renders as a styled HTML element. Use when you need a controlled value that a user can edit in place.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | — | Current value |
| `onChange` | function | — | Called with new string value |
| `tagName` | string | `'p'` | `'p'` `'h1'`–`'h6'` |
| `type` | string | `'text'` | `'text'` or `'number'` |
| `placeholder` | string | — | Placeholder text |
| `formatter` | function | — | Format display value: `(value) => string` (input still shows raw value) |
| `readOnly` | bool | false | Render as plain tag, non-editable |
| `disabled` | bool | false | Disable input |

```jsx
// Declare at module scope
const formatRate = percentifyFactory({ numDecimal: 1 });

const [title, setTitle] = useState('Click to edit');
<EditableInput value={title} onChange={setTitle} tagName="h2" placeholder="Enter title..." />

{/* With formatter */}
<EditableInput value={rate} onChange={setRate} type="number" formatter={formatRate} tagName="h3" />

{/* Read-only */}
<EditableInput value="Fixed content" readOnly tagName="p" />
```

---

## Tabs

Used to switch between views within a slide (e.g. chart vs. table).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | array | — | `[{ label, value }]` |
| `selected` | string\|number | **required** | Active tab value |
| `onChange` | function | — | Called with selected value |
| `disabled` | bool | false | Disable all tabs |
| `renderItem` | function | — | Custom tab renderer: `(tab, isActive) => ReactNode` |

```jsx
const [activeTab, setActiveTab] = useState('chart');

<Tabs
  selected={activeTab}
  items={[
    { label: 'Chart View', value: 'chart' },
    { label: 'Table View', value: 'table' },
  ]}
  onChange={setActiveTab}
/>
```

---

## Toggle

Used to show/hide slides or sections, or to toggle display options within a slide.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | bool | false | Toggle state |
| `onChange` | function | — | Called with new boolean |
| `label` | ReactNode | — | Label text |
| `alignLabel` | string | `'right'` | `'left'` or `'right'` |
| `disabled` | bool | false | Disable toggle |

```jsx
const [showForecast, setShowForecast] = useState(false);
<Toggle active={showForecast} onChange={setShowForecast} label="Show Forecast" />
```

---

## Formatting Utilities

Create formatter instances once at module scope, not inside components or render functions.

All formatters return `'-'` for invalid input (`null`, `undefined`, `NaN`, `Infinity`).

```js
// Percentage: 0.342 → "34.2%"
const percentify = percentifyFactory({ numDecimal: 1 });

// Currency symbol: 1200 → "$1,200"
const currencify = currencifyFactory({ numDecimal: 0, currencyCode: 'USD' });

// Currency code suffix: 1200 → "1,200 AUD"
const codify = currencyCodifyFactory({ numDecimal: 0, currency: 'AUD' });

// Plain decimal: 1234.5 → "1,234.5"
const cleanNum = cleanNumberFactory({ numDecimal: 1 });

// Decimal with min/max control: 3.14159 → "3.14"
const decimalify = decimalifyFactory({ minDecimal: 2, maxDecimal: 2 });

// Abbreviated large numbers: 1236453 → "1.2m"
const prettyNum = prettyNumberifyFactory({ numDecimal: 1 });
// With currency: 1236453 → "$1.2m"
const prettyCurrency = prettyNumberifyFactory({ numDecimal: 1, currencyCode: 'USD' });

// Colour based on sign — pass to DeltaValue's color prop
const posGreen = posNegFactory({ pos: 'color-brand-3', neg: 'color-brand-4' });
// Inverted (lower is better, e.g. cost)
const negGreen = posNegFactory({ pos: 'color-brand-4', neg: 'color-brand-3' });
```

**Factory options reference:**

| Factory | Options |
|---------|---------|
| `percentifyFactory` | `numDecimal`, `minDecimal`, `maxDecimal` |
| `currencifyFactory` | `numDecimal`, `minDecimal`, `maxDecimal`, `currencyCode` (ISO 4217) |
| `currencyCodifyFactory` | `numDecimal`, `minDecimal`, `maxDecimal`, `currency` (suffix string) |
| `cleanNumberFactory` | `numDecimal`, `minDecimal`, `maxDecimal` |
| `decimalifyFactory` | `minDecimal`, `maxDecimal` |
| `prettyNumberifyFactory` | `numDecimal`, `useLongName`, `returnArray`, `maxLength`, `currencyCode` |
| `posNegFactory` | `pos` (token when positive), `neg` (token when negative) |

**Standalone utilities:**

```js
undefinedAsDash(null);           // '-'
undefinedAsDash(42);             // 42
getPlural('hotel', 1);           // 'hotel'
getPlural('hotel', 3);           // 'hotels'
getPlural('child', 2);           // 'children'
isInvalidNumber(NaN);            // true
roundOffDecimal(3.14159, 2);     // 3.14
toPercentGrowth(100, 115);       // 0.15
capitalise('room nights sold');  // 'Room Nights Sold'
```

---

## Hooks

| Hook | Returns | Description |
|------|---------|-------------|
| `useFeed(key, default)` | feed data | Raw Bridge feed, or default when empty |
| `useSlideVisible(path)` | `[isVisible, setVisible]` | Get/set slide visibility by `"section/slide"` path |
| `useSectionVisible(key)` | `[isVisible, setVisible]` | Get/set section visibility (true if any slide in section is visible) |

```jsx
// Slide visibility toggle — pairs naturally with Toggle
const [isVisible, setVisible] = useSlideVisible('performance/monthly-breakdown');
<Toggle active={isVisible} onChange={setVisible} label="Show Monthly Breakdown" />

// Section visibility
const [showTrends, setShowTrends] = useSectionVisible('trends');
<Toggle active={showTrends} onChange={setShowTrends} label="Include Trends Section" />
```

For `useShowPrepEditable`, `useSlideKeyPrefix`, `usePresoCreatedDate`, and `useNavigation`, see **SKILL-reference.md**.

---

## Anti-Patterns

**Don't create `<table>`, `<tr>`, or `<td>` elements directly.** Always use the `Table`, `TableRow`, `TableCell`, and semantic row components. Raw HTML tables won't receive the expected styles or behave correctly in scrollable/sticky layouts.

**Don't use inline styles for colors.** Use CSS custom property tokens (`var(--color-brand-1)`) in your SCSS, or pass token names to component props. Inline hex values bypass the branding/theming system and will look wrong for clients with custom branding.

**Don't create formatter factories inside components or render functions.** Creating a factory on every render is wasteful and can cause unnecessary re-renders. Declare them at module scope:

```js
// Correct — module scope
const percentify = percentifyFactory({ numDecimal: 1 });
export default function MySlide() {
  return <DeltaValue primary={0.5} formatter={percentify} />;
}

// Wrong — inside the component
export default function MySlide() {
  const percentify = percentifyFactory({ numDecimal: 1 }); // recreated every render
  return <DeltaValue primary={0.5} formatter={percentify} />;
}
```

**Don't generate Table `uid` props from array indices.** If rows are reordered or filtered, index-based UIDs cause React to match the wrong DOM nodes. Derive UIDs from stable record identifiers:

```jsx
// Correct
hotels.map((hotel) => <BodyRow uid={`row-${hotel.id}`} key={hotel.id}>...</BodyRow>)

// Wrong
hotels.map((hotel, i) => <BodyRow uid={`row-${i}`} key={i}>...</BodyRow>)
```

**Don't call `window.Bridge` directly.** Access Bridge features through the provided hooks (`useFeed`, `useNavigation`, `useSlideVisible`) and utilities (`openExternalLink`). The Bridge is `null` in Storybook; the hooks handle this safely.

**Don't combine `isGlobal` and `isPrep` on `EditableText`.** This throws an error. Global CWE fields are by definition not prep-specific.
