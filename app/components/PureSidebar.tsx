import { ChevronLeft, ChevronRight, PanelsTopLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useDirection } from "~/utils/useDirection";
import { Link } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useReducer } from "react";

enum Display {
  Full = 'full',
  Floating = 'floating',
  Hidden = 'hidden',
}

interface NewState {
  display: Display;
  isHovered: boolean;
  isTransition: boolean;
  isFloating: boolean;
}

type SidebarAction =
  | { type: "hovered_open_button_or_edge" }
  | { type: "unhovered" }
  | { type: "opened_full_mode" }
  | { type: "hovered_sidebar" }
  | { type: "stoped_transition" }
  | { type: "closed_sidebar" }

export const sidebarReducer = (state: NewState, action: SidebarAction) => {
  switch (action.type) {
    case "hovered_open_button_or_edge":
      if (state.display === Display.Full) return state;
      return { ...state, display: Display.Floating, isTransition: true, isFloating: true};
    case "unhovered":
      if (state.display === Display.Full) return { ...state, isHovered: false };
      return { ...state, display: Display.Hidden };
    case "hovered_sidebar":
      if (state.display === Display.Full) return { ...state, isHovered: true };
      return state
    case "opened_full_mode":
      return { ...state, display: Display.Full, isHovered: true, isFloating: false }
    case "closed_sidebar":
      return { ...state, display: Display.Hidden, isHovered: false }
    case "stoped_transition":
      if (state.display === Display.Full) return state;
      return { ...state, isTransition: false}
    default:
      throw new Error("Invalid action type");
  }
};

export const PureSidebar = () => {
  const { i18n } = useTranslation();
  const isRTL = useDirection();

  const [state, dispatch] = useReducer(sidebarReducer, {
    display: Display.Hidden,
    isHovered: false,
    isTransition: false,
    isFloating: false,
  });

  return (
    <div>
      <div
        className={cn("absolute top-1 pl-5 pr-7 pt-2 pb-10", isRTL ? 'right-0' : 'left-0')}
        onMouseEnter={() => dispatch({ type: "hovered_open_button_or_edge" })}
        onMouseLeave={({ clientX, clientY }) => {
          const isInvalidPosition = isRTL ? clientX > window.innerWidth - 84 && clientY > 0 : clientX < 84 && clientY > 0;
          if (isInvalidPosition) return;
          dispatch({ type: "unhovered" });
        }}
      >
        {state.display !== Display.Full && (
          <Button
            onClick={() => dispatch({ type: "opened_full_mode" })}
            variant="ghost"
            size="icon"
            className="cursor-pointer"
          >
            <PanelsTopLeft />
          </Button>
        )}
      </div>

      {
        state.display === Display.Floating || state.display === Display.Full
          ? null
          : <div
            className={cn("fixed bg-transparent top-[84px] w-2.5 h-full", isRTL ? 'right-0' : 'left-0')}
            onMouseEnter={() => dispatch({ type: "hovered_open_button_or_edge" })}
          />
      }
      <nav
        className={cn(
          "w-[288px] border border-gray-300 border-r-2 pl-6 pr-6 bg-white",
          state.isTransition ? "transition-all duration-500 ease-in-out" : "opacity-0",
          state.display === Display.Floating
            ? isRTL
              ? "-translate-x-3"
              : "translate-x-3"
            : state.display === Display.Full
              ? "translate-x-0"
              : isRTL
                ? "translate-x-[100%]"
                : "translate-x-[-100%]",
          state.display === Display.Full && "h-screen",
          state.display === Display.Floating && "absolute top-[8%] bottom-[1%] rounded-xl",
          state.display === Display.Hidden ? (state.isFloating ? 'absolute top-[8%] bottom-[1%] rounded-xl' : 'h-screen') : '',
          isRTL ? "right-0" : "left-0"
        )}
        onMouseEnter={({ clientX }) => {
          const shouldReturn = isRTL ? clientX >= window.innerWidth - 84 : clientX <= 84;
          if (shouldReturn) return;
          dispatch({ type: "hovered_sidebar" });
        }}
        onMouseLeave={({ clientX, clientY }) => {
          const shouldReturn = isRTL
            ? (clientX > window.innerWidth - 15) ||  (clientX > window.innerWidth - 84 && clientY <= 85)
            : (clientX < 15) || (clientX < 84 && clientY <= 85);

          if (shouldReturn) return;
          dispatch({ type: "unhovered" });
        }}
      >
        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gray-800 text-white font-semibold">SW</AvatarFallback>
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
          {state.display === Display.Full && state.isHovered && (
            <Button
              size="icon"
              className="w-5 h-5"
              variant="ghost"
              onClick={() => dispatch({ type: "closed_sidebar" })}
            >
              {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </Button>
          )}
        </div>
        <div className="flex items-center justify-center w-full">
          <Button asChild className="bg-red-500" onClick={() => dispatch({type: "stoped_transition"})}>
            <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
              Switch
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};