import { Input } from "~/components/ui/input";
import { useState } from "react";

const MaskedTimeInput = () => {
  const [time, setTime] = useState("12:00");

  return (
    <Input
      className={"rounded-t-none w-full max-w-full flex justify-center p-0"}
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  );
};

export default MaskedTimeInput;
