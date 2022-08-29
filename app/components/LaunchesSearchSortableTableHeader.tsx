import { Form } from "@remix-run/react";
import type { SortField } from "~/types";
import { SVGArrow } from "./SVGArrow";

export interface LaunchesSearchSortableTableHeaderProps {
  sortField: SortField;
  label: string;
  currentSortField: SortField;
  sortAscending: boolean;
  name: string;
}

export function LaunchesSearchSortableTableHeader({
  sortField,
  label,
  currentSortField,
  sortAscending,
  name,
}: LaunchesSearchSortableTableHeaderProps) {
  const isCurrentlySorting = currentSortField === sortField;
  return (
    <th
      aria-sort={
        isCurrentlySorting
          ? sortAscending
            ? "ascending"
            : "descending"
          : "none"
      }
      className={`p-4 text-left font-bold ${
        isCurrentlySorting ? "text-sky-500" : ""
      }`}
      scope="col"
    >
      <Form method="get" action=".">
        <input type="hidden" name="name" value={name} />
        <input
          type="hidden"
          name="sortAscending"
          value={`${isCurrentlySorting ? !sortAscending : sortAscending}`}
        />
        <input type="hidden" name="sortField" value={sortField} />
        <button type="submit" className="flex items-center hover:text-sky-500">
          {label}
          {isCurrentlySorting && (
            <SVGArrow
              className={`ml-2 inline text-lg ${
                sortAscending ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
        </button>
      </Form>
    </th>
  );
}
