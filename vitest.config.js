import { defineConfig } from "vitest/config";
import rawPlugin from "vite-raw-plugin";

export default defineConfig({
  test: {
    // ...
  },
  plugins: [
    rawPlugin({
      fileRegex: /\.dmn$/,
    }),
  ],
});
