import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import DatePicker from "~/components/DatePicker";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

import { fromDate, toDate } from "~/components/DatePicker/DatePicker";
import dayjs from "dayjs";

export const meta: MetaFunction = () => {
  return [{ title: "Reports" }, { name: "description", content: "Reports" }];
};

import { TableData, tableData } from "~/components/SimpleTable/table-data";
import { QeuesFilter } from "~/components/MultiSelect/QeuesFilter";
import { columns } from "~/components/SimpleTable/columns";
import { DataTable } from "~/components/SimpleTable/data-table";

const statsPeriodsEnum = z.enum([
  "1H",
  "Today",
  "Yesterday",
  "7D",
  "14D",
  "30D",
]);

// type StatsPeriod = z.infer<typeof statsPeriodsEnum>;

//handle daytlight shift
const withInDateRange = (date: Date) => {
  return (
    dayjs(date).isAfter(dayjs(fromDate)) && dayjs(date).isBefore(dayjs(toDate))
  );
};

export const searchParamsSchema = z.union([
  z.object({
    statsPeriod: statsPeriodsEnum,
  }),
  z.object({
    from: z.coerce.date().refine((value) => withInDateRange(value)),
    to: z.coerce.date().refine((value) => withInDateRange(value)),
  }),
]);

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const parsedParams = searchParamsSchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );

  if (!parsedParams.success) {
    searchParams.delete("from");
    searchParams.delete("to");

    searchParams.set("statsPeriod", "Today");

    return redirect(url.toString());
  }

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return json({ tableData: tableData as TableData[] });
}

export default function Reports() {
  const { tableData } = useLoaderData() as {
    tableData: TableData[] | undefined;
  };

  console.log(tableData);

  return (
    <div className="bg-gray-100 flex h-screen w-full flex-col gap-3 justify-start items-start p-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link prefetch="render" to={"/"}>
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Reports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold text-gray-700">Reports</h1>
      <div className="flex w-full justify-between ">
        <div className="flex space-x-1 border p-1 border-gray-300 rounded-md">
          <DatePicker />
          <QeuesFilter />
        </div>

        <span className="font-extralight tracking-tight">
          {tableData?.length || "No"} results found
        </span>
      </div>
      {tableData && <DataTable columns={columns} data={tableData} />}
    </div>
  );
}
