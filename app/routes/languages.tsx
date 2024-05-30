import type { MetaFunction, SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { PureSidebar, displayEnum } from "~/components/PureSidebar";
import { cn } from "~/lib/utils";
import { type loader as rootLoader } from "~/root";
import { useDirection } from "~/utils/useDirection";

export const meta: MetaFunction = () => {
  return [
    { title: "Languages | i18N | Sidebar" },
    { name: "description", content: "i18n Page" },
  ];
};

export default function Languages() {
  const requestInfo = useRouteLoaderData("root") as SerializeFrom<typeof rootLoader>;
  const display = requestInfo.display;
  const isRTL = useDirection();
  return (
    <div className=" bg-gray-400 h-screen w-full">
    <PureSidebar />

      <div className="pl-12 pt-5">
          <p className="text-3xl">Content</p>
      </div>
    </div>
);
}