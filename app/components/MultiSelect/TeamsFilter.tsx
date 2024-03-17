import { UsersIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { ListItem } from "./types";

const teams: ListItem[] = [
  "No teams asigned",
  "Customer service",
  "Sales",
  "Support",
  "Retention",
];

export const TeamsFilter = () => {
  return (
    <MultiSelectFilter
      Icon={UsersIcon}
      title="Teams"
      name="teams"
      dataList={teams}
    />
  );
};
