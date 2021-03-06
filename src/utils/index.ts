import execa from "execa";

export function executeCommand(
  command: string,
  args: string[],
  targetDir: string
) {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd: targetDir,
      shell: true,
      stdio: ["inherit", "inherit", command === "yarn" ? "pipe" : "inherit"]
    });
    child.on('error', (err) => {
      console.log('exec:', err);
    })
    child.on("close", code => {
      if (code !== 0) {
        reject(new Error(`command failed: ${command} ${args.join(" ")}`));
        return;
      } else {
        resolve();
      }
    });
  });
}
