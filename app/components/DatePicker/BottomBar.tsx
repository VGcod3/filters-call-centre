import { ChevronLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import useDatePicker from "./useDatePicker";

export const BottomBar = () => {
  const { handleBackButton, handleApplyButton, calendarState } =
    useDatePicker();

  return (
    <div className="flex p-3 gap-3 text-gray-600">
      <Button
        variant={"outline"}
        className="flex-1 flex gap-4"
        onClick={handleBackButton}
      >
        <ChevronLeftIcon strokeWidth={1.5} />
        Back
      </Button>
      <Button
        disabled={!calendarState?.from || !calendarState?.to}
        className="flex-1"
        onClick={handleApplyButton}
      >
        Apply
      </Button>
    </div>
  );
};
