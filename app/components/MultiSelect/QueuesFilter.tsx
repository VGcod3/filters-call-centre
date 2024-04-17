import { UserIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import type { ListItem } from "./types";

const queues: ListItem[] = [
  "Sales",
  "Customer service",
  "Retention",
  "Support",
  "Support tier 2",
  "Support tier 3",
];

export const QueuesFilter = () => {
  return (
    <MultiSelectFilter
      Icon={UserIcon}
      title="Queues"
      name="queues"
      dataList={queues}
    />
  );
};
