import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { forwardRef } from "react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useNavigation, useSearchParams } from "@remix-run/react";
import type { GroupedListItem, ListItem } from "./MultiSelect/types";
import { isGrouped } from "./MultiSelect/useMultiSelect";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

function LabelBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        "bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-sm px-1.5",
        className
      )}
    >
      {label}
    </Badge>
  );
}
interface TriggerButtonProps {
  name: string;
  title: string;
  dataList: ListItem[] | GroupedListItem[];
  Icon: LucideIcon;
}

const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
  ({ Icon, name, title, dataList }, ref) => {
    const [searchParams] = useSearchParams();
    const navigation = useNavigation();

    const loading = navigation.state === "loading";

    const searchValues = loading
      ? new URLSearchParams(navigation.location?.search).getAll(name)
      : searchParams.getAll(name);

    const validDataList = isGrouped(dataList)
      ? dataList
          .flatMap((group) => group.listItems)
          .filter((item) => searchValues.includes(item.value))
      : dataList.filter((item) => searchValues.includes(item.value));

    return (
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          className="w-auto min-w-28 text-gray-600 px-2.5 flex gap-1.5 justify-between border-none select-none"
        >
          <Icon size={16} strokeWidth={1.5} />
          {validDataList.length === 0 ? (
            title
          ) : (
            <div className="flex space-x-1 h-full">
              {title}
              <Separator orientation="vertical" className="ml-1" />
              {validDataList.length > 2 ? (
                <LabelBadge label={`${validDataList.length} selected`} />
              ) : (
                validDataList.map((item) => (
                  <LabelBadge
                    key={item.value}
                    label={item.label}
                    className="text-xs"
                  />
                ))
              )}
            </div>
          )}
          <ChevronDownIcon size={16} strokeWidth={1.5} />
        </Button>
      </PopoverTrigger>
    );
  }
);

TriggerButton.displayName = "TriggerButton";

export { TriggerButton };
