import { ColumnDef } from "@tanstack/react-table";

import type { TableData } from "./table-data";

export const columns: ColumnDef<TableData>[] = [
  {
    header: "Name",
    accessorKey: "team",
  },
  {
    header: "Date",
    accessorKey: "date",
  },
  {
    header: "Start Time",
    accessorKey: "startTime",
  },
  {
    header: "Waiting Time",
    accessorKey: "waitingTime",
  },
  {
    header: "Caller ID",
    accessorKey: "callerId",
  },
];
