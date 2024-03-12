import { ChevronLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { BottomBarProps } from "./typesDatePicker";

export const BottomBar = ({
  setCalendarOpen,
  setDropdownOpen,
  handleApplyButton,
  date,
}: BottomBarProps) => {
  return (
    <div className="flex p-3 gap-3 text-gray-600">
      <Button
        variant={"outline"}
        className="flex-1 flex gap-4"
        onClick={() => {
          setCalendarOpen(false);
          setDropdownOpen(true);
        }}
      >
        <ChevronLeftIcon strokeWidth={1.5} />
        Back
      </Button>
      <Button
        disabled={!date?.from || !date?.to}
        className="flex-1"
        onClick={() => handleApplyButton()}
      >
        Apply
      </Button>
    </div>
  );
};
