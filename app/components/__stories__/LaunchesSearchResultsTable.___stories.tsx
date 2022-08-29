import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SortField } from "~/types";

import { LaunchesSearchResultsTable } from "../LaunchesSearchResultsTable";

const LAUNCH_ONE = {
  details: "Launch 1 details",
  name: "Starlink 4-27 (v1.5)",
  dateUtc: "2022-08-19T19:24:00.000Z",
  id: "62f3b5200f55c50e192a4e6c",
};

export default {
  title: "Example/LaunchesSearchResultsTable",
  component: LaunchesSearchResultsTable,
} as ComponentMeta<typeof LaunchesSearchResultsTable>;

const Template: ComponentStory<typeof LaunchesSearchResultsTable> = (args) => (
  <LaunchesSearchResultsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sortField: SortField.NAME,
  sortAscending: true,
  name: "star",
  results: [LAUNCH_ONE],
};
