import type { ButtonProps } from "~/components/ui/button";
import { PhoneActionButton } from "./PhoneActionButton";
import { ChevronDownIcon } from "lucide-react";

export const ChevronButton = (props: ButtonProps) => (
  <PhoneActionButton
    variant="ghost"
    {...props}
    className="hover:bg-transparent"
  >
    <ChevronDownIcon />
  </PhoneActionButton>
);
