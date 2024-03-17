import { ChevronDownIcon, LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import React from "react";
import { DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

interface TriggerButtonProps {
  children: React.ReactNode;
  toggleDropdown: () => void;
  isOpen: boolean;
  Icon: LucideIcon;
}

const TriggerButton = ({
  children,
  isOpen,
  Icon,
  toggleDropdown,
}: TriggerButtonProps) => {
  return (
    <DropdownMenuTrigger asChild>
      <Button
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        onClick={toggleDropdown}
        variant="outline"
        className="w-auto min-w-28 text-gray-600 px-2.5 flex gap-1.5 justify-between border-none select-none"
      >
        <Icon size={16} strokeWidth={1.5} />
        {children}
        <ChevronDownIcon
          size={16}
          strokeWidth={1.5}
          className={cn("transition-all transform", isOpen && "-rotate-180")}
        />
      </Button>
    </DropdownMenuTrigger>
  );
};

// const TriggerButton = forwardRef<HTMLButtonElement, TriggerButtonProps>(
//   (props, ref) => {
//     const { children, isOpen, Icon, toggleDropdown } = props;
//     return (
//       <DropdownMenuTrigger asChild>
//         <Button
//           onClick={toggleDropdown}
//           ref={ref}
//           variant="outline"
//           className="w-auto min-w-28 text-gray-600 px-2.5 flex gap-1.5 justify-between border-none select-none"
//         >
//           <Icon size={16} strokeWidth={1.5} />
//           {children}
//           <ChevronDownIcon
//             size={16}
//             strokeWidth={1.5}
//             className={cn("transition-all transform", isOpen && "-rotate-180")}
//           />
//         </Button>
//       </DropdownMenuTrigger>
//     );
//   }
// );

// TriggerButton.displayName = "TriggerButton";

export default TriggerButton;
