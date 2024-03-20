import { useSearchParams } from "@remix-run/react";
import { ChevronRightIcon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { useDatePicker } from "./useDatePicker";
import { DropdownType } from "./DatePicker";

export const DropdownView = ({
  setDropdownContentType,
}: {
  setDropdownContentType: (value: DropdownType) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { dateOptions } = useDatePicker();

  const onCheckedChange = (opt: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");

      prev.set("statsPeriod", opt);

      return prev;
    });
  };

  return (
    <div className="w-56 text-blue-600">
      {dateOptions.map((opt) => (
        <DropdownMenuCheckboxItem
          key={opt.value}
          checked={
            searchParams.has("statsPeriod") &&
            searchParams.get("statsPeriod") === opt.value
          }
          onCheckedChange={() => {
            onCheckedChange(opt.value);
          }}
        >
          <span className="text-gray-700">{opt.label}</span>
        </DropdownMenuCheckboxItem>
      ))}

      <DropdownMenuSeparator className="my-0.5" />

      <DropdownMenuCheckboxItem
        className="w-full flex justify-between items-center cursor-pointer"
        key={"Custom"}
        onSelect={(e) => {
          e.preventDefault();
          setDropdownContentType(DropdownType.calendar);
        }}
        checked={searchParams.has("from") && searchParams.has("to")}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            setDropdownContentType(DropdownType.calendar);
          }
        }}
      >
        <span className="text-gray-700 flex w-full justify-between items-center">
          Custom
          <ChevronRightIcon strokeWidth={1.5} className="p-1" />
        </span>
      </DropdownMenuCheckboxItem>
    </div>
  );
};
