import { combine, interopDefault } from "../utils";
import { GLOB_JSX, GLOB_TSX } from "../globs";
import type { ConfigFn, ConfigItem, OptionsOverrides } from "../types";

export type ReactConfig = (
  options: {
    next?: boolean;
    reactCompiler?: boolean;
  } & OptionsOverrides,
) => ReturnType<ConfigFn>;

async function next(): Promise<ConfigItem[]> {
  // @ts-expect-error missing types
  const pluginNext = await interopDefault(import("@next/eslint-plugin-next"));

  return [
    {
      name: "eslint/next/setup",
      plugins: {
        "@next/next": pluginNext,
      },
    },
    {
      name: "eslint/next/rules",
      files: [GLOB_TSX, GLOB_JSX],
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs["core-web-vitals"].rules,

        "react-refresh/only-export-components": [
          "warn",
          {
            allowExportNames: ["metadata"],
          },
        ],
      },
    },
  ];
}

export const react: ReactConfig = async (options): Promise<ConfigItem[]> => {
  const {
    next: enableNext = false,
    reactCompiler: enableReactCompiler = false,
    overrides = {},
  } = options;

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all(
    [
      // @ts-expect-error missing types
      interopDefault(import("eslint-plugin-react")),
      // @ts-expect-error missing types
      interopDefault(import("eslint-plugin-react-hooks")),
      // @ts-expect-error missing types
      interopDefault(import("eslint-plugin-react-refresh")),
    ] as const,
  );

  const _react: ConfigItem[] = [
    {
      name: "eslint/react/setup",
      plugins: {
        "react": pluginReact,
        "react-hooks": pluginReactHooks,
        "react-refresh": pluginReactRefresh,
      },
    },
    {
      name: "eslint/react/rules",
      files: [GLOB_TSX, GLOB_JSX],
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,

        // React Refresh
        "react-refresh/only-export-components": "warn",

        "jsx-quotes": ["error", "prefer-double"],
        "react/react-in-jsx-scope": "off",
        "react/jsx-indent": [1, 2],
        "react/jsx-indent-props": [1, 2],
        "react/jsx-closing-bracket-location": [
          1,
          { selfClosing: "tag-aligned", nonEmpty: "tag-aligned" },
        ],

        ...overrides,
      },
    },
  ];

  const reactCompiler: ConfigItem[] = [
    {
      name: "eslint/react/compiler",
      files: [GLOB_TSX, GLOB_JSX],
      plugins: {
        "react-compiler": await interopDefault(
          // @ts-expect-error missing types
          import("eslint-plugin-react-compiler"),
        ),
      },
      rules: {
        "react-compiler/react-compiler": "error",
      },
    },
  ];

  if (enableReactCompiler) {
    _react.push(...reactCompiler);
  }

  return combine(_react, enableNext ? next() : []);
};
