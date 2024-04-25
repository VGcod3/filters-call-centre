import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import {i18next, i18nCookie} from "~/i18next.server";
import { Lang } from "./utils/lang";
import "./globals.css";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useState } from "react";
import { useDirection } from "./utils/useDirection";
import { PureSidebar } from "./components/PureSidebar";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  const isRTL = useDirection();
  return (
    <html lang={locale} dir={currentLanguage?.dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <div onMouseMove={(event) => {
        const x = event.clientX;
        const windowWidth = window.innerWidth;
        const edgeThreshold = 30;

        if(!isRTL && x <= edgeThreshold){
          setIsOpen(true);
          setIsTransition(true);
        }

        if(isRTL && x >= windowWidth - edgeThreshold){
          setIsOpen(true);
          setIsTransition(true);
        }
      }} className="h-screen" >
        <PureSidebar isOpen={isOpen} setIsOpen={setIsOpen} isTransition={isTransition} setIsTransition={setIsTransition} />
      </div>
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