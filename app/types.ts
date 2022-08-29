export enum SortField {
  DATE = "date_utc",
  NAME = "name",
}

export interface LaunchSummary {
  id: string;
  name: string;
  dateUtc: string;
  details: string | null;
}

export interface LaunchesData {
  items: readonly LaunchSummary[];
}
