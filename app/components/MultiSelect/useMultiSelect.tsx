import { Separator } from "~/components/ui/separator";
import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import type {
  GroupedList,
  GroupedListItem,
  ListItem,
  PlainList,
} from "./types";

export const useMultiSelect = (
  name: string,
  dataList: GroupedListItem[] | ListItem[]
) => {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const toggleCheckbox = (id: string) => {
    const searchAgents = searchParams.getAll(name);

    if (searchAgents.includes(id)) {
      setSearchParams(() => {
        searchParams.delete(name, id);
        return searchParams;
      });
    } else {
      setSearchParams(() => {
        searchParams.append(name, id);
        return searchParams;
      });
    }
  };

  const handleClearAll = () => {
    setSearchParams(() => {
      searchParams.delete(name);
      return searchParams;
    });
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const isGrouped = (list: GroupedList | PlainList): list is GroupedList =>
    (list as GroupedList)[0]?.listItems !== undefined;

  const getButtonLabel = (name: string, label: string) => {
    const searchItems = searchParams.getAll(name);

    const validSearchItems = searchItems.filter((item) => {
      if (isGrouped(dataList)) {
        return dataList.some((group) => group.listItems.includes(item));
      }
      return dataList.includes(item);
    });

    if (validSearchItems.length === 0) {
      return label;
    }

    if (validSearchItems.length > 2) {
      return (
        <div className="flex space-x-1 h-full">
          {label}
          <Separator orientation="vertical" className="ml-1" />
          <Badge className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-sm px-1.5">
            {validSearchItems.length} selected
          </Badge>
        </div>
      );
    }

    return (
      <div className="flex space-x-1 h-full">
        {label}
        <Separator orientation="vertical" className="ml-1" />
        {validSearchItems.map((item) => (
          <Badge
            key={item}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-sm px-1.5"
          >
            {item}
          </Badge>
        ))}
      </div>
    );
  };

  return {
    open,
    setOpen,
    isGrouped,
    toggleCheckbox,
    handleClearAll,
    getButtonLabel,
    toggleDropdown,
  };
};
