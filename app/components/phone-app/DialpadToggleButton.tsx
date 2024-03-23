import { GripIcon } from "lucide-react";
import type { ButtonProps } from "~/components/ui/button";
import { PhoneActionButton } from "./PhoneActionButton";

export const DialPadToggleButton = (props: ButtonProps) => (
  <PhoneActionButton variant="ghost" {...props}>
    <GripIcon />
  </PhoneActionButton>
);
