import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from 'eslint-config-prettier';

export function mkEslint(projectConfigs: Array<any> = []): Array<any> {
  const base = [
    {
      files: ["**/*.{js,mjs,cjs,ts}"]
    },
    {
      files: ["**/*.js"], 
      languageOptions: {
        sourceType: "script"
      }
    },
    {
      languageOptions: { 
        globals: {...globals.browser, ...globals.node} 
      }
    },
    js.configs.recommended,
    ...ts.configs.recommended,
    prettier
  ];

  return [...base, ...projectConfigs];
}

export default mkEslint();