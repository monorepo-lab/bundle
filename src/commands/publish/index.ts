import program, { Command } from "commander";
import lerna from "./lib/lerna";
program
  .description("更新版本以及生成changelog")
  .option("--type [value]", "项目类型 fixed|independent|standalone")
  .action(async (cmd: Command) => {
    const opts = cmd.opts();
    console.log('publish')
    const { type } = opts;
    await lerna({
      versionOptions: {},
      lernaOptions: {
        type
      }
    })
  })
  .parse(process.argv);

