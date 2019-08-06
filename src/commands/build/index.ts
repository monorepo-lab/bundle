import path from 'path';
import babel from "./lib/babel";
import rollup from './lib/rollup';
import tsc from "./lib/tsc";
import tsConfig from "./config/tsconfig.json";
import program from "commander";

program
  .description("公共库编译")
  .option("--copy-files [value]", "拷贝不能编译的文件内容（如.md等文件)", true)
  .option("--source-maps [true|false]", "是否开启sourcemap")
  .option("--entry [value]", "入口entry")
  .option("--outDir [value]", "编译产物目录")
  .option(
    "-x, --extensions [extensions]",
    "需要编译的文件后缀，默认为[.es6,.js,.es,.jsx,.mjs]"
  )
  .action(async cmd => {
    const opts = cmd.opts();
    await tsc({
      buildOptions: opts,
      tscOptions: {
        configFile: path.join(__dirname, './config/tsconfig.json')
      }
    });
    await babel({
      buildOptions: { ...opts, outDir: "dist/esm" },
      babelOptions: {
        configFile: path.join(__dirname, './config/babel.esm.js')
      }
    });
    await babel({
      buildOptions: {...opts, outDir: 'dist/cjs'},
      babelOptions: {
        configFile: path.join(__dirname, './config/babel.cjs.js')
      }
    })
    await babel({
      buildOptions: {...opts, outDir: 'dist/modern'},
      babelOptions: {
        configFile: path.join(__dirname, './config/babel.modern.js')
      }
    })
    await rollup({
      buildOptions: {...opts, outDir: 'dist/umd'},
      rollupOptions: {
        config: path.join(__dirname, './config/rollup.config.js')
      }
    })
  })
  .parse(process.argv);

if (!program.args.length) program.help();