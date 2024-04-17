import type { ColumnDef } from "@tanstack/react-table";

import type { TableRowData } from "./mock-data";

export const columns: ColumnDef<TableRowData>[] = [
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
