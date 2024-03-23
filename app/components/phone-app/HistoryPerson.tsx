import {
  PhoneIncomingIcon,
  PhoneOutgoingIcon,
  PhoneMissedIcon,
} from "lucide-react";
import { cn } from "~/lib/utils";

interface HistoryPersonProps {
  name?: string;
  phone?: string;
  time?: string;
  historyStatus: "outgoing" | "incoming" | "missed";
}

const historyStatusMap: Record<
  HistoryPersonProps["historyStatus"],
  React.ReactNode
> = {
  outgoing: <PhoneOutgoingIcon size={20} />,
  incoming: <PhoneIncomingIcon size={20} />,
  missed: <PhoneMissedIcon size={20} className="text-red-500" />,
};

export function HistoryPerson({
  historyStatus = "incoming",
  name = "Ralph Edwards",
  phone = "6035550124",
  time = "12:42",
}: HistoryPersonProps) {
  const formattedPhone =
    phone.length === 10
      ? `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`
      : phone;

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-500 rounded-full flex justify-center items-center text-xl text-white mr-1">
          N
        </div>
        <div>
          <p
            className={cn(
              "text-base font-bold",
              historyStatus == "missed" && "text-red-500"
            )}
          >
            {name}
          </p>
          <p className="text-gray-500 text-sm">{formattedPhone}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm">{time}</p>
          {historyStatusMap[historyStatus]}
        </div>
        <p className="text-gray-500 text-sm">12min ago</p>
      </div>
    </div>
  );
}
