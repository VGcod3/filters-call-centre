import { UserIcon } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";

export const QueuesFilter = () => {
  const queues = [
    {
      label: "Queue 1",
      value: "queue1",
    },
    {
      label: "Queue 2",
      value: "queue2",
    },

    {
      label: "Queue 3",
      value: "queue3",
    },
    {
      label: "Queue 4",
      value: "queue4",
    },
    {
      label: "Queue 5",
      value: "queue5",
    },
  ];

  return (
    <MultiSelectFilter
      Icon={UserIcon}
      title="Queues"
      name="queues"
      dataList={queues}
    />
  );
};
