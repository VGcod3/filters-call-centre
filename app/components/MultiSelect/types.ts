import type { LucideIcon } from "lucide-react";

export type ListItem = {
  value: string;
  label: string;
};

export type GroupedListItem = {
  label: string;
  listItems: ListItem[];
};

export type PlainList = ListItem[];
export type GroupedList = GroupedListItem[];

export type DropdownMenuCheckboxesProps = {
  Icon: LucideIcon;
  name: string;
  title: string;
  dataList: GroupedListItem[] | ListItem[];
};

export type DropdownListProps = {
  name: string;
  list: ListItem[] | GroupedListItem[];
  checkboxes: string[];
  toggleCheckbox: (id: string) => void;
  isGrouped: (list: GroupedList | PlainList) => list is GroupedList;
};
