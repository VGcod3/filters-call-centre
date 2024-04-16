import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, StepBack, StepForward } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFull, setIsFull] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if(!isFull){
      setIsHovered(true);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if(!isFull){
      setIsHovered(false);
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
          className="cursor-pointer"
        >
          {isHovered ? <StepForward /> : <Menu />}
        </motion.button>
      )}
      <motion.nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ width: "0px" }}
        animate={{ width: isOpen ? '300px' : 0}}
        className={`fixed left-0 bg-[#d1d1d1] overflow-hidden ${isFull ? 'top-0' : 'top-[8%]'} ${isFull ? 'bottom-0' : 'bottom-[8%]'}`}
      >
        <div className="relative w-full whitespace-nowrap">
          <h2>Content</h2>
          {isFull && (
            <motion.button
              className="absolute right-3 top-3"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
                setIsHovered(false);
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