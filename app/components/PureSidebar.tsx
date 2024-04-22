import { useState } from "react";
import { LogOut, PanelsTopLeft, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {useDirection} from "~/utils/useDirection";
import { cn } from "~/lib/utils";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isOpen: boolean;
  isTransition: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsTransition: (isTransition: boolean) => void;
}

export const PureSidebar = ({ isOpen, setIsOpen, isTransition, setIsTransition }: SidebarProps) => {
  const [isFull, setIsFull] = useState(false);
  const isRTL = useDirection();
  const {t} = useTranslation();
  const { i18n } = useTranslation();

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
          "w-[288px] border border-gray-300 border-r-2 pr-6 pl-6",
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
          <div className="flex items-center justify-between pb-3 border-b border-gray-300">
              <p className="text-gray-500 font-medium">{t("sidebar.language")}</p>
              <label className="relative cursor-pointer" htmlFor="language">
                <Link 
                    to={`?lng=${i18n.language === "en" ? "he" : "en"}`} 
                    onClick={() => {
                      setIsTransition(false);
                      !isFull && setIsOpen(false);
                    }}
                >
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isRTL}
                    onChange={() => {}}
                    id="language"
                    />
                  <div className={cn(
                    "w-[56px] h-7 text-[13px] flex items-center bg-gray-100 border border-gray-300 rounded-full text-white after:flex after:items-center after:justify-center peer peer-checked:after:translate-x-full after:absolute after:left-[3px] after:bg-blue-600 after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all",
                    !isRTL ? "peer after:content-['EN']" : "peer after:content-['HE']"
                  )} >
                    <span className={cn("absolute text-black", isRTL ? 'left-2' : 'right-2' )} >{isRTL ? "EN" : "HE"}</span>
                  </div>
                </Link>
            </label>
          </div>
          <div className="flex justify-start" >
            <Button variant="ghost" className="pl-0 pr-0" >
              {t("sidebar.logout")}
              <LogOut className="ml-2" />
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};
