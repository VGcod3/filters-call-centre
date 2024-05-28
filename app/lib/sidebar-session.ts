import * as cookie from "cookie";
import { CookieDisplay, cookieDisplayEnum } from "~/components/PureSidebar";

const cookieName = "display";

export function getSidebarDisplay(request: Request) {
  const cookieHeader = request.headers.get("Cookie");

  return cookieDisplayEnum.parse(cookie.parse(cookieHeader || "")[cookieName]);
}

export function setSidebarDisplay(display: CookieDisplay) {
  if (display) {
    return cookie.serialize(cookieName, display, { path: "/" });
  } else {
    return cookie.serialize(cookieName, "", { path: "/", maxAge: 0 });
  }
}