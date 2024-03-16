import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "~/components/ui/dropdown-menu";
import { useDatePickerContext } from "./DatePickerContext";

import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";

export const DropDownList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState("");

  const { dateOptions, toggleCalendar, handleDropdown } =
    useDatePickerContext();

  const filteredList = dateOptions.filter((input) => {
    return (
      input.label.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
      input.value.toLocaleLowerCase().includes(searchValue.toLowerCase().trim())
    );
  });

  const onCheckedChange = (opt: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");

      prev.set("statsPeriod", opt);

      return prev;
    });

    handleDropdown(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      console.log("inputRef.current", inputRef.current);
    }
  }, [searchValue, inputRef]);

  //focus-visible:ring-0

  return (
    <DropdownMenuContent className="w-56" align="start">
      <div className="relative">
        <SearchIcon
          className="text-gray-400 p-2 h-8 w-8 absolute"
          strokeWidth={1.5}
        />
        <Input
          ref={inputRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full border-none shadow-none  pl-8 py-0"
          placeholder="Choose date preset..."
        />
      </div>
      <Separator className="my-0.5" />
      {filteredList.length ? (
        filteredList.map((opt) => (
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
        ))
      ) : (
        <DropdownMenuCheckboxItem className="text-gray-700" disabled>
          No label found.
        </DropdownMenuCheckboxItem>
      )}
      <Separator className="my-0.5" />
      <DropdownMenuCheckboxItem
        className="text-blue-600"
        key={"Custom"}
        checked={searchParams.has("from") && searchParams.has("to")}
        onClick={toggleCalendar}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            toggleCalendar();
          }
        }}
      >
        <span className="text-gray-700 flex w-full justify-between items-center">
          Custom
          <ChevronRightIcon strokeWidth={1.5} className="p-1" />
        </span>
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  );
};
