import { UserIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { ListItem } from "./types";

const qeues: ListItem[] = [
  "Sales",
  "Customer service",
  "Retention",
  "Support",
  "Support tier 2",
  "Support tier 3",
];

export const QeuesFilter = () => {
  return (
    <MultiSelectFilter
      Icon={UserIcon}
      title="Queues"
      name="queues"
      dataList={qeues}
    />
  );
};
