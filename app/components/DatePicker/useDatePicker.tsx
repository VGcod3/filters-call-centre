import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { StatsPeriod } from "~/routes/reports";
import { datesSchema } from "~/routes/reports";
import { DropdownType, presetDates } from "./DatePicker";

export const presets: Record<StatsPeriod, DateRange> = {
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

  const parsedSearchParams = datesSchema.parse(
    Object.fromEntries(searchParams.entries())
  );

  const fromTo =
    "statsPeriod" in parsedSearchParams
      ? presets[parsedSearchParams.statsPeriod]
      : parsedSearchParams;

  return {
    presetDates,

    fromTo,

    dropdownContentType,
    setDropdownContentType,
  };
};
