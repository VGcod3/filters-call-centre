import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

import { Checkbox } from "~/components/ui/checkbox";

import { useSearchParams } from "@remix-run/react";
import type {
  DropdownListProps,
  DropdownMenuCheckboxesProps,
  GroupedListItem,
  ListItem,
} from "./types";
import { useMultiSelect } from "./useMultiSelect";

import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandGroup,
  CommandInput,
  CommandEmpty,
} from "~/components/ui/command";
import TriggerButton from "../TriggerButton";

export function MultiSelectFilter({
  Icon,
  name,
  title,
  dataList,
}: DropdownMenuCheckboxesProps) {
  const {
    open,
    toggleCheckbox,
    handleClearAll,
    toggleDropdown,
    getButtonLabel,
  } = useMultiSelect(name, dataList);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TriggerButton
          isOpen={open}
          toggleDropdown={toggleDropdown}
          Icon={Icon}
        >
          {getButtonLabel(name, title)}
        </TriggerButton>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-1" align="start">
        <Command>
          <CommandInput placeholder={`Search for ${name}`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <DataListItems
              name={name}
              list={dataList}
              handleCheckboxChange={toggleCheckbox}
            />

            <CommandSeparator className="my-0.5" />
            <CommandItem
              className="flex justify-center"
              onSelect={handleClearAll}
            >
              Clear filters
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const DataListItems = ({
  name,
  list,
  handleCheckboxChange,
}: DropdownListProps) => {
  const [searchParams] = useSearchParams();

  const { isGrouped } = useMultiSelect(name, list);

  if (isGrouped(list)) {
    return list.map((group: GroupedListItem, index: number) => (
      <CommandGroup
        key={index}
        heading={group.label}
        className="font-normal text-gray-800"
      >
        {group.listItems.map((listItem: ListItem) => (
          <CommandItem
            key={listItem}
            onSelect={() => handleCheckboxChange(listItem)}
            className="flex space-x-2 text-gray-500"
          >
            <Checkbox
              className="border-gray-300 data-[state=checked]:border-primary"
              checked={searchParams.getAll(name).includes(listItem)}
            />
            <span>{listItem}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    ));
  }

  return list.map((listItem: ListItem) => (
    <CommandItem
      key={listItem}
      onSelect={() => handleCheckboxChange(listItem)}
      className="flex space-x-2 text-gray-500"
    >
      <Checkbox
        className="border-gray-300 data-[state=checked]:border-primary"
        checked={searchParams.getAll(name).includes(listItem)}
      />
      <span>{listItem}</span>
    </CommandItem>
  ));
};
