import { type SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { type loader as rootLoader } from "~/root";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useRequestInfo() {
  const data = useRouteLoaderData("root") as SerializeFrom<typeof rootLoader>;
  return data.requestInfo;
}

export enum DisplaySidebar {
  Full = "full",
  Hidden = "hidden",
}

const displays: Array<DisplaySidebar> = Object.values(DisplaySidebar);

export function isDisplay(value: unknown): value is DisplaySidebar {
  return typeof value === "string" && displays.includes(value as DisplaySidebar);
}

