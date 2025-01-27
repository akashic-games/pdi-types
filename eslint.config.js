const eslintConfig = require("@akashic/eslint-config");

module.exports = [
    ...eslintConfig,
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                project: "tsconfig.json",
            }
        }
    },
    {
      files: ["test/*.ts"],
        languageOptions: {
            sourceType: "module",
            parserOptions: {
                project: "test/tsconfig.json",
            }
        },
        ignores: ["**/*.js"]
    }
];
