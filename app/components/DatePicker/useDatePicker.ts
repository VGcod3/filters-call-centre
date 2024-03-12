import { format } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { PresetDates } from "./typesDatePicker";
import { useSearchParams } from "@remix-run/react";

const presets = [
  { key: "Today", days: 0 },
  { key: "Yesterday", days: 1 },
  { key: "7D", days: 7 },
  { key: "14D", days: 14 },
  { key: "30D", days: 30 },
];

const dateOptions = Object.entries(PresetDates).map(([key, value]) => ({
  label: value,
  value: key,
}));

const useDatePicker = () => {
  const params = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeDateFilter = searchParams.get("preset") || "Today";

  const setActiveDateFilter = (value: string) => {
    params.set("preset", value);
    setSearchParams(params);
  };

  const today = new Date();
  const datesPresets: Record<string, DateRange> = {};

  presets.forEach((preset) => {
    const from = new Date(today);
    from.setDate(today.getDate() - preset.days);
    const to = today;

    if (preset.key === "Yesterday") {
      datesPresets[preset.key] = { from, to: from };
    } else {
      datesPresets[preset.key] = { from, to };
    }
  });

  const defaultDate: DateRange = datesPresets[activeDateFilter] || {
    from: today,
    to: today,
  };

  const [date, setDate] = useState<DateRange>(defaultDate); //state for Clendar component

  const [displayDate, setDisplayDate] = useState<DateRange | undefined>(date);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleDropdown = (state: boolean) => {
    setDropdownOpen(state);

    if (state && calendarOpen) {
      setCalendarOpen(false);
    }
  };

  const handleApplyButton = () => {
    setDisplayDate(date);
    setCalendarOpen(false);
  };

  const handleClearDate = () => {
    setActiveDateFilter("Today");
    setDisplayDate({ from: today, to: today });
    setDate({ from: today, to: today });
  };

  const getButtonDisplaytext = () => {
    if (activeDateFilter !== "Custom") {
      return activeDateFilter;
    }

    if (displayDate?.from && displayDate?.to) {
      const from = format(displayDate.from, "LLL dd, y");
      const to = format(displayDate.to, "LLL dd, y");

      if (from === to) {
        return from;
      }

      return `${from} - ${to}`;
    }

    return "Pick a date";
  };

  return {
    activeDateFilter,
    setActiveDateFilter,

    dateOptions,
    date,

    setDate,

    dropdownOpen,
    calendarOpen,

    setCalendarOpen,
    handleDropdown,
    handleApplyButton,
    handleClearDate,

    getButtonDisplaytext,
  };
};

export default useDatePicker;
