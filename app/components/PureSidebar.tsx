import { useState } from "react";
import { PanelsTopLeft, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {useDirection} from "~/utils/useDirection";
import { cn } from "~/lib/utils";
import { Clock } from "./Sidebar/Clock";

interface SidebarProps {
  isOpen: boolean;
  isTransition: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsTransition: (isTransition: boolean) => void;
}

export const PureSidebar = ({ isOpen, setIsOpen, isTransition, setIsTransition }: SidebarProps) => {
  const [isFull, setIsFull] = useState(false);
  const isRTL = useDirection();

  const handleMouseEnter = () => {
    if (!isFull) {
      setIsOpen(true);
    }
    setIsTransition(true);
  };

  const handleMouseLeave = () => {
    if (!isFull) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div 
        className={cn("absolute top-1 pl-5 pr-7 pt-2 pb-10", isRTL ? 'right-0' : 'left-0')}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
       >
      {!isFull && (
        <Button
          onClick={() => setIsFull(true)}
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          <PanelsTopLeft />
        </Button>
      )}
      </div>

      <nav
        className={cn(
          "w-[288px] border border-gray-300 border-r-2",
          isOpen
            ? isFull
              ? "translate-x-0"
              : isRTL 
                ? "-translate-x-3" 
                : "translate-x-3"
            : isRTL 
              ? "translate-x-[100%]" 
              : "translate-x-[-100%]",
          "fixed bg-white overflow-hidden",
          isFull ? "top-0" : "top-[8%]",
          isFull ? "bottom-0" : "bottom-[1%]",
          isTransition && "transition-all duration-500 ease-in-out",
          !isFull && "rounded-xl",
          isRTL ? 'right-0' : 'left-0'
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full flex flex-col">
          <div className="flex justify-between" >
            {isFull && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
                setIsTransition(true);
              }}
            >
              <XIcon />
            </Button>
          )}
          </div>
          <div className="flex flex-grow justify-center items-end pl-6 pr-6 pb-1">
            <Clock  />
          </div>
        </div>
      </nav>
    </div>
  );
};
