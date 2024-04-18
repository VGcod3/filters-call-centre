import { motion } from "framer-motion";
import { useState } from "react";
import { PanelsTopLeft, XIcon } from "lucide-react";
import clsx from 'clsx';
import { useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import useDirection from "~/utils/useDirection";

interface FramerSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const FramerSidebar = ({ isOpen, setIsOpen }: FramerSidebarProps) => {
  const [isFull, setIsFull] = useState<boolean>(false);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {i18n} = useTranslation();
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
        <motion.button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFull(true)}
          className={clsx("cursor-pointer")}
        >
          <PanelsTopLeft />
        </motion.button>
      )}
      <motion.nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ width: "300px", translateX: "-100%" }}
        animate={{
          width: "300px",
          translateX: isOpen 
            ? isFull 
                ? '0' 
                : isRTL 
                    ? '-3%' 
                    : '3%' 
            : isRTL 
                ? "100%" 
                : "-100%",
          transition: { duration: 0.3 },
        }}
        className={clsx(
          "fixed bg-[#d1d1d1] overflow-hidden",
          isFull ? "top-0" : "top-[8%]",
          isFull ? "bottom-0" : "bottom-[8%]",
          !isFull && "rounded-xl",
          isRTL ? "right-0" : "left-0"
        )}
      >
        <div className="relative w-full">
          <div className="flex justify-between" >
            <h2 className="text-xl" >{t("header")}</h2>
            {isFull && (
            <motion.button
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
              }}
            >
              <XIcon />
            </motion.button>
          )}
          </div>
          <div className="flex items-center justify-center w-full">
            <motion.button className="bg-red-500 p-2 rounded-lg" onClick={() => navigate(`?lng=${i18n.language === 'en' ? 'he' : 'en'}`)}>Switch</motion.button>
          </div>
          <p>{t("text")}</p>
          <p>{t("description")}</p>
        </div>
      </motion.nav>
    </div>
  );
};

export default FramerSidebar;