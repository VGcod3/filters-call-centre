import { Popover, PopoverContent } from "~/components/ui/popover";

import { useSearchParams } from "@remix-run/react";
import type { DropdownMenuCheckboxesProps } from "./types";
import { useMultiSelect, isGrouped } from "./useMultiSelect";

import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
} from "~/components/ui/command";
import { TriggerButton } from "../TriggerButton";
import { X } from "lucide-react";
import { DataListItems } from "./DataListItems";

export function MultiSelectFilter({
  Icon,
  name,
  title,
  dataList,
}: DropdownMenuCheckboxesProps) {
  const {
    open,
    handleClearAll,
    toggleDropdown,
    checkboxes,
    handleApply,
    toggleCheckbox,
  } = useMultiSelect(name);

  const [searchParams] = useSearchParams();

  return (
    <Popover open={open} onOpenChange={toggleDropdown}>
      <TriggerButton
        Icon={Icon}
        name={name}
        title={title}
        dataList={dataList}
      />
      <PopoverContent className="w-56 p-1" align="start">
        <Command>
          <CommandInput placeholder={`Search for ${name}`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <DataListItems
              isGrouped={isGrouped}
              checkboxes={checkboxes}
              toggleCheckbox={toggleCheckbox}
              name={name}
              list={dataList}
            />
          </CommandList>

          <div className="flex gap-1 font-medium m-1 mt-0.5">
            <CommandItem
              className="flex-1 flex gap-1 rounded-md justify-center text-gray-600 border border-input p-0.5"
              onSelect={() => {
                handleClearAll();
                toggleDropdown();
              }}
              disabled={checkboxes.length === 0}
            >
              Clear
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </CommandItem>
            <CommandItem
              disabled={arraysEqual(searchParams.getAll(name), checkboxes)}
              className="flex-1 flex rounded-md justify-center bg-blue-600 text-gray-100 p-0.5"
              onSelect={() => {
                handleApply();
                toggleDropdown();
              }}
            >
              Apply
            </CommandItem>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const arraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item) => arr2.includes(item));
};
