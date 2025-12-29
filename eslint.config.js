import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["**/dist/", ".adminjs/*", "prisma/**/generated/*"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/comma-dangle": ["error", "always-multiline"],
      "@stylistic/js/semi": ["error", "always"],
      "@stylistic/js/quotes": [
        "error",
        "double",
        { allowTemplateLiterals: true },
      ],
      "@stylistic/js/object-curly-spacing": ["error", "always"],
      "@stylistic/js/max-len": [
        "error",
        80,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          // References:
          // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
          // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
          groups: [
            // Side effect imports.
            ["^\\u0000"],
            // Node.js builtins.
            [`^(${(await import("module")).builtinModules.join("|")})(/|$)`],
            // Packages.
            ["^@?\\w"],
            // Absolute imports and other imports such as Vue-style `@/foo`.
            // Anything not matched in another group.
            ["^"],
            // @src, @assets & relative imports.
            // @src, @assets comes first.
            ["^(|@src|@assets)(/.*|$)", "^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];
