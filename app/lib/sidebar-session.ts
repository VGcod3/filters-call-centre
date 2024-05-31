import { createCookie } from "@remix-run/node";
import { CookieDisplay, cookieDisplayEnum } from "~/routes/languages";

const COOKIE_NAME = "display";

const sidebarDisplayCookie = createCookie(COOKIE_NAME, {
  path: "/",
});

export async function getSidebarDisplay(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const cookieValue = cookieHeader ? await sidebarDisplayCookie.parse(cookieHeader) : undefined;
  return cookieDisplayEnum
    .default(cookieDisplayEnum.enum.full)
    .parse(cookieValue);
}

export async function setSidebarDisplay(display: CookieDisplay) {
  return await sidebarDisplayCookie.serialize(display);
}
