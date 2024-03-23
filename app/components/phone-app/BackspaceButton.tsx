import type { ButtonProps } from "~/components/ui/button";
import { PhoneActionButton } from "./PhoneActionButton";
import { DeleteIcon } from "lucide-react";

export const BackSpaceButton = (props: ButtonProps) => (
  <PhoneActionButton
    variant="ghost"
    {...props}
    className="hover:bg-transparent"
  >
    <DeleteIcon />
  </PhoneActionButton>
);
