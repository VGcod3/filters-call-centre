import { UserIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { ListItem } from "./types";

const agents: ListItem[] = [
  "James D.",
  "John D.",
  "Robert D.",
  "Michael D.",
  "William D.",
  "David D.",
  "Richard D.",
  "Joseph D.",
  "Charles D.",
  "Thomas D.",
  "Christopher D.",
];

export const AgentsFilter = () => {
  return (
    <MultiSelectFilter
      Icon={UserIcon}
      title="Agents"
      name="agents"
      dataList={agents}
    />
  );
};
