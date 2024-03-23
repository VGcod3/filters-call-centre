import { DialerKeypadKey, type KeyPadNumber } from "./DialerKeypadKey";

const keypadNumbers: KeyPadNumber[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "0",
  "#",
];

export function DialerKeypad() {
  return (
    <div className="grid grid-cols-3 gap-2 justify-items-center">
      {keypadNumbers.map((number, index) => (
        <DialerKeypadKey key={index} keyValue={number} />
      ))}
    </div>
  );
}
