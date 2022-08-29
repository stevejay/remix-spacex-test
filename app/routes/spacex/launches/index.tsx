import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { LaunchesSearchForm } from "~/components/LaunchesSearchForm";
import { LaunchesSearchResultsTable } from "~/components/LaunchesSearchResultsTable";
import { SearchStatus } from "~/components/SearchStatus";
import { getLaunches } from "~/models/spacex.server";
import type { LaunchesData } from "~/types";
import { SortField } from "~/types";

export const meta: MetaFunction = () => ({
  title: "SpaceX Launches Search",
});

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const params = parseSearchParams(url.searchParams);
  return json<LaunchesData>(await getLaunches(params));
};

export default function LaunchesIndexRoute() {
  const data = useLoaderData<LaunchesData>();
  const [searchParams] = useSearchParams();
  const { name, sortField, sortAscending } = parseSearchParams(searchParams);
  const resultsCount = data?.items?.length ?? 0;
  return (
    <main className="mx-auto max-w-4xl space-y-8 p-8">
      <h1 className="text-2xl font-bold uppercase text-sky-400">
        SpaceX Launches
      </h1>
      <LaunchesSearchForm
        sortField={sortField}
        sortAscending={sortAscending}
        name={name}
      />
      <SearchStatus hasSearchTerm={!!name} resultsCount={resultsCount} />
      {!!resultsCount && (
        <LaunchesSearchResultsTable
          sortField={sortField}
          sortAscending={sortAscending}
          name={name}
          results={data?.items}
        />
      )}
    </main>
  );
}

function parseSearchParams(searchParams: URLSearchParams): {
  name: string;
  sortField: SortField;
  sortAscending: boolean;
  limit: number;
  offset: number;
} {
  const name = searchParams.get("name") ?? "";
  const sortField =
    (searchParams.get("sortField") as SortField) ?? SortField.DATE;
  const sortAscending = searchParams.get("sortAscending") === "true";
  const limitStr = searchParams.get("limit");
  const limit = limitStr ? parseInt(limitStr) : 50;
  const offsetStr = searchParams.get("offset");
  const offset = offsetStr ? parseInt(offsetStr) : 0;
  return { name, sortField, sortAscending, limit, offset };
}
