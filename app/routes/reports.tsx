import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
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

import { StatusFilter } from "~/components/MultiSelect/StatusFilter";

import { fromDate, toDate } from "~/components/DatePicker/DatePicker";
import dayjs from "dayjs";
import { QueuesFilter } from "~/components/MultiSelect/QueuesFilter";

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

export type StatsPeriod = z.infer<typeof statsPeriodsEnum>;

export const datesSchema = z.union([
  z.object({
    statsPeriod: statsPeriodsEnum,
  }),
  z.object({
    from: z
      .string()
      .datetime()
      .refine((value) => withInDateRange(value)),
    to: z
      .string()
      .datetime()
      .refine((value) => withInDateRange(value)),
  }),
]);

export const searchParamsSchemaGenerator = (valiedQueues: string[]) =>
  datesSchema.and(
    z.object({
      queues: z.optional(
        z
          .string()
          .refine((value) => valiedQueues.includes(value))
          .array()
      ),
    })
  );

//handle daytlight shift
const withInDateRange = (date: string) => {
  return (
    dayjs(date).isAfter(dayjs(fromDate)) && dayjs(date).isBefore(dayjs(toDate))
  );
};

export const searchParamsSchema = z.union([
  z.object({
    statsPeriod: statsPeriodsEnum,
  }),
  z.object({
    from: z
      .string()
      .datetime()
      .refine((value) => withInDateRange(value)),
    to: z
      .string()
      .datetime()
      .refine((value) => withInDateRange(value)),
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

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return null;
}

export default function Reports() {
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

      <div className="flex space-x-1 p-1 border border-gray-300 rounded-md">
        <DatePicker />
        <QueuesFilter />
        <StatusFilter />
      </div>
    </div>
  );
}
