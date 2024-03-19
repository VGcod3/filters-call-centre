import { LucideIcon } from "lucide-react";

export type ListItem = string;

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
  handleCheckboxChange: (id: string) => void;
};
