import { json, type ActionFunctionArgs } from "@remix-run/node";
import { CookieDisplay } from "~/components/PureSidebar";
import { setSidebarDisplay } from "~/lib/sidebar-session";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const display = formData.get("display");

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": setSidebarDisplay(display as CookieDisplay),
      },
    }
  );
};
