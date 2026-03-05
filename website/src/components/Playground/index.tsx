import React from "react";
import {
  DateLib,
  type DateRange,
  DayPicker,
  isDateRange,
} from "react-day-picker";
import * as locales from "react-day-picker/locale";
import { BrowserWindow } from "../BrowserWindow";
import { HighlightWithTheme } from "../HighlightWithTheme";
import { CustomizationFieldset } from "./CustomizationFieldset";
import { LocalizationFieldset } from "./LocalizationFieldset";
import { NavigationFieldset } from "./NavigationFieldset";
import { SelectionFieldset } from "./SelectionFieldset";
import styles from "./styles.module.css";
import { toJSX } from "./toJSX";
import { useQueryStringSync } from "./useQueryStringSync";

export function Playground() {
  const { props, setProps } = useQueryStringSync();
  const [selected, setSelected] = React.useState<
    Date | Date[] | DateRange | undefined
  >();

  const [accentColor, setAccentColor] = React.useState("");
  const [backgroundAccentColor, setBackgroundAccentColor] = React.useState("");
  const [rangeMiddleColor, setRangeMiddleColor] = React.useState("");

  const localeEntries = Object.entries(locales);
  const localeEntry =
    props.locale &&
    localeEntries.find(([, localeValue]) => localeValue === props.locale);
  const localeName = localeEntry?.[0];
  const localeProp = localeName ? ` locale={${localeName}}` : "";
  const localeImport =
    localeName &&
    `import { ${localeName} } from "react-day-picker/locale";`;

  const importStatements: string[] = [
    `import { DayPicker } from "react-day-picker";`,
  ];

  if (localeImport) {
    importStatements.unshift(localeImport);
  }

  const formattedProps = `${importStatements.join("\n")}\n\n<DayPicker${toJSX({
    ...props,
    // @ts-expect-error calendar is not a prop of DayPicker
    calendar: undefined,
    locale: undefined,
  })}${localeProp} />`;
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateLib = new DateLib({
    locale: (props.locale as locales.Locale) ?? locales.enUS,
    timeZone: props.timeZone,
  });

  return (
    <div className={styles.playground}>
      <h1>Playground</h1>
      <form className={styles.form}>
        <CustomizationFieldset
          props={props}
          setProps={setProps}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />
        <NavigationFieldset props={props} setProps={setProps} />
        <LocalizationFieldset
          props={props}
          setProps={setProps}
          currentTimeZone={currentTimeZone}
        />
        <SelectionFieldset
          props={props}
          setProps={setProps}
          selected={selected}
          setSelected={setSelected}
          backgroundAccentColor={backgroundAccentColor}
          setBackgroundAccentColor={setBackgroundAccentColor}
          rangeMiddleColor={rangeMiddleColor}
          setRangeMiddleColor={setRangeMiddleColor}
        />
      </form>
      <div className={styles.browserWindow}>
        <BrowserWindow
          url=""
          styleStr={`
          .rdp-root,
          [data-theme="dark"] .rdp-root {
            ${accentColor ? `--rdp-accent-color: ${accentColor} !important` : ""};
            ${backgroundAccentColor ? `--rdp-accent-background-color: ${backgroundAccentColor} !important` : ""};
            ${rangeMiddleColor ? `--rdp-range_middle-color: ${rangeMiddleColor} !important` : ""};
          }
        `}
        >
          <DayPicker
            {...props}
            onSelect={setSelected}
            onMonthChange={(month: Date) => {
              setProps({ ...props, month });
            }}
            // @ts-expect-error Mixing DayPicker modes
            selected={selected}
          />
        </BrowserWindow>
      </div>
      <div className={styles.props}>
        <h2>Selection</h2>
        <output aria-live="polite">
          {selected ? (
            <div>
              <pre>
                {props.mode === "single" && selected && (
                  <>
                    {String(selected)} -{" "}
                    {dateLib.format(selected as Date, "EEEE, d MMMM yyyy")}
                  </>
                )}
                {props.mode === "multiple" &&
                  (selected as Date[] | undefined)?.map((date) => {
                    return (
                      <>
                        {String(date)} -{" "}
                        {dateLib.format(date, "EEEE, d MMMM yyyy")}
                        <br />
                      </>
                    );
                  })}
                {props.mode === "range" && isDateRange(selected) && (
                  <>
                    From:{" "}
                    {selected.from && (
                      <>
                        {String(selected.from)} -{" "}
                        {dateLib.format(selected.from, "EEEE, d MMMM yyyy")}
                      </>
                    )}
                    <br />
                    To: {"  "}
                    {selected.to && (
                      <>
                        {String(selected.to)} -{" "}
                        {dateLib.format(selected.to, "EEEE, d MMMM yyyy")}
                      </>
                    )}
                  </>
                )}
              </pre>
            </div>
          ) : props.mode ? (
            "Pick on a day to start selection."
          ) : (
            "Choose a selection mode to display the selected days."
          )}
        </output>
        <h2>Code</h2>
        <HighlightWithTheme code={formattedProps} language="tsx" />
      </div>
    </div>
  );
}
