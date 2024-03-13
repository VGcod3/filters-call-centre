import { useSearchParams } from "@remix-run/react";
import { ChevronRightIcon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu";
import useDatePicker from "./useDatePicker";

export const DropDownList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { dateOptions, setCalendarOpen } = useDatePicker();

  const onCheckedChange = (opt: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");

      prev.set("statsPeriod", opt);

      return prev;
    });
  };

  return (
    <DropdownMenuContent className="w-56" align="start">
      {dateOptions.map((opt) => (
        <DropdownMenuCheckboxItem
          className="text-blue-600"
          key={opt.value}
          checked={
            searchParams.has("statsPeriod") &&
            searchParams.get("statsPeriod") === opt.value
          }
          onCheckedChange={() => onCheckedChange(opt.value)}
        >
          <span className="text-gray-700">{opt.label}</span>
        </DropdownMenuCheckboxItem>
      ))}

      <DropdownMenuCheckboxItem
        className="text-blue-600"
        key={"Custom"}
        checked={searchParams.has("from") && searchParams.has("to")}
        onClick={() => setCalendarOpen(true)}
      >
        <span className="text-gray-700 flex w-full justify-between items-center">
          Custom
          <ChevronRightIcon strokeWidth={1.5} className="p-1" />
        </span>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  );
};
