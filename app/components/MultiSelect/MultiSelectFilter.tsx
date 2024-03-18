import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";

import { Checkbox } from "../ui/checkbox";

import { useSearchParams } from "@remix-run/react";
import {
  DropdownListProps,
  DropdownMenuCheckboxesProps,
  GroupedListItems,
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
} from "../ui/command";
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
            {dataList[0]?.listItems ? (
              <GroupedDropdownList
                name={name}
                list={dataList as GroupedListItems[]}
                handleCheckboxChange={toggleCheckbox}
              />
            ) : (
              <DropdownList
                name={name}
                list={dataList as ListItem[]}
                handleCheckboxChange={toggleCheckbox}
              />
            )}
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

const DropdownList = ({
  name,
  list,
  handleCheckboxChange,
}: DropdownListProps) => {
  const [searchParams] = useSearchParams();

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

const GroupedDropdownList = ({
  name,
  list,
  handleCheckboxChange,
}: {
  name: string;
  list: GroupedListItems[];
  handleCheckboxChange: (id: string) => void;
}) => {
  const [searchParams] = useSearchParams();

  return list.map((group: GroupedListItems, index: number) => (
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
};
