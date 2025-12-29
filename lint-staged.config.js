import "dotenv/config";

const getESLintCommand = filenames =>
  `docker exec -t ${process.env.APP_NAME}-api sh -c "npx eslint ${filenames.join(" ")}"`;
const getPrettierCommand = filenames =>
  `docker exec -t ${process.env.APP_NAME}-api sh -c "npx prettier --check ${filenames.join(" ")}"`;

// Ignore filenames for type checking.
const getTypescriptCommand = () =>
  `docker exec -t ${process.env.APP_NAME}-api sh -c "npx tsc --noEmit" `;

export default {
  "*.{js,mjs,cjs,ts}": [getESLintCommand, getPrettierCommand],
  "*.ts": [getTypescriptCommand],
  "*.{json,yml}": [getPrettierCommand],
};
