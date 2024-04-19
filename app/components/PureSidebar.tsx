import { useState } from "react";
import { PanelsTopLeft, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import {useDirection} from "~/utils/useDirection";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const PureSidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isFull, setIsFull] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const isRTL = useDirection();

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
        className={cn(
          "w-[300px]",
          isOpen
            ? isFull
              ? "translate-x-0"
              : isRTL 
                ? "-translate-x-3" 
                : "translate-x-3"
            : isRTL 
              ? "translate-x-[100%]" 
              : "translate-x-[-100%]",
          "fixed bg-[#d1d1d1] overflow-hidden",
          isFull ? "top-0" : "top-[8%]",
          isFull ? "bottom-0" : "bottom-[8%]",
          "transition-all duration-500 ease-in-out",
          !isFull && "rounded-xl",
          isRTL ? 'right-0' : 'left-0'
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full">
          <div className="flex justify-between" >
            <h2 className="text-xl" >{t("header")}</h2>
            {isFull && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
              }}
            >
              <XIcon />
            </Button>
          )}
          </div>
          <div className="flex items-center justify-center w-full">
            <Button asChild className="bg-red-500">
                <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
                    Switch
                </Link>
            </Button>
          </div>
          <p>{t("text")}</p>
          <p>{t("description")}</p>
        </div>
      </nav>
    </div>
  );
};
