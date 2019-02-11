import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/SemiModal.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: "es2015",
          moduleResolution: "node"
        }
      }
    })
  ],
  external: [
    // ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
};
