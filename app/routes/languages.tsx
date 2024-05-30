import type { MetaFunction } from "@remix-run/node";
import { PureSidebar } from "~/components/PureSidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Languages | i18N | Sidebar" },
    { name: "description", content: "i18n Page" },
  ];
};

export default function Languages() {
  return (
    <div className="flex bg-gray-400 h-screen w-full">
    <PureSidebar />
      <div className="pl-12 pt-5">
          <p className="text-3xl">Content</p>
      </div>
    </div>
);
}