import { Input, type InputProps } from "~/components/ui/input";
import { usePhone } from "~/contexts/phone";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { BackSpaceButton } from "./BackspaceButton";
import { ChevronButton } from "./ChevronButton";

const placeholderTxt = "Enter phone number";

export function DialerNumberInput(props: InputProps) {
  const { dialerInput, setDialerInput, toggleDialerOpen } = usePhone();
  const [placeholder, setPlaceholder] = useState(placeholderTxt);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredVal = e.target.value.replace(/[^0-9*#+]/g, "");
    setDialerInput(filteredVal);
  };

  const togglePlaceholder = () => {
    setPlaceholder(placeholder === "" ? placeholderTxt : "");
  };

  return (
    <div className="w-full border-b border-gray-300 shadow-[0_-2px_4px_rgba(0,0,0,0.05)] flex justify-between items-center">
      <ChevronButton onClick={toggleDialerOpen} />
      <Input
        {...props}
        value={dialerInput}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={togglePlaceholder}
        onBlur={togglePlaceholder}
        className={cn(
          "border-none py-6 px-5 rounded-none text-center text-xl placeholder:text-center placeholder:text-base",
          props.className
        )}
      />
      <BackSpaceButton
        onClick={() => setDialerInput(dialerInput.slice(0, -1))}
      />
    </div>
  );
}
