import type { MetaFunction } from "@remix-run/node";
import DatePicker from "~/components/DatePicker";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="bg-gray-200 flex h-screen w-full justify-start items-start p-5">
      <DatePicker />
    </div>
  );
}
