import * as fs from "fs";

import chalk from "chalk";
import minimist from "minimist";

const args = minimist(process.argv);

if (!args.imageTag) {
  console.error("--imageTag flag is required");
  process.exit(1);
}

const dockerrunProps = JSON.parse(
  fs.readFileSync("./Dockerrun.aws.json.template", "utf8"),
);

dockerrunProps.Image.Name = args.imageTag;

fs.writeFileSync("./Dockerrun.aws.json", JSON.stringify(dockerrunProps));

console.log(chalk.green("Dockerrun.aws.json generated"));
