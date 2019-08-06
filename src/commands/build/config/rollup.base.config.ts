import nodeResolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import json from 'rollup-plugin-json';
import path from 'path';
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import viz from "rollup-plugin-visualizer";
const cwd = process.cwd();
const pkgPath = path.join(cwd, './package.json');

const pkg = require(pkgPath);
const depNames = Object.keys(pkg.dependencies || {});
const pkgName =  pkg.name && pkg.name.replace(/^@.*\//,'');
const input = "dist/esm/index.js";
const inputPath = path.join(process.cwd(), input);
console.log('inputPat:', inputPath)
const production = process.env.NODE_ENV === "production";
export function nodeConfig() {
  const externalNodeBuiltins = ["events"];
  const baseConfig = {
    input: inputPath,
    external: depNames.concat(externalNodeBuiltins),
    output: { file: "dist/cjs/index.js", format: "cjs", sourcemap: true },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        values: {
          // replace dynamic checks with if (true) since this is for node only.
          // Allows rollup's dead code elimination to be more aggressive.
          "if (isNode)": "if (true)"
        }
      }),
      nodeResolve({ preferBuiltins: true }),
      cjs(),
      json()
    ]
  };
  if (production) {
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}

export function browserConfig(production = false) {
  const baseConfig = {
    input: input,
    output: {
      file: `dist/umd/${pkgName}`,
      format: "umd",
      name: "ExampleClient",
      sourcemap: true,
    },
    preserveSymlinks: false,
    plugins: [
      sourcemaps(),
      replace({
        delimiters: ["", ""],
        values: {
          // replace dynamic checks with if (false) since this is for
          // browser only. Rollup's dead code elimination will remove
          // any code guarded by if (isNode) { ... }
          "if (isNode)": "if (false)"
        }
      }),
      nodeResolve({
        mainFields: ["module", "browser"],
        preferBuiltins: false
      }),
      cjs({
        // When "rollup-plugin-commonjs@10.0.0" is used with "resolve@1.11.1", named exports of
        // modules with built-in names must have a trailing slash.
        // https://github.com/rollup/rollup-plugin-commonjs/issues/394
        namedExports: { "events/": ["EventEmitter"] }
      }),
      viz({ filename: "dist/umd/browser-stats.html", sourcemap: false })
    ]
  };
  if (production) {
    baseConfig.output.file = `dist/umd/${pkgName}.min.js`;
    baseConfig.plugins.push(terser());
  }

  return baseConfig;
}
