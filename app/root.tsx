import { useChangeLanguage } from "remix-i18next/react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getSidebarDisplay, setSidebarDisplay } from "./lib/sidebar-session";
import "./globals.css";
import { i18nCookie, i18next } from "./i18next.server";
import { useTranslation } from "react-i18next";
import { Lang } from "./utils/lang";
import { cookieDisplayEnum } from "./routes/languages";

export async function loader({ request }: LoaderFunctionArgs) {
  const fakePromise = new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const [display, locale] = await Promise.all([
      getSidebarDisplay(request),
      i18next.getLocale(request),
      fakePromise,
    ]);

    return json({
      display,
      locale,
      headers: {
        "Set-Cookie": await i18nCookie.serialize(locale),
      },
    });
  } catch (error) {
    throw redirect("/", {
      status: 303,
      headers: {
        "Set-Cookie": await setSidebarDisplay(cookieDisplayEnum.enum.hidden),
      }
    });
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);
  const currentLanguage = Lang.find((lang) => lang.key === i18n.language);

  return (
    <html lang={locale} dir={currentLanguage?.dir} >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
