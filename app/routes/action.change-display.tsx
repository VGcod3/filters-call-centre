import { json, type ActionFunctionArgs } from "@remix-run/node";
import { cookieDisplayEnum } from "~/components/PureSidebar";
import { setSidebarDisplay } from "~/lib/sidebar-session";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const displayValue = formData.get("display");

  const parsedDisplay = cookieDisplayEnum.safeParse(displayValue);

  if (!parsedDisplay.success) {
    return json({ success: false, error: "Invalid display value" });
  }

  const display = parsedDisplay.data;

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": setSidebarDisplay(display),
      },
    }
  );
};
