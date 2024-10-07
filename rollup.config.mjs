import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
  },
  plugins: [peerDepsExternal()],
};
