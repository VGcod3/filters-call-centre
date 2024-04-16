import { useState } from "react";
import { Menu, StepBack, StepForward } from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const handleMouseEnter = () => {
    if (!isFull) {
      setIsHovered(true);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFull) {
      setIsHovered(false);
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
          {isHovered ? <StepForward /> : <Menu />}
        </Button>
      )}

      <nav
        className={`${
          isOpen ? "w-[300px]" : "w-0"
        } fixed left-0 bg-[#d1d1d1] overflow-hidden ${
          isFull ? "top-0" : "top-[8%]"
        } ${isFull ? "bottom-0" : "bottom-[8%]"} transition-all duration-700 ease-in-out`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full">
          <h2>Content with pure tailwind</h2>
          {isFull && (
            <Button
              className="absolute right-3 top-3"
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsFull(false);
                setIsOpen(false);
                setIsHovered(false);
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