import { useNavigation, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { GroupedList, PlainList } from "./types";

export const isGrouped = (list: GroupedList | PlainList): list is GroupedList =>
  (list as GroupedList)[0]?.listItems !== undefined;

export const useMultiSelect = (name: string) => {
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  const [searchParams, setSearchParams] = useSearchParams();

  const [checkboxes, setCheckboxes] = useState<string[]>(
    searchParams.getAll(name),
  );

  const isLoading = navigation.state === "loading";

  useEffect(() => {
    if (isLoading) {
      setCheckboxes(
        new URLSearchParams(navigation.location?.search).getAll(name),
      );
    }
  }, [isLoading, navigation.location?.search, name]);

  const toggleCheckbox = (id: string) => {
    if (checkboxes.includes(id)) {
      setCheckboxes((prev) => prev.filter((item) => item !== id));
    } else {
      setCheckboxes((prev) => [...prev, id]);
    }
  };

  const handleClearAll = () => {
    setSearchParams(() => {
      searchParams.delete(name);
      return searchParams;
    });

    setCheckboxes([]);
  };

  const handleApply = () => {
    setSearchParams(() => {
      searchParams.delete(name);
      checkboxes.forEach((item) => searchParams.append(name, item));

      return searchParams;
    });
  };

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  return {
    open,
    setOpen,
    isGrouped,
    toggleCheckbox,
    handleClearAll,
    checkboxes,
    handleApply,
    toggleDropdown,
  };
};
