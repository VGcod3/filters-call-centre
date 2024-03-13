import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { searchParamsSchema } from "~/routes/reports";

export enum PresetDates {
  "1H" = "Last hour",
  "Today" = "Today",
  "Yesterday" = "Yesterday",
  "7D" = "Last 7 days",
  "14D" = "Last 14 days",
  "30D" = "Last 30 days",
}

type Presets = {
  [key in keyof typeof PresetDates]: DateRange;
};

const presets: Presets = {
  "1H": {
    from: dayjs().subtract(1, "hour").toDate(),
    to: dayjs().toDate(),
  },
  Today: {
    from: dayjs().startOf("day").toDate(),
    to: dayjs().endOf("day").toDate(),
  },
  Yesterday: {
    from: dayjs().subtract(1, "day").startOf("day").toDate(),
    to: dayjs().subtract(1, "day").endOf("day").toDate(),
  },
  "7D": {
    from: dayjs().subtract(7, "day").startOf("day").toDate(),
    to: dayjs().endOf("day").toDate(),
  },
  "14D": {
    from: dayjs().subtract(14, "day").startOf("day").toDate(),
    to: dayjs().endOf("day").toDate(),
  },
  "30D": {
    from: dayjs().subtract(30, "day").startOf("day").toDate(),
    to: dayjs().endOf("day").toDate(),
  },
};

const dateOptions = Object.entries(PresetDates).map(([key, value]) => ({
  label: value,
  value: key,
}));

const useDatePicker = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const parsedSearchParams = searchParamsSchema.parse(
    Object.fromEntries(searchParams.entries())
  );

  const fromTo =
    "statsPeriod" in parsedSearchParams
      ? presets[parsedSearchParams.statsPeriod]
      : parsedSearchParams;

  const [calendarState, setCalendarState] = useState<DateRange>(fromTo);

  const getButtonDisplaytext = () => {
    if (searchParams.has("statsPeriod")) {
      return PresetDates[
        searchParams.get("statsPeriod") as keyof typeof PresetDates
      ];
    }

    if (fromTo.from && fromTo.to) {
      const from = dayjs(fromTo.from).format("MMM DD, YYYY");

      const to = dayjs(fromTo.to).format("MMM DD, YYYY");

      if (from === to) {
        return from;
      }

      return `${from} - ${to}`;
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);

    // if (dropdownOpen && calendarOpen) {
    //   setCalendarOpen(false);
    // }
  };

  const toggleCaledarOpen = () => {
    // setDropdownOpen(false);

    setCalendarOpen(!calendarOpen);
  };

  const handleApplyButton = () => {
    setSearchParams((prev) => {
      prev.delete("statsPeriod");

      prev.set("from", calendarState?.from?.toISOString() || "");
      prev.set("to", calendarState?.to?.toISOString() || "");

      return prev;
    });

    toggleCaledarOpen();
  };

  const handleBackButton = () => {
    console.log("handleBackButton");

    setCalendarState(fromTo);

    toggleCaledarOpen();
    toggleDropdown();
  };

  const handleClearDate = () => {
    setCalendarState(fromTo);
  };

  const handleShowTime = () => {
    setShowTime((prev) => !prev);
  };

  return {
    fromTo,

    dateOptions,

    dropdownOpen,
    setDropdownOpen,
    calendarOpen,
    setCalendarOpen,

    calendarState,
    setCalendarState,

    showTime,
    setShowTime,

    handleApplyButton,
    handleBackButton,
    handleClearDate,
    handleShowTime,

    toggleCaledarOpen,
    toggleDropdown,
    getButtonDisplaytext,
  };
};

export default useDatePicker;
