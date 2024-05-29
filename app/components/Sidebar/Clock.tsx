import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarDays } from "lucide-react";

export const Clock = () => {
  const [time, setTime] = useState<Dayjs>(dayjs());
  const timerId = useRef<null | number>(null);

  useEffect(() => {
    const startTimer = () => {
      if (timerId.current) return;
      timerId.current = window.setInterval(
        () => setTime((currTime) => currTime.add(1, "s")),
        1000,
      );
    };

    const stopTimer = () => {
      timerId.current && window.clearInterval(timerId.current);
      timerId.current = null;
    };

    const onVisibilityChange = () => {
      switch (document.visibilityState) {
        case "visible":
          setTime(dayjs());
          startTimer();
          break;
        case "hidden":
          stopTimer();
          break;
        default:
          break;
      }
    };
    startTimer();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
      <div
        className={"flex flex-col w-full items-center justify-center rounded bg-[#EAECF0] py-4 gap-[11px] text-gray-900 "}
      >
        <p
          className={"font-semibold text-3xl"}
        >
          {time.format("HH:mm:ss")}
        </p>
        <div className="flex items-center text-sm gap-1">
          <CalendarDays className="w-4 h-4" />
          {time.format("MMM DD YYYY")}
        </div>
      </div>
  );
};