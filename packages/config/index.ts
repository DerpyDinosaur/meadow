import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import prettier from 'eslint-config-prettier';

/**
 * Creates a base ESLint configuration that can be extended
 * @param {Object} options - Configuration options
 * @param {Array} options.extraPlugins - Additional plugins to include
 * @returns {Array} ESLint configuration array
 */
export function mkEslint(options: { extraPlugins: Array<any> } = { extraPlugins: [] }): Array<any> {
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

  // Add any extra plugins
  return [...base, ...options.extraPlugins];
}

// Default export for simple usage
export default mkEslint();