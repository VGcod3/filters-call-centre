import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function loader() {
  return null;
}

const dropdownOptions = ["Item 1", "Item 2", "Item 3"] as const;

type DropdownContentType = "checkbox" | "calendar";

export default function Dropdown() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownValue = searchParams.get("dropdownValue") || dropdownOptions[0];

  const [dropdownContentType, setDropdownContentType] =
    useState<DropdownContentType>("checkbox");

  return (
    <div className="p-4">
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open && dropdownContentType === "calendar") {
            setTimeout(() => {
              setDropdownContentType("checkbox");
            }, 500);
          }
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">{dropdownValue}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[200px]"
          align="end"
          alignOffset={-10}
        >
          {dropdownContentType === "checkbox" ? (
            <>
              {dropdownOptions.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item}
                  checked={item === dropdownValue}
                  onCheckedChange={() => {
                    setSearchParams({ dropdownValue: item });
                  }}
                >
                  {item}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                onSelect={(e) => {
                  e.preventDefault();
                  setDropdownContentType("calendar");
                }}
                checked={dropdownValue === "custom"}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    setDropdownContentType("calendar");
                  }
                }}
              >
                Custom
                <ChevronRight />
              </DropdownMenuCheckboxItem>
            </>
          ) : (
            <div className="flex flex-col h-[200px]">
              <div className="flex flex-grow items-center justify-center">
                Calendar
              </div>
              <div className="flex  justify-around">
                <DropdownMenuItem
                  asChild
                  onSelect={(e) => {
                    e.preventDefault();
                    setDropdownContentType("checkbox");
                  }}
                >
                  <Button variant={"secondary"}>Back</Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  onSelect={() => {
                    setSearchParams({ dropdownValue: "custom" });
                  }}
                >
                  <Button
                    onKeyDown={(e) => {
                      // focus on its previous sibling when pressing the shift + tab keys
                      if (e.shiftKey && e.key === "Tab") {
                        const prev = e.currentTarget.previousElementSibling;
                        if (prev instanceof HTMLButtonElement) {
                          prev.focus();
                        }
                      }
                    }}
                  >
                    Apply
                  </Button>
                </DropdownMenuItem>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
