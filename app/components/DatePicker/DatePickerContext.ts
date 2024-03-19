import { createContext, useContext } from "react";
import { DateRange } from "react-day-picker";
import { PresetDates } from "./useDatePicker";

export interface DatePickerContextProps {
  fromTo: DateRange;
  dateOptions: { label: PresetDates; value: string }[];

  calendarState: DateRange;
  setCalendarState: (value: DateRange) => void;

  calendarOpen: boolean;
  setCalendarOpen: (value: boolean) => void;

  dropdownOpen: boolean;
  setDropdownOpen: (value: boolean) => void;

  showTime: boolean;
  setShowTime: (value: boolean) => void;

  handleApplyButton: () => void;
  handleBackButton: () => void;
  handleClearDate: () => void;

  toggleShowTime: () => void;
  toggleCalendar: () => void;
  toggleDropdown: () => void;

  getButtonDisplaytext: () => string;

  toggleCalendarAndCloseDropdown: () => void;
}

const DatePickerContext = createContext<DatePickerContextProps | undefined>(
  undefined
);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error(
      "useDatePickerContext must be used within a DatePickerProvider"
    );
  }
  return context;
};

export const DatePickerProvider = DatePickerContext.Provider;
