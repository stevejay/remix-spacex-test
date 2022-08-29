import { Link } from "@remix-run/react";
import { LaunchesSearchSortableTableHeader } from "~/components/LaunchesSearchSortableTableHeader";
import type { LaunchSummary } from "~/types";
import { SortField } from "~/types";

export interface LaunchesSearchResultsTableProps {
  sortField: SortField;
  sortAscending: boolean;
  name: string;
  results: readonly LaunchSummary[];
}

export function LaunchesSearchResultsTable({
  name,
  sortField,
  sortAscending,
  results,
}: LaunchesSearchResultsTableProps) {
  return (
    <table className="w-full">
      <caption className="sr-only">
        Launch search results, column headers with buttons are sortable.
      </caption>
      <thead className="bg-slate-800">
        <tr>
          <LaunchesSearchSortableTableHeader
            sortField={SortField.NAME}
            label="Name"
            currentSortField={sortField}
            sortAscending={sortAscending}
            name={name}
          />
          <LaunchesSearchSortableTableHeader
            sortField={SortField.DATE}
            label="Date"
            currentSortField={sortField}
            sortAscending={sortAscending}
            name={name}
          />
          <th scope="col">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-300">
        {results.map(({ id, name, dateUtc }) => (
          <tr key={id} data-testid={id}>
            <td className="w-1/3 p-4" role="rowheader" scope="row">
              {name ?? "Unknown"}
            </td>
            <td className="w-1/3 p-4">
              {new Date(dateUtc).toUTCString() ?? "Unknown"}
            </td>
            <td className="w-1/3 p-4 text-right">
              <Link
                to={id}
                className="rounded bg-slate-600 px-4 py-2 hover:bg-slate-700"
              >
                View details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
