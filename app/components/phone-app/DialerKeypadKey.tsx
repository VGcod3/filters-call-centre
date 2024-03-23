import { Button } from "~/components/ui/button";
import { usePhone } from "~/contexts/phone";
import { cn } from "~/lib/utils";
export type KeyPadNumber =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "*"
  | "0"
  | "#";

const keyPadLetters: Record<KeyPadNumber, string> = {
  "1": "",
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jkl",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz",
  "0": "+",
  "*": "",
  "#": "",
};

interface DialerKeypadKeyProps {
  keyValue: KeyPadNumber;
}

export function DialerKeypadKey({ keyValue }: DialerKeypadKeyProps) {
  const { setDialerInput, dialerInput } = usePhone();
  const letters = keyPadLetters[keyValue];

  const handleClick = () => {
    setDialerInput(dialerInput + keyValue);
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        "bg-gray-300 flex flex-col items-center w-20 h-16 rounded-full text-md",
        {
          "justify-end": letters.length > 0,
          "justify-center": letters.length === 0,
        }
      )}
      onClick={handleClick}
    >
      {keyValue}
      {letters.length > 0 && (
        <small className="text-xs font-normal uppercase">{letters}</small>
      )}
    </Button>
  );
}
