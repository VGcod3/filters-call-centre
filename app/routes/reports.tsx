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
// import { MaskedTimeInput } from "~/components/DatePicker/TimeInput";

import { AgentsFilter } from "~/components/MultiSelect/AgentsFilter";
import { StatusFilter } from "~/components/MultiSelect/StatusFilter";
import { TeamsFilter } from "~/components/MultiSelect/TeamsFilter";
import { QueuesFilter } from "~/components/MultiSelect/QueuesFilter";

import { tableData } from "~/components/SimpleTable/mock-data";
import { columns } from "~/components/SimpleTable/columns";
import { DataTable } from "~/components/SimpleTable/DataTable";

import { fromDate, toDate } from "~/components/DatePicker/DatePicker";
import dayjs from "dayjs";

export const meta: MetaFunction = () => {
  return [{ title: "Reports" }, { name: "description", content: "Reports" }];
};

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

export function loader({ request }: LoaderFunctionArgs) {
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

  return json({ tableData });
}

export default function Reports() {
  const { tableData: data } = useLoaderData<typeof loader>();

  return (
    <div className="bg-gray-200 flex h-screen w-full flex-col gap-3 justify-start items-start p-5">
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
          <QueuesFilter />
          <AgentsFilter />
          <TeamsFilter />
          <StatusFilter />
        </div>

        <span className="font-extralight tracking-tight">
          {data?.length || "No"} results found
        </span>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
