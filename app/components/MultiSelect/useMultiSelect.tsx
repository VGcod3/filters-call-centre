import { Separator } from "~/components/ui/separator";
import { useSearchParams } from "@remix-run/react";
import { useState } from "react";

export const useMultiSelect = (name: string) => {
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

  const getButtonLabel = (name: string, label: string) => {
    const searchItems = searchParams.getAll(name);

    if (searchItems.length === 0) {
      return label;
    }

    if (searchItems.length > 2) {
      return (
        <div className="flex space-x-1 h-full">
          {label}
          <Separator orientation="vertical" className="ml-1" />

          <span className="bg-gray-200 text-gray-600 rounded-sm flex space-x-1.5 px-1.5 mx-0">
            {searchItems.length} selected
          </span>
        </div>
      );
    }

    return (
      <div className="flex space-x-1 h-full">
        {label}
        <Separator orientation="vertical" className="ml-1" />

        {searchItems.map((item) => (
          <span
            className="bg-gray-200 text-gray-600 rounded-sm flex space-x-1.5 px-1.5 mx-0"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  return {
    open,
    setOpen,
    toggleCheckbox,
    handleClearAll,
    getButtonLabel,
    toggleDropdown,
  };
};
