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

export const searchParamsSchema = z.union([
  z.object({
    statsPeriod: statsPeriodsEnum,
  }),
  z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
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
      <DatePicker />
    </div>
  );
}
