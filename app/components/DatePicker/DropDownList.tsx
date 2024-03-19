import { useSearchParams } from "@remix-run/react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { useDatePickerContext } from "./DatePickerContext";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { useRef } from "react";

export const DropDownList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const prelastRef = useRef<HTMLDivElement>(null);

  const {
    dateOptions,

    toggleDropdown,

    toggleCalendarAndCloseDropdown,
  } = useDatePickerContext();

  const onCheckedChange = (opt: string) => {
    setSearchParams((prev) => {
      prev.delete("from");
      prev.delete("to");

      prev.set("statsPeriod", opt);

      return prev;
    });

    toggleDropdown();
  };

  return (
    <DropdownMenuContent className="w-56" align="start">
      {dateOptions.map((opt, i) => (
        <DropdownMenuCheckboxItem
          className="text-blue-600"
          key={opt.value}
          checked={
            searchParams.has("statsPeriod") &&
            searchParams.get("statsPeriod") === opt.value
          }
          ref={i === dateOptions.length - 1 ? prelastRef : undefined}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowDown" && i === dateOptions.length - 1) {
              buttonRef.current?.focus();
            }
          }}
          onCheckedChange={() => onCheckedChange(opt.value)}
        >
          <span className="text-gray-700">{opt.label}</span>
        </DropdownMenuCheckboxItem>
      ))}

      <DropdownMenuSeparator className="my-0.5" />

      <Button
        ref={buttonRef}
        variant={"ghost"}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            prelastRef.current?.focus();
          } else if (e.key === "ArrowRight") {
            toggleCalendarAndCloseDropdown();
          }
        }}
        onClick={toggleCalendarAndCloseDropdown}
        className="pr-2 py-1.5 pl-2 w-full text-gray-700 font-normal focus-visible:bg-accent focus-visible:ring-0"
      >
        <CheckIcon
          strokeWidth={1.5}
          className={cn(
            "p-1 text-blue-600",
            searchParams.has("from") && searchParams.has("to")
              ? "opacity-100"
              : "opacity-0"
          )}
        />
        <span className="flex w-full justify-between items-center">
          Custom
          <ChevronRightIcon strokeWidth={1.5} className="p-1" />
        </span>
      </Button>
    </DropdownMenuContent>
  );
};
