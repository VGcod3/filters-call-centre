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
  const isRTL = useDirection();
  const requestInfo = useRouteLoaderData("root") as SerializeFrom<typeof rootLoader>;
  const display = requestInfo.display;
  return (
    <div className="bg-gray-400 h-screen w-full">
    <PureSidebar />
      <div className={cn("transition-all duration-300", display === displayEnum.enum.full ? "w-[calc(100%-288px)]" : "w-full", isRTL ? "float-left" : "float-right")}>
          <p className="text-3xl">Content</p>
      </div>
    </div>
);
}