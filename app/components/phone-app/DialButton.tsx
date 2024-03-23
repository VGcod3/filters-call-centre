import { PhoneIcon } from "lucide-react";
import type { ButtonProps } from "~/components/ui/button";
import { PhoneActionButton } from "./PhoneActionButton";

export const DialButton = (props: ButtonProps) => (
  <PhoneActionButton {...props}>
    <PhoneIcon />
  </PhoneActionButton>
);
