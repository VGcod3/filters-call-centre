import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

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
    header: () => {
      return (
        <div className="flex justify-between items-center w-full pl-3">
          Queue
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
          <div
            className={cn(
              "flex justify-between items-center w-full",
              row.originalSubRows && " pl-3"
            )}
          >
            {getValue()}
            {row.originalSubRows && (
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => {
                  row.toggleExpanded();
                }}
              >
                <ChevronDown
                  className={cn(
                    "transform transition-transform",
                    row.getIsExpanded() ? "rotate-180" : ""
                  )}
                  size={16}
                />
              </Button>
            )}
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
