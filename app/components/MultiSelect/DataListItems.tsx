import { Checkbox } from "~/components/ui/checkbox";
import type { DropdownListProps, GroupedListItem, ListItem } from "./types";
import { CommandItem, CommandGroup } from "~/components/ui/command";

export const DataListItems = ({
  list,
  isGrouped,
  checkboxes,
  toggleCheckbox,
}: DropdownListProps) => {
  if (isGrouped(list)) {
    return list.map((group: GroupedListItem, index: number) => (
      <CommandGroup
        key={index}
        heading={group.label}
        className="font-normal text-gray-800"
      >
        {group.listItems.map((listItem: ListItem) => (
          <CommandItem
            key={listItem.value}
            onSelect={() => toggleCheckbox(listItem.value)}
            className="flex gap-2 text-gray-500"
          >
            <Checkbox
              className="border-gray-300 data-[state=checked]:border-primary"
              checked={checkboxes.includes(listItem.value)}
            />
            <span>{listItem.label}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    ));
  }

  return (
    <CommandGroup>
      {list.map((listItem: ListItem) => (
        <CommandItem
          key={listItem.value}
          onSelect={() => toggleCheckbox(listItem.value)}
          className="flex gap-2 text-gray-500"
        >
          <Checkbox
            className="border-gray-300 data-[state=checked]:border-primary"
            checked={checkboxes.includes(listItem.value)}
          />
          <span>{listItem.label}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
