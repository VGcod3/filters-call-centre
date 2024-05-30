import { useChangeLanguage } from "remix-i18next/react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import "./globals.css";
import { i18nCookie, i18next } from "./i18next.server";
import { useTranslation } from "react-i18next";
import { Lang } from "./utils/lang";

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  return json(
    { locale },
    {
      headers: { "Set-Cookie": await i18nCookie.serialize(locale) },
    }
  );
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