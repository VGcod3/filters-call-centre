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
    <div>
        <PureSidebar />
    </div>
  );
}