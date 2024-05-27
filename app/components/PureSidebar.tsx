import { ChevronLeft, ChevronRight, PanelsTopLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useDirection } from "~/utils/useDirection";
import { Link, useNavigation } from "@remix-run/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useEffect, useReducer } from "react";
import { cn } from "~/lib/utils";

enum Display {
  Full = "full",
  Floating = "floating",
  Hidden = "hidden",
}

interface SidebarState {
  display: Display;
  isHovered: boolean;
  transitionEnabled: boolean;
  sidebarStyle: "full" | "floating";
}

type SidebarAction =
  | { type: "entered_button_or_edge_area" }
  | { type: "left_sidebar" }
  | { type: "opened_full_mode" }
  | { type: "entered_sidebar" }
  | { type: "changed_language" }
  | { type: "closed_sidebar" };

export const sidebarReducer = (
  state: SidebarState,
  action: SidebarAction
): SidebarState => {
  switch (action.type) {
    case "entered_button_or_edge_area":
      return {
        ...state,
        display: Display.Floating,
        transitionEnabled: true,
        sidebarStyle: "floating",
      };
    case "left_sidebar":
      if (state.display === Display.Full) return { ...state, isHovered: false };
      return { ...state, display: Display.Hidden };
    case "entered_sidebar":
      if (state.display === Display.Full) return { ...state, isHovered: true };
      return state;
    case "opened_full_mode":
      return {
        ...state,
        display: Display.Full,
        isHovered: true,
        sidebarStyle: "full",
      };
    case "closed_sidebar":
      return { ...state, display: Display.Hidden, isHovered: false };
    case "changed_language":
      if (state.display === Display.Full) return state;
      return { ...state, transitionEnabled: false };
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
    transitionEnabled: true,
    sidebarStyle: "full",
  });

  const navigation = useNavigation();
  const navSearchParams = new URLSearchParams(navigation.location?.search);

  const notCurrentLanguage = isRTL ? "en" : "he";
  const isChangingLanguage =
    navigation.state === "loading" &&
    navSearchParams.has("lng") &&
    navSearchParams.get("lng") === notCurrentLanguage;

  useEffect(() => {
    if (!isChangingLanguage) return;
    dispatch({ type: "changed_language" });
  }, [isChangingLanguage]);


  return (
    <div>
      <div
        className={cn(
          "absolute top-1 pl-5 pr-7 pt-2 pb-10",
          isRTL ? "right-0" : "left-0"
        )}
        onMouseEnter={() => dispatch({ type: "entered_button_or_edge_area" })}
        onMouseLeave={({ clientX, clientY }) => {
          const isInvalidPosition = isRTL
            ? clientX > window.innerWidth - 84 && clientY > 0
            : clientX < 84 && clientY > 0;
          if (isInvalidPosition) return;
          dispatch({ type: "left_sidebar" });
        }}
      >
        {state.display !== Display.Full && (
            <Button
              name="display"
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: "opened_full_mode" })}
            >
              <PanelsTopLeft />
            </Button>
        )}
      </div>

      {state.display === Display.Floating ||
      state.display === Display.Full ? null : (
        <div
          className={cn(
            "fixed bg-transparent top-[84px] w-2.5 h-full",
            isRTL ? "right-0" : "left-0"
          )}
          onMouseEnter={() => dispatch({ type: "entered_button_or_edge_area" })}
        />
      )}
      <nav
        className={cn(
          "border border-gray-300 border-r-2 bg-white w-[288px] px-6",
          state.transitionEnabled
            ? "transition-all duration-500 ease-in-out"
            : "opacity-0",
          state.display === Display.Full && "translate-x-0",
          state.sidebarStyle === "floating"
            ? "absolute top-[8%] bottom-[1%] rounded-xl"
            : "h-screen",
          isRTL ? "right-0" : "left-0",
          {
            "invisible absolute": state.display === Display.Hidden,
            "translate-x-[100%]": state.display === Display.Hidden && isRTL,
            "-translate-x-[100%]": state.display === Display.Hidden && !isRTL,
            "-translate-x-3": state.display === Display.Floating && isRTL,
            "translate-x-3": state.display === Display.Floating && !isRTL,
          }
        )}
        onMouseEnter={({ clientX }) => {
          const shouldReturn = isRTL
            ? clientX >= window.innerWidth - 84
            : clientX <= 84;
          if (shouldReturn) return;
          dispatch({ type: "entered_sidebar" });
        }}
        onMouseLeave={({ clientX, clientY }) => {
          const shouldReturn = isRTL
            ? clientX > window.innerWidth - 15 ||
              (clientX > window.innerWidth - 84 && clientY <= 85)
            : clientX < 15 || (clientX < 84 && clientY <= 85);

          if (shouldReturn) return;
          dispatch({ type: "left_sidebar" });
        }}
      >
        <div className="flex justify-between items-center mt-10">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gray-800 text-white font-semibold">
                SW
              </AvatarFallback>
            </Avatar>
            <div className="whitespace-nowrap overflow-hidden">
              <h2 className="text-gray-900 text-[16px] font-semibold overflow-hidden overflow-ellipsis">
                Sarah Wilson
              </h2>
              <h1 className="text-gray-900 opacity-80 text-sm">Admin</h1>
            </div>
          </div>
          {state.display === Display.Full && state.isHovered && (
              <Button
                size="icon"
                className="w-5 h-5"
                variant="ghost"
                name="display"
                onClick={() => dispatch({ type: "closed_sidebar" })}
              >
                {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </Button>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button asChild className="bg-red-500">
            <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
              Switch
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};
