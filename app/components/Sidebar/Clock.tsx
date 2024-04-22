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
      className={"flex items-center justify-center w-full"}
    >
      <div
        className={"flex flex-col w-full items-center justify-center rounded bg-[#EAECF0] gap-2 p-4"}
      >
        <p
          className={"text-black leading-none font-bold text-3xl"}
        >
          {time.format("HH:mm:ss")}
        </p>
        <div className="flex items-center">
          <CalendarDays className="w-4 h-4 text-[#101828] mr-2" />
          <p className="text-[#101828]">
            {time.format("MMM DD YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};