import useDatePicker from "./useDatePicker";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { useSearchParams } from "@remix-run/react";

export const useCalendarView = () => {
  const { fromTo, toggleCaledarOpen, toggleDropdown } = useDatePicker();

  const [calendarState, setCalendarState] = useState<DateRange>(fromTo);

  const [showTime, setShowTime] = useState(false);

  const setSearchParams = useSearchParams()[1];

  const handleApplyButton = () => {
    console.log("handleApplyButton");

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
    showTime,
    setShowTime,

    calendarState,
    setCalendarState,

    handleApplyButton,
    handleClearDate,
    handleBackButton,
    handleShowTime,
  };
};
