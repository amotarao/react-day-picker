# @amotarao/react-day-picker

> Fork of [react-day-picker](https://github.com/gpbl/react-day-picker) with non-Gregorian calendar plugins removed.

This fork removes the calendar plugins (Hijri, Persian/Jalali, Buddhist, Ethiopic, Hebrew) that were added to the upstream package, keeping only Gregorian calendar support. The motivation is to reduce bundle size for projects that do not need these calendars.

> **Discussion:** A proposal to make calendar plugins opt-in (or separable) is open at [gpbl/react-day-picker#2910](https://github.com/gpbl/react-day-picker/discussions/2910). If the upstream adopts this approach, this fork may no longer be necessary.

DayPicker is a [React](https://react.dev) component for creating date pickers, calendars, and date inputs for web applications.

## Installation

```bash
npm install @amotarao/react-day-picker
```

## Example

```tsx
import { DayPicker } from "@amotarao/react-day-picker";
import "@amotarao/react-day-picker/style.css";

function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}
```

## Features

- 🛠 Extensive set of props for [customizing](https://daypicker.dev/docs/customization) the calendar.
- 🎨 Minimal design that can be [easily styled](https://daypicker.dev/docs/styling) with CSS or any CSS framework.
- 📅 Supports [selections](https://daypicker.dev/docs/selection-modes) of single days, multiple days, ranges of days, or [custom selections](https://daypicker.dev/guides/custom-selections).
- 🌍 Can be [localized](https://daypicker.dev/docs/localization) into any language and [time zones](https://daypicker.dev/docs/time-zone).
- 🦮 Complies with WCAG 2.1 AA requirements for [accessibility](https://daypicker.dev/guides/accessibility).
- ⚙️ [Customizable components](https://daypicker.dev/guides/custom-components) to extend the rendered elements.
- 🔤 Easy integration [with input fields](https://daypicker.dev/guides/input-fields).

DayPicker is written in TypeScript and compiled to CommonJS and ESM. It relies on [date-fns](https://date-fns.org) for date manipulation and formatting.

## Compatibility

DayPicker is compatible with React 16.8 and later.

## Upstream

This package is a fork of [gpbl/react-day-picker](https://github.com/gpbl/react-day-picker). See the [original documentation](https://daypicker.dev) for full guides and API reference.

## License

MIT
