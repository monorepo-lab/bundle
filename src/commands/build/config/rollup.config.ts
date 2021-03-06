import * as base from "./rollup.base.config";
const inputs: any[] = [];

if (!process.env.ONLY_BROWSER) {
  inputs.push(base.nodeConfig());
}

if (!process.env.ONLY_NODE) {
  inputs.push(base.browserConfig());
  inputs.push(base.browserConfig(true));
}

export default inputs;
