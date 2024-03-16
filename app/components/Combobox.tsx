import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { useDatePickerContext } from "./DatePicker/DatePickerContext";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { useSearchParams } from "@remix-run/react";

export function Combobox() {
  const [searchParams] = useSearchParams();

  const { dateOptions } = useDatePickerContext();

  console.log(dateOptions);

  return (
    <Command className="w-56 h-min">
      <CommandInput placeholder="Filter label..." autoFocus={true} />
      <CommandList>
        <CommandEmpty>No label found.</CommandEmpty>
        <CommandGroup>
          {dateOptions.map((opt) => (
            <CommandItem
              key={opt.label}
              value={opt.label}
              className="data-[disabled]:opacity-100 text-gray-700"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  searchParams.has("statsPeriod") &&
                    searchParams.get("statsPeriod") === opt.value
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
              {opt.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
