import { PhoneIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import type { GroupedListItem } from "./types";

const groupedStatuses: GroupedListItem[] = [
  {
    label: "Working status",
    listItems: ["Available", "Busy", "Away"],
  },
  {
    label: "Non working status",
    listItems: ["Offline", "Idle", "Break", "Lunch", "Meeting"],
  },
];

export const StatusFilter = () => {
  return (
    <MultiSelectFilter
      Icon={PhoneIcon}
      title="Status"
      name="status"
      dataList={groupedStatuses}
    />
  );
};
