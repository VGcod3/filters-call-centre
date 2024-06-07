import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import { QueuePerformanceReport, groupedColums } from "./columns";
import { useState } from "react";
import { useMockData } from "./data";

const fallbackData: QueuePerformanceReport[] = [];

export function GroupedTable() {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const data = useMockData();

  const table = useReactTable({
    columns: groupedColums,
    state: { expanded },
    data: data || fallbackData,

    getCoreRowModel: getCoreRowModel(),

    getExpandedRowModel: getExpandedRowModel(),

    onExpandedChange: setExpanded,

    getGroupedRowModel: getGroupedRowModel(),

    getSubRows: (row) => row.dailyData,
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-center bg-gray-100 border-gray-300 border border-r-0 last:border-r-2"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="border border-gray-300 last:border-b-0"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={groupedColums.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
