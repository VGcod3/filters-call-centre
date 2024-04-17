import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { CircleAlertIcon, LucideIcon, SearchIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

enum MessageTypeEnum {
  newClient = "newClient",
  notFound = "notFound",
  error = "error",
}

interface MessageType {
  Icon: LucideIcon;
  iconClassName: string;
  iconWrapperClassName: string;
  title: string;
  message: string;
}

const messageTypes: Record<MessageTypeEnum, MessageType> = {
  newClient: {
    title: "No results found",
    message:
      "As a new client no data has been found. Start using your platform to get data.",
    Icon: SearchIcon,
    iconClassName: "text-gray-700",
    iconWrapperClassName: "bg-white h-12 w-12 rounded-lg",
  },
  notFound: {
    title: "No results found",
    message:
      "Your search did not match any results. Please try again or clear filter.",
    Icon: SearchIcon,
    iconClassName: "text-gray-700",
    iconWrapperClassName: "bg-white h-12 w-12 rounded-lg",
  },
  error: {
    title: "Something went wrong...",
    message:
      "We had some trouble loading this report. Please refresh the page to try again!",
    Icon: CircleAlertIcon,
    iconWrapperClassName:
      "bg-amber-100 border-8 border-amber-50 rounded-full h-16 w-16 ",
    iconClassName: "text-amber-600",
  },
};

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="bg-gray-100 w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="bg-gray-200 border border-gray-300 px-5 text-gray-700"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              className="hover:bg-gray-200 transition-colors duration-100 ease-in-out"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  className="px-5 py-3 text-gray-700 border border-gray-300"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div className="h-[70vh] flex justify-center items-center flex-col relative z-0">
                <TableMessage type={MessageTypeEnum.newClient} />
                <img
                  src="/table-no-results.svg"
                  alt="no results"
                  className="absolute select-none pointer-events-none -z-10"
                />
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const TableMessage = ({ type }: { type: MessageTypeEnum }) => {
  const Icon = messageTypes[type].Icon;

  return (
    <>
      <div
        className={cn(
          "mb-2 p-0 flex justify-center items-center border-red-600",
          messageTypes[type].iconWrapperClassName
        )}
      >
        <Icon strokeWidth={1.5} className={messageTypes[type].iconClassName} />
      </div>
      <p className="text-gray-900 text-lg font-semibold">
        {messageTypes[type].title}
      </p>

      <p className="text-gray-600 w-80 text-center">
        {messageTypes[type].message}
      </p>
    </>
  );
};
