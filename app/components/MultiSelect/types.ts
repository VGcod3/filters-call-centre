import { LucideIcon } from "lucide-react";

export type ListItem = string;

export type GroupedListItems = {
  label: string;
  listItems: ListItem[];
};

export type DropdownMenuCheckboxesProps = {
  Icon: LucideIcon;
  name: string;
  title: string;
  dataList: GroupedListItems[] | ListItem[];
};

export type DropdownListProps = {
  name: string;
  list: ListItem[];
  handleCheckboxChange: (id: string) => void;
};
