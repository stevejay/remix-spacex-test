import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { SVGArrow } from "../SVGArrow";

export default {
  title: "Example/SVGArrow",
  component: SVGArrow,
} as ComponentMeta<typeof SVGArrow>;

const Template: ComponentStory<typeof SVGArrow> = (args) => (
  <SVGArrow {...args} />
);

export const Default = Template.bind({});
Default.args = {};
