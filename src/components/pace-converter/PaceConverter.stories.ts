import { PaceConverter } from "./PaceConverter";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "PaceConverter",
  component: PaceConverter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaceConverter>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
