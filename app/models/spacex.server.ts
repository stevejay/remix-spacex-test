import type { LaunchesData, LaunchSummary } from "~/types";

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details?: string | null;
}

export async function getLaunches({
  name,
  sortField,
  sortAscending,
  limit,
  offset,
}: {
  name: string;
  sortField: string;
  sortAscending: boolean;
  limit: number;
  offset: number;
}): Promise<LaunchesData> {
  if (!name) {
    return { items: [] };
  }
  const response = await fetch("https://api.spacexdata.com/v4/launches/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // Options docs: https://www.mongodb.com/docs/manual/reference/operator/query/regex/#mongodb-query-op.-options
      query: { upcoming: false, name: { $regex: name, $options: "i" } },
      options: {
        sort: { [sortField ?? "name"]: sortAscending ? "asc" : "desc" },
        limit,
        offset,
        select: "id name date_utc details",
      },
    }),
  });
  if (response.status !== 200) {
    if (response.status >= 400 && response.status <= 499) {
      return { items: [] };
    }
    throw new Error("Server error when fetching search results");
  }
  const result = await response.json();
  return {
    items:
      result?.docs?.map((doc: any) => ({
        id: doc.id,
        name: doc.name,
        dateUtc: doc.date_utc,
        details: doc.details ?? null,
      })) ?? [],
  };
}

export async function getLaunchById(id: string): Promise<LaunchSummary> {
  const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
  if (response.status !== 200) {
    throw new Error("Server error");
  }
  const result = await response.json();
  return {
    id: result.id,
    name: result.name,
    dateUtc: result.date_utc,
    details: result.details ?? null,
  };
}
