import { PhoneIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { GroupedListItem } from "./types";

const groupedStatuses: GroupedListItem[] = [
  {
    label: "Working status",
    listItems: [
      {
        value: "Available",
        label: "Available",
      },
      {
        value: "Busy",
        label: "Busy",
      },
      {
        value: "Away",
        label: "Away",
      },
    ],
  },

  {
    label: "Non working status",
    listItems: [
      {
        label: "Offline",
        value: "Offline",
      },
      {
        label: "Idle",
        value: "Idle",
      },
      {
        label: "Break",
        value: "Break",
      },
      {
        label: "Lunch",
        value: "Lunch",
      },
      {
        label: "Meeting",
        value: "Meeting",
      },
    ],
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
