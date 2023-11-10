import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";

import tailwind from "./tailwind.css";

export const meta = () => [
  {
    title: "Eventkalender Trifork",
  },
];

export const links: LinksFunction = () => {
  const cssBundle = cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [];
  return [
    ...cssBundle,
    { rel: "stylesheet", href: tailwind },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;600&display=swap",
      rel: "stylesheet",
    },
  ];
};

export default function App() {
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  // Add this to any route that needs to hydrate: export const handle = { hydrate: true };
  const includeScripts = matches.some(
    (match) => (match.handle as any)?.hydrate === true
  );
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        {includeScripts ? <Scripts /> : null}
        <LiveReload />
      </body>
    </html>
  );
}
