import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import packageJson from "./package.json";

export default {
  input: "src/entry.js",
  output: [
    {
      format: "cjs",
      file: packageJson.main,
      sourcemap: true,
    },
    {
      format: "esm",
      file: packageJson.module,
      sourcemap: true,
    },
    {
      format: "iife",
      file: packageJson.browser,
      sourcemap: true,
      name: "mostSignatureCapture",
    },
  ],
  plugins: [commonjs(), resolve()],
};
