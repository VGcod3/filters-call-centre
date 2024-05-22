import * as cookie from "cookie";

const cookieName = "display";
type Display = "full" | "hidden" | undefined;

export function getSidebarDisplay(request: Request): Display {
  const cookieHeader = request.headers.get("Cookie");
  const parsed = cookieHeader && cookie.parse(cookieHeader)[cookieName];

  if (parsed === "full" || parsed === "hidden") return parsed;

  return undefined;
}

export function setSidebarDisplay(display?: Display) {
  if (display) {
    return cookie.serialize(cookieName, display, { path: "/" });
  } else {
    return cookie.serialize(cookieName, "", { path: "/", maxAge: 0 });
  }
}
