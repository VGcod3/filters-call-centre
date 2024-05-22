import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { setSidebarDisplay } from "~/lib/sidebar-session";
import { isDisplay, useRequestInfo } from "~/lib/utils";

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const display = form.get("display");

  if (!isDisplay(display)) {
    return json({
      success: false,
      message: `display value of ${display} is not a valid display`,
    });
  }

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": setSidebarDisplay(display),
      },
    }
  );
};

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useSidebarDisplay() {
  const requestInfo = useRequestInfo();
  return requestInfo.userPrefs.display;
}
