import { createCookie, redirect } from "@remix-run/node";
import { CookieDisplay, cookieDisplayEnum } from "~/routes/languages";

const COOKIE_NAME = "display";

const sidebarDisplayCookie = createCookie(COOKIE_NAME, {
  path: "/",
});

export async function getSidebarDisplay(request: Request) {
  const cookieHeader = request.headers.get("Cookie");

  const cookieValue =
    (await sidebarDisplayCookie.parse(cookieHeader)) ??
    cookieDisplayEnum.enum.full;

  const parsedCookie = cookieDisplayEnum.safeParse(cookieValue);

  if (!parsedCookie.success) {
    throw redirect("/", {
      status: 303,
      headers: {
        "Set-Cookie": await setSidebarDisplay(cookieDisplayEnum.enum.full),
      },
    });
  }

  return parsedCookie.data;
}

export async function setSidebarDisplay(display: CookieDisplay) {
  return sidebarDisplayCookie.serialize(display);
}
