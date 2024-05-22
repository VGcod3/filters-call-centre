import { json, type ActionFunctionArgs } from "@remix-run/node";
import { setSidebarDisplay } from "~/lib/sidebar-session";
import { isDisplay, useRequestInfo } from "~/lib/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const display = formData.get("display");

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
