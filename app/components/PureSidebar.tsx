import { ChevronLeft, ChevronRight, PanelsTopLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import {useDirection} from "~/utils/useDirection";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface SidebarProps {
  state: SidebarState;
  dispatch: React.Dispatch<SidebarAction>;
}

interface SidebarState {
  isOpen: boolean;
  isTransition: boolean;
  isFull: boolean;
  isHovered: boolean;
}

type SidebarAction =
  | { type: "OPEN_SIDEBAR" }
  | { type: "CLOSE_SIDEBAR" }
  | { type: "FULL_OPEN" }
  | { type: "STOP_TRANSITION" }
  | { type: "CLOSE_SIDEBAR_NOT_FULL" };

export const sidebarReducer = (state: SidebarState, action: SidebarAction): SidebarState => {
  switch (action.type) {
    case "OPEN_SIDEBAR":
      return { ...state, isOpen: true, isTransition: true, isHovered: true };
    case "CLOSE_SIDEBAR":
      return { ...state, isOpen: false, isFull: false };
    case "FULL_OPEN":
      return { ...state, isFull: true, isOpen: true};
    case "STOP_TRANSITION": 
      return { ...state, isTransition: false };
    case "CLOSE_SIDEBAR_NOT_FULL": 
      if(!state.isFull){
        return {...state, isOpen: false, isFull: false, isHovered: false};
      }
      return {...state, isHovered: false}
    default:
      throw new Error("Invalid action type");
  }
};

export const PureSidebar = ({ state, dispatch }: SidebarProps) => {
  const { i18n } = useTranslation();
  const isRTL = useDirection();

  const switchLanguageSidebarBehavior = () => {
    dispatch({ type: "STOP_TRANSITION" });
    dispatch({ type: "CLOSE_SIDEBAR_NOT_FULL" });
  }

  return (
    <div>
      <div 
        className={cn("absolute top-1 pl-5 pr-7 pt-2 pb-10", isRTL ? 'right-0' : 'left-0')}
        onMouseEnter={() => dispatch({ type: "OPEN_SIDEBAR" })}
        onMouseLeave={() => dispatch({ type: "CLOSE_SIDEBAR_NOT_FULL" })}
       >
      {!state.isFull && (
        <Button
          onClick={() => dispatch({ type: "FULL_OPEN" })}
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
        "w-[288px] border border-gray-300 border-r-2 pl-6 pr-6 fixed bg-white overflow-hidden",
        state.isOpen
          ? state.isFull
            ? "translate-x-0"
            : isRTL
            ? "-translate-x-3"
            : "translate-x-3"
          : isRTL
          ? "translate-x-[100%]"
          : "translate-x-[-100%]",
        state.isFull ? "top-0 bottom-0" : "top-[8%] bottom-[1%] rounded-xl",
        state.isTransition && "transition-all duration-500 ease-in-out",
        isRTL ? 'right-0' : 'left-0'
      )}
      onMouseEnter={() => {
        state.isOpen && dispatch({type: "OPEN_SIDEBAR"});
      }}
      onMouseLeave={() => dispatch({type: "CLOSE_SIDEBAR_NOT_FULL"})}
      >
        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-4" >
            <Avatar className="w-12 h-12" >
              <AvatarFallback className="bg-gray-800 text-white font-semibold" >SW</AvatarFallback>
            </Avatar>
            <div className="whitespace-nowrap overflow-hidden">
              <h2 className="text-gray-900 text-[16px] font-semibold overflow-hidden overflow-ellipsis">
                Sarah Wilson
              </h2>
              <h1 className="text-gray-900 opacity-80 text-sm">
                Admin
              </h1>
            </div>
          </div>
          {state.isFull && state.isHovered && (
            <Button
              size="icon"
              className="w-5 h-5"
              variant="ghost"
              onClick={() => dispatch({ type: "CLOSE_SIDEBAR"})}
            >
              {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          )}
          </div>
          <div className="flex items-center justify-center w-full">
            <Button asChild className="bg-red-500" onClick={switchLanguageSidebarBehavior}>
                <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
                    Switch
                </Link>
            </Button>
        </div>
      </nav>
    </div>
  );
};
