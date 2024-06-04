import type { MetaFunction, SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { useReducer } from "react";
import { z } from "zod";
import { PureSidebar } from "~/components/PureSidebar";
import { cn } from "~/lib/utils";
import { type loader as rootLoader } from "~/root";
import { useDirection } from "~/utils/useDirection";

export const meta: MetaFunction = () => {
  return [
    { title: "Languages | i18N | Sidebar" },
    { name: "description", content: "i18n Page" },
  ];
};

export interface SidebarState {
  display: Display;
  transitionEnabled: boolean;
  sidebarStyle: "full" | "floating";
}

export type SidebarAction =
  | { type: "enter_button_or_edge_area" }
  | { type: "leave_sidebar" }
  | { type: "open_full_mode" }
  | { type: "change_language" }
  | { type: "close_sidebar" };

export const displayEnum = z.enum(["full", "hidden", "floating"]);
export const cookieDisplayEnum = displayEnum.exclude(["floating"]);

type Display = z.infer<typeof displayEnum>;
export type CookieDisplay = z.infer<typeof cookieDisplayEnum>;

export const sidebarReducer = (
  state: SidebarState,
  action: SidebarAction
): SidebarState => {
  switch (action.type) {
    case "enter_button_or_edge_area":
      if (state.display === displayEnum.enum.hidden) {
        return {
          ...state,
          display: displayEnum.enum.floating,
          transitionEnabled: true,
          sidebarStyle: "floating",
        };
      }
      return state;
    case "leave_sidebar":
      if (state.display === displayEnum.enum.full) return state;
      return { ...state, display: displayEnum.enum.hidden };
    case "open_full_mode":
      return {
        ...state,
        display: displayEnum.enum.full,
        sidebarStyle: "full",
      };
    case "close_sidebar":
      return { ...state, display: displayEnum.enum.hidden };
    case "change_language":
      if (state.display === displayEnum.enum.full) return state;
      return { ...state, transitionEnabled: false };
    default:
      throw new Error("Invalid action type");
  }
};

export default function Languages() {
  const isRTL = useDirection();
  const requestInfo = useRouteLoaderData("root") as SerializeFrom<typeof rootLoader>;
  const display = requestInfo.display;

  const [state, dispatch] = useReducer(sidebarReducer, {
    display,
    transitionEnabled: true,
    sidebarStyle: "full",
  });

  return (
    <div className="bg-gray-400 h-screen w-full">
    <PureSidebar state={state} dispatch={dispatch} />
      <div className={cn("transition-all duration-300", state.display === displayEnum.enum.full ? "w-[calc(100%-288px)]" : "w-full", isRTL ? "float-left" : "float-right")}>
          <p className="text-3xl">Content</p>
      </div>
    </div>
);
}