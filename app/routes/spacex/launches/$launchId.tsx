import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getLaunchById } from "~/models/spacex.server";
import type { LaunchSummary } from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.launchId, `params.launchId is required`);
  return json(await getLaunchById(params.launchId));
};

export default function LaunchDetailsRoute() {
  const data = useLoaderData<LaunchSummary>();
  const navigate = useNavigate();
  return (
    <main className="mx-auto max-w-4xl space-y-8 p-8">
      <h1 className="text-2xl font-bold uppercase text-sky-400">{data.name}</h1>
      <Link
        to="/spacex/launches"
        className="inline-block rounded bg-sky-600 px-4 py-2 hover:bg-sky-700"
        onClick={(event) => {
          event.preventDefault();
          navigate(-1);
        }}
      >
        Go back
      </Link>
      <p>{data.details ?? "No details available"}</p>
    </main>
  );
}
