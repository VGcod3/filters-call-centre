import { useState } from "react";
import { ChevronLeft, ChevronRight, PanelsTopLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import {useDirection} from "~/utils/useDirection";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface SidebarProps {
  isOpen: boolean;
  isTransition: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsTransition: (isTransition: boolean) => void;
}

export const PureSidebar = ({ isOpen, setIsOpen, isTransition, setIsTransition }: SidebarProps) => {
  const [isFull, setIsFull] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { i18n } = useTranslation();
  const isRTL = useDirection();

  const handleMouseEnter = () => {
    if (!isFull) {
      setIsOpen(true);
    }
    setIsTransition(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isFull) {
      setIsOpen(false);
    }
    setIsHovered(false);
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
          "w-[288px] border border-gray-300 border-r-2 pl-6 pr-6",
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
        <div className="flex justify-between pt-10 items-center" >
          <div className="flex items-center w-full" >
            <Avatar className="w-12 h-12" >
              <AvatarFallback className="bg-gray-800 text-white font-semibold" >SW</AvatarFallback>
            </Avatar>
            <div className={"px-4 transition-all duration-500 whitespace-nowrap"}>
              <h2 className="text-gray-900 font-semibold leading-6 text-lg">
                Sarah Wilson
              </h2>
              <h1 className="text-gray-900 font-normal opacity-80 leading-4 text-sm">
                Admin
              </h1>
            </div>
          </div>
          {isFull && isHovered && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
                setIsTransition(true);
              }}
            >
              {isRTL ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          )}
        </div>
          <div className="flex items-center justify-center w-full">
            <Button asChild className="bg-red-500" onClick={() => {
              setIsTransition(false);
              !isFull && setIsOpen(false);
            }}>
                <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
                    Switch
                </Link>
            </Button>
          </div>
      </nav>
    </div>
  );
};
