import { ChevronRightIcon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu";

export const DropDownList = ({
  dateOptions,
  activeDateFilter,
  setActiveDateFilter,
  setCalendarOpen,
}: {
  dateOptions: { label: string; value: string }[];
  activeDateFilter: string;
  setActiveDateFilter: (value: string) => void;
  setCalendarOpen: (value: boolean) => void;
}) => {
  return (
    <DropdownMenuContent className="w-56" align="start">
      {dateOptions.map((opt) => (
        <DropdownMenuCheckboxItem
          className="text-blue-600"
          key={opt.value}
          checked={activeDateFilter === opt.value}
          onCheckedChange={() => setActiveDateFilter(opt.value)}
        >
          <span className="text-gray-700">{opt.label}</span>
        </DropdownMenuCheckboxItem>
      ))}

      <DropdownMenuCheckboxItem
        className="text-blue-600"
        key={"Custom"}
        checked={activeDateFilter === "Custom"}
        onCheckedChange={() => setActiveDateFilter("Custom")}
        onClick={() => {
          setCalendarOpen(true);
        }}
      >
        <span className="text-gray-700 flex w-full justify-between">
          Custom
          <ChevronRightIcon strokeWidth={1.5} className="p-1" />
        </span>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  );
};
