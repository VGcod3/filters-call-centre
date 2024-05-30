import * as cookie from "cookie";
import { CookieDisplay, cookieDisplayEnum } from "~/components/PureSidebar";

const COOKIE_NAME = "display";

export function getSidebarDisplay(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookieValue = cookieHeader ? cookie.parse(cookieHeader)[COOKIE_NAME] : undefined;
  return cookieDisplayEnum
    .default(cookieDisplayEnum.enum.hidden)
    .parse(cookieValue);
}

export function setSidebarDisplay(display: CookieDisplay) {
    return cookie.serialize(COOKIE_NAME, display, { path: "/" });
}