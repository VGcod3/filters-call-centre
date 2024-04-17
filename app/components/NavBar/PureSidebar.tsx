import { useState } from "react";
import { PanelsTopLeft, StepBack } from "lucide-react";
import { Button } from "../ui/button";
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isFull, setIsFull] = useState(false);

  const handleMouseEnter = () => {
    if (!isFull) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFull) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {!isFull && (
        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFull(true)}
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          <PanelsTopLeft />
        </Button>
      )}

      <nav
        className={clsx(
          "w-[300px]",
          isOpen ? isFull ? "translate-x-0" : "translate-x-3" : "translate-x-[-100%]",
          "fixed left-0 bg-[#d1d1d1] overflow-hidden",
          isFull ? "top-0" : "top-[8%]",
          isFull ? "bottom-0" : "bottom-[8%]",
          "transition-all duration-500 ease-in-out",
          !isFull && "rounded-xl"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full whitespace-nowrap">
          <h2>Content with pure tailwind</h2>
          {isFull && (
            <Button
              className="absolute right-3 top-3"
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
              }}
            >
              <StepBack />
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
