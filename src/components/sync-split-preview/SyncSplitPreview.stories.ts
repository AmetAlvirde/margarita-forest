import { SyncSplitPreview } from "./SyncSplitPreview";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "SyncSplitPreview",
  component: SyncSplitPreview,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SyncSplitPreview>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {};
