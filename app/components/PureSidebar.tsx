import { ChevronLeft, ChevronRight, PanelsTopLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useDirection } from "~/utils/useDirection";
import { Link, useFetcher, useNavigation } from "@remix-run/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useEffect } from "react";
import { Clock } from "./Sidebar/Clock";
import { cn } from "~/lib/utils";
import { SidebarAction, SidebarState, cookieDisplayEnum, displayEnum } from "~/routes/languages";

interface PureSidebarProps {
  state: SidebarState;
  dispatch: (action: SidebarAction) => void;
}

export const PureSidebar = ({state, dispatch}: PureSidebarProps) => {
  const { i18n } = useTranslation();
  const isRTL = useDirection();

  const navigation = useNavigation();
  const navSearchParams = new URLSearchParams(navigation.location?.search);

  const notCurrentLanguage = isRTL ? "en" : "he";
  const isChangingLanguage =
    navigation.state === "loading" &&
    navSearchParams.has("lng") &&
    navSearchParams.get("lng") === notCurrentLanguage;

  useEffect(() => {
    if (!isChangingLanguage) return;
    dispatch({ type: "change_language" });
  }, [isChangingLanguage]);

  const fetcher = useFetcher();
  return (
    <div className={cn(isRTL ? "float-right" : "float-left")}  >
      <div className={cn("fixed inset-0 bg-black bg-opacity-70 transition-opacity",
           state.display === displayEnum.enum.floating ? "opacity-50" : "opacity-0 pointer-events-none")}
      />
      <div
        className={cn(
          "absolute top-1 pl-5 pr-7 pt-2 pb-10",
          isRTL ? "right-0" : "left-0"
        )}
        onMouseEnter={() => dispatch({ type: "enter_button_or_edge_area" })}
        onMouseLeave={({ clientX, clientY }) => {
          const isInvalidPosition = isRTL
            ? clientX > window.innerWidth - 84 && clientY > 0
            : clientX < 84 && clientY > 0;
          if (isInvalidPosition) return;
          dispatch({ type: "leave_sidebar" });
        }}
      >
       {state.display !== displayEnum.enum.full && (
          <fetcher.Form
            method="post"
            action="/action/change-display"
            onSubmit={() => {
              dispatch({ type: "open_full_mode" });
            }}
          >
            <Button
              name="display"
              value={cookieDisplayEnum.enum.full}
              variant="ghost"
              size="icon"
            >
              <PanelsTopLeft />
            </Button>
          </fetcher.Form>
        )}
      </div>

      {state.display === displayEnum.enum.floating ||
      state.display === displayEnum.enum.full ? null : (
        <div
          className={cn(
            "fixed bg-transparent top-[84px] w-2.5 h-full",
            isRTL ? "right-0" : "left-0"
          )}
          onMouseEnter={() => dispatch({ type: "enter_button_or_edge_area" })}
        />
      )}
      <nav
        className={cn(
          "border border-gray-300 border-r-2 bg-white px-6 w-[288px] absolute",
          state.transitionEnabled && "transition-all duration-300 ease-in-out",
          !state.transitionEnabled && "opacity-0",
          state.sidebarStyle === "floating" && "top-[8%] bottom-[1%] rounded-xl",
          (state.sidebarStyle === "full") && "h-screen",
          isRTL ? "right-0" : "left-0",
          {
            "translate-x-[100%]": state.display === displayEnum.enum.hidden && isRTL,
            "-translate-x-[100%]": state.display === displayEnum.enum.hidden && !isRTL,
            "-translate-x-3" : state.display === displayEnum.enum.floating && isRTL,
            "translate-x-3": state.display === displayEnum.enum.floating && !isRTL,
            "translate-x-0 top-0 h-screen": state.display === displayEnum.enum.full,
          }
        )}
        onMouseLeave={({ clientX, clientY }) => {
          const shouldReturn = isRTL
            ? clientX > window.innerWidth - 15 ||
              (clientX > window.innerWidth - 84 && clientY <= 85)
            : clientX < 15 || (clientX < 84 && clientY <= 85);

          if (shouldReturn) return;
          dispatch({ type: "leave_sidebar" });
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
          {state.display === displayEnum.enum.full && (
              <fetcher.Form
              method="post"
              action="/action/change-display"
              onSubmit={() => {
                dispatch({ type: "close_sidebar" });
              }}
            >
              <Button
                size="icon"
                className="w-5 h-5"
                variant="ghost"
                name="display"
                value={cookieDisplayEnum.enum.hidden}
              >
                {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </Button>
            </fetcher.Form>

          )}
        </div>
        <div className="flex items-center justify-center">
          <Button asChild className="bg-red-500">
            <Link to={`?lng=${i18n.language === "en" ? "he" : "en"}`}>
              Switch
            </Link>
          </Button>
          <div className="flex-1" />
          <div className="mb-4">
            <Clock />
          </div>
        </div>
      </nav>
    </div>
  );
};
