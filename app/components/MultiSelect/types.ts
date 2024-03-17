import { LucideIcon } from "lucide-react";

export type ListItem = string;

export interface GroupedListItems {
  label: string;
  listItems: ListItem[];
}

export interface DropdownMenuCheckboxesProps {
  Icon: LucideIcon;
  name: string;
  title: string;
  dataList: GroupedListItems[] | ListItem[];
}

export interface DropdownListProps {
  name: string;
  list: ListItem[];
  handleCheckboxChange: (id: string) => void;
}
