import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const PhoneActionButton = ({ className, ...props }: ButtonProps) => (
  <Button className={cn("rounded-full h-16 w-16 p-2", className)} {...props} />
);
