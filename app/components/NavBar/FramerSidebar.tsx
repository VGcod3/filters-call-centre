import { motion } from "framer-motion";
import { useState } from "react";
import { PanelsTopLeft, StepBack } from "lucide-react";
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isFull, setIsFull] = useState<boolean>(false);

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
          translateX: isOpen ? isFull ? '0' : "3%" : "-100%",
          transition: { duration: 0.3 },
        }}
        className={clsx(
          "fixed left-0 bg-[#d1d1d1] overflow-hidden",
          isFull ? "top-0" : "top-[8%]",
          isFull ? "bottom-0" : "bottom-[8%]",
          !isFull && "rounded-xl"
        )}
      >
        <div className="relative w-full">
          <h2>Content</h2>
          {isFull && (
            <motion.button
              className="absolute right-3 top-3"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
              }}
            >
              <StepBack />
            </motion.button>
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default Sidebar;
