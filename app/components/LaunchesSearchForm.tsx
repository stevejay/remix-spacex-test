import { Form, Link, useTransition } from "@remix-run/react";
import type { SortField } from "~/types";
import { Icon } from "@iconify/react";

export interface LaunchesSearchFormProps {
  sortField: SortField;
  sortAscending: boolean;
  name: string;
}

export function LaunchesSearchForm({
  sortField,
  sortAscending,
  name,
}: LaunchesSearchFormProps) {
  const transition = useTransition();
  const isSubmitting = Boolean(transition.submission);
  return (
    <Form aria-labelledby="nameSearchLabel" method="get" action="." key={name}>
      <label id="nameSearchLabel" htmlFor="nameSearch" className="sr-only">
        Search launches
      </label>
      <div className="flex gap-4">
        <input type="hidden" name="sortAscending" value={`${sortAscending}`} />
        <input type="hidden" name="sortField" value={sortField} />
        <input
          type="text"
          role="searchbox"
          id="nameSearch"
          placeholder="Enter a launch name"
          className="flex-grow rounded bg-slate-700 px-4 py-2"
          name="name"
          defaultValue={name}
          autoFocus
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        <button
          type="submit"
          className="relative rounded bg-sky-600 px-4 py-2 hover:bg-sky-700 disabled:bg-sky-600"
          disabled={isSubmitting}
        >
          <span
            className={`${
              isSubmitting ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          >
            Search
          </span>
          {isSubmitting && (
            <span className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2">
              <Icon icon="ei:spinner" className="h-10 w-10 animate-spin" />
            </span>
          )}
        </button>
        <Link
          to="."
          className="rounded bg-sky-600 px-4 py-2 hover:bg-sky-700 disabled:bg-slate-800 disabled:text-slate-600"
        >
          Clear
        </Link>
      </div>
    </Form>
  );
}
