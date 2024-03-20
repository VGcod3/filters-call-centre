import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { searchParamsSchema } from "../../routes/reports";
import { DropdownType } from "./DatePicker";

enum PresetDates {
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

export const useDatePicker = () => {
  const [dropdownContentType, setDropdownContentType] = useState<DropdownType>(
    DropdownType.checkbox
  );

  const [searchParams] = useSearchParams();

  type DateOption = {
    label: PresetDates;
    value: string;
  };

  const dateOptions: DateOption[] = Object.entries(PresetDates).map(
    ([key, value]) => ({
      label: value,
      value: key,
    })
  );

  const fromDate = dayjs().subtract(3, "months").toDate();
  const toDate = dayjs().toDate();

  const parsedSearchParams = searchParamsSchema.parse(
    Object.fromEntries(searchParams.entries())
  );

  const fromTo =
    "statsPeriod" in parsedSearchParams
      ? presets[parsedSearchParams.statsPeriod]
      : parsedSearchParams;

  return {
    PresetDates,

    dateOptions,

    fromDate,
    toDate,

    fromTo,

    dropdownContentType,
    setDropdownContentType,
  };
};
