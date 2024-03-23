import type { ButtonProps } from "~/components/ui/button";
import { PhoneActionButton } from "./PhoneActionButton";
import { PhoneOffIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { usePhone } from "~/contexts/phone";

export const DeclineButton = ({ className, ...props }: ButtonProps) => {
  const { currentCall } = usePhone();
  return (
    <PhoneActionButton
      {...props}
      className={cn("bg-gray-500", className)}
      onClick={() => {
        // switchPhoneState(PhoneState.Idle)
        currentCall?.terminate();
      }}
    >
      <PhoneOffIcon className="scale-x-[-1]" />
    </PhoneActionButton>
  );
};
