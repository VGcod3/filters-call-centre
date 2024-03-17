import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "~/components/ui/dropdown-menu";

import { Checkbox } from "../ui/checkbox";

import { useSearchParams } from "@remix-run/react";
import {
  DropdownListProps,
  DropdownMenuCheckboxesProps,
  GroupedListItems,
  ListItem,
} from "./types";
import { useMultiSelect } from "./useMultiSelect";

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
  } = useMultiSelect(name);

  return (
    <DropdownMenu open={open} onOpenChange={toggleDropdown}>
      <TriggerButton isOpen={open} Icon={Icon} toggleDropdown={toggleDropdown}>
        {getButtonLabel(name, title)}
      </TriggerButton>
      <DropdownMenuContent className="w-56" align="start">
        {dataList[0]?.label ? (
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
        <DropdownMenuSeparator className="my-0.5" />
        <DropdownMenuItem
          className="flex justify-center"
          onSelect={handleClearAll}
        >
          Clear filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const DropdownList = ({
  name,
  list,
  handleCheckboxChange,
}: DropdownListProps) => {
  const [searchParams] = useSearchParams();

  return list.map((listItem: ListItem) => (
    <DropdownMenuItem
      key={listItem}
      onSelect={() => handleCheckboxChange(listItem)}
    >
      <div className="flex items-ceter space-x-2 text-gray-500 font-normal">
        <Checkbox
          className="border-gray-300 data-[state=checked]:border-primary"
          checked={searchParams.getAll(name).includes(listItem)}
        />
        <span>{listItem}</span>
      </div>
    </DropdownMenuItem>
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
    <div key={index}>
      <DropdownMenuLabel className="font-normal text-gray-800">
        {group.label}
      </DropdownMenuLabel>
      {group.listItems.map((listItem: ListItem) => (
        <DropdownMenuItem
          key={listItem}
          onSelect={() => handleCheckboxChange(listItem)}
        >
          <div className="flex items-ceter space-x-2 text-gray-500 font-normal">
            <Checkbox
              className="border-gray-300 data-[state=checked]:border-primary"
              checked={searchParams.getAll(name).includes(listItem)}
            />
            <span>{listItem}</span>
          </div>
        </DropdownMenuItem>
      ))}
    </div>
  ));
};
