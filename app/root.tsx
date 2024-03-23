import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./globals.css";
import { PhoneProvider, usePhone } from "./contexts/phone";
import { PhoneActionButton } from "./components/phone-app/PhoneActionButton";
import { PhoneIcon, XIcon } from "lucide-react";
import { PhoneScreen } from "./components/phone-app/PhoneScreen";

function LayoutPhone({ children }: { children: React.ReactNode }) {
  const { floatingPhone, toggleFloatingPhone } = usePhone();
  return (
    <div className="relative">
      {floatingPhone && (
        <div className="absolute bottom-20 right-7 z-50">
          <PhoneScreen />
        </div>
      )}
      <PhoneActionButton
        className="absolute right-7 bottom-3 z-50 bg-black"
        onClick={toggleFloatingPhone}
      >
        {floatingPhone ? <XIcon /> : <PhoneIcon />}
      </PhoneActionButton>
      {children}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <PhoneProvider>
        <body>
          <LayoutPhone>{children}</LayoutPhone>
          <ScrollRestoration />
          <Scripts />
        </body>
      </PhoneProvider>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
