import type { Preview } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import "tailwindcss/tailwind.css";

const customViewports = {
  twSM: {
    name: "Tailwind sm",
    type: "mobile",
    styles: {
      width: "640px",
      height: "800px",
    },
  },
  twMD: {
    name: "Tailwind md",
    type: "mobile",
    styles: {
      width: "768px",
      height: "801px",
    },
  },
  twLG: {
    name: "Tailwind lg",
    type: "desktop",
    styles: {
      width: "1024px",
      height: "801px",
    },
  },
  twXL: {
    name: "Tailwind XL",
    type: "desktop",
    styles: {
      width: "1280px",
      height: "801px",
    },
  },
  tw2XL: {
    name: "Tailwind 2XL",
    type: "desktop",
    styles: {
      width: "1536px",
      height: "801px",
    },
  },
};

const preview: Preview = {
  parameters: {
    viewport: {
      ...customViewports,
      ...MINIMAL_VIEWPORTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
