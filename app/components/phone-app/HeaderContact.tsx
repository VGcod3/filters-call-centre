import { usePhone } from "~/contexts/phone";
import { cn } from "~/lib/utils";

interface HeaderContactProps {
  name?: string;
  phone?: string;
}

const callStatusMap: Record<string, string> = {
  ringing: "Incoming Call",
  dialing: "Dialing",
  talking: "Incoming Call - 05:24",
};

export function HeaderContact({
  name = "Darrel Steward",
  phone = "2705550117",
}: HeaderContactProps) {
  const { phoneState, dialerOpen } = usePhone();
  const callStatus = callStatusMap[phoneState];
  const textSize = dialerOpen ? "text-xl" : "text-3xl";
  const formattedPhone =
    phone.length === 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : phone;

  return (
    <div className="text-center p-4">
      <p className="font-bold text-xs">{callStatus}</p>
      <p className={cn("font-bold mt-3", textSize)}>{name}</p>
      <p className="text-gray-500 mt-1 mb-q text-xs">{formattedPhone}</p>
    </div>
  );
}
