import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "../ui/button";

const dailyDataSchema = z.object({
  queue: z.string(),

  total: z.number(),
  answered: z.number(),
  abandoned: z.object({
    count: z.number(),
    percentage: z.string(),
  }),
  overflow: z.object({
    count: z.number(),
    percentage: z.string(),
  }),
  talkTime: z.object({
    total: z.string(),
    average: z.string(),
    max: z.string(),
  }),
  waitTime: z.object({
    total: z.string(),
    average: z.string(),
    max: z.string(),
  }),
});

const queuePerformanceReportSchema = z.object({
  queue: z.string(),
  total: z.number(),
  answered: z.number(),
  abandoned: z.object({
    count: z.number(),
    percentage: z.string(),
  }),
  overflow: z.object({
    count: z.number(),
    percentage: z.string(),
  }),
  talkTime: z.object({
    total: z.string(),
    average: z.string(),
    max: z.string(),
  }),
  waitTime: z.object({
    total: z.string(),
    average: z.string(),
    max: z.string(),
  }),
  dailyData: z.array(dailyDataSchema).optional(),
});

export type QueuePerformanceReport = z.infer<
  typeof queuePerformanceReportSchema
>;

export type DailyData = z.infer<typeof dailyDataSchema>;

const columnHelper = createColumnHelper<QueuePerformanceReport>();

export const groupedColums = [
  columnHelper.accessor("queue", {
    header: ({ table }) => {
      return (
        <div className="flex gap-1 items-center ">
          <Button
            variant={table.getIsAllRowsExpanded() ? "outline" : "ghost"}
            className="flex items-center justify-center w-full h-full"
            onClick={() => {
              table.toggleAllRowsExpanded();
            }}
          >
            Queue
          </Button>
        </div>
      );
    },
    cell: ({ row, getValue }) => {
      return (
        <div
          style={{
            // Since rows are flattened by default,
            // we can use the row.depth property
            // and paddingLeft to visually indicate the depth
            // of the row
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <div>
            <Button
              variant={row.getIsExpanded() ? "secondary" : "ghost"}
              className="flex items-center justify-center w-full h-full"
              onClick={() => {
                row.toggleExpanded();
              }}
            >
              {getValue()}
            </Button>
          </div>
        </div>
      );
    },
  }),
  columnHelper.group({
    header: "Call count",
    columns: [
      columnHelper.accessor("total", { header: "Total" }),
      columnHelper.accessor("answered", { header: "Answered" }),
      columnHelper.accessor("abandoned.count", {
        header: "Abandoned",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("overflow.count", {
        header: "Overflow",
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    header: "Talk time",
    columns: [
      columnHelper.accessor("talkTime.total", {
        header: "Total",
        id: "talkTimeTotal",
      }),
      columnHelper.accessor("talkTime.average", {
        header: "Average",
        id: "talkTimeAverage",
      }),
      columnHelper.accessor("talkTime.max", {
        header: "Max",
        id: "talkTimeMax",
      }),
    ],
  }),
  columnHelper.group({
    header: "Wait time",
    columns: [
      columnHelper.accessor("waitTime.total", {
        header: "Total",
        id: "waitTimeTotal",
      }),
      columnHelper.accessor("waitTime.average", {
        header: "Average",
        id: "waitTimeAverage",
      }),
      columnHelper.accessor("waitTime.max", {
        header: "Max",
        id: "waitTimeMax",
      }),
    ],
  }),
] as Array<ColumnDef<QueuePerformanceReport, unknown>>;
