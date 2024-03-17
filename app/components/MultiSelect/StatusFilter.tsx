import { PhoneIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { GroupedListItems } from "./types";

const groupedStatuses: GroupedListItems[] = [
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
