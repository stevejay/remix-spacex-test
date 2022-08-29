import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import type { User } from "./models/user.server";
import { generateCSP } from "./models/csp.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // { rel: "preconnect", href: "https://fonts.googleapis.com" },
    // { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;600&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export interface LoaderData {
  user: User | null;
  nonce: string;
  csp: string;
}

export async function loader({ request }: LoaderArgs) {
  const { csp, nonce } = generateCSP();
  return json({ user: await getUser(request), nonce, csp });
}

// Here for reference only:
export const unstable_shouldReload = () => false;

// // Only reload if there is a non-GET submission:
// export function unstable_shouldReload({ submission }) {
//   return !!submission && submission.method !== "GET";
// }

export default function App() {
  const { csp, nonce } = useLoaderData<LoaderData>();
  return (
    <html
      lang="en"
      className="h-full bg-slate-900 font-sans text-base font-normal text-slate-100"
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}
