import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { PhoneCallIcon } from "lucide-react";
import { PropsWithChildren } from "react";

import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface RoundButtonProps extends PropsWithChildren, ButtonProps {}

const RoundButton = ({ children, className, ...props }: RoundButtonProps) => {
  return (
    <Button className={cn("rounded-full h-16 w-16 p-2", className)} {...props}>
      {children}
    </Button>
  );
};

export default function Index() {
  return (
    <div className="bg-gray-200 flex flex-col gap-5 h-screen w-full justify-start items-start p-5">
      <Button variant={"outline"} asChild>
        <Link prefetch="intent" to={"/reports"}>
          Reports
        </Link>
      </Button>

      <RoundButton className="bg-black">
        <PhoneCallIcon />
      </RoundButton>
      <RoundButton variant={"ghost"}>
        <PhoneCallIcon />
      </RoundButton>
    </div>
  );
}
