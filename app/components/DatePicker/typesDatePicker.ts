import type { DateRange } from "react-day-picker";

export enum PresetDates {
  "1H" = "Last hour",
  "Today" = "Today",
  "Yesterday" = "Yesterday",
  "7D" = "Last 7 days",
  "14D" = "Last 14 days",
  "30D" = "Last 30 days",
}

export interface BottomBarProps {
  handleBackButton: () => void;
  handleApplyButton: () => void;
  date: DateRange | undefined;
}

export interface TopBarProps {
  date: DateRange | undefined;
  handleClearDate: () => void;
}
