import { GLOB_JSX, GLOB_TSX } from "../globs";
import { combine, interopDefault } from "../utils";
import type { ConfigFn, ConfigItem, OptionsOverrides } from "../types";

export type ReactConfig = (
  options: {
    next?: boolean;
    compiler?: boolean;
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
            allowExportNames: [
              "dynamic",
              "dynamicParams",
              "revalidate",
              "fetchCache",
              "runtime",
              "preferredRegion",
              "maxDuration",
              "config",
              "generateStaticParams",
              "metadata",
              "generateMetadata",
              "viewport",
              "generateViewport",
            ],
          },
        ],
      },
    },
  ];
}

export const react: ReactConfig = async (options): Promise<ConfigItem[]> => {
  const {
    next: enableNext = false,
    compiler: enableCompiler = false,
    overrides = {},
  } = options;

  const [pluginsReact, pluginReactHooks, pluginReactRefresh] =
    await Promise.all([
      interopDefault(import("@eslint-react/eslint-plugin")),
      interopDefault(import("eslint-plugin-react-hooks")),
      interopDefault(import("eslint-plugin-react-refresh")),
    ] as const);

  const plugins = pluginsReact.configs.all.plugins;

  const {
    "@eslint-react": pluginReactX,
    "@eslint-react/dom": pluginReactDom,
    "@eslint-react/hooks-extra": pluginReactHooksExtra,
    "@eslint-react/naming-convention": pluginReactNamingConvention,
    "@eslint-react/web-api": pluginReactWebApi,
  } = plugins;

  const _react: ConfigItem[] = [
    {
      name: "eslint/react/setup",
      plugins: {
        "react-x": pluginReactX,
        "react-dom": pluginReactDom,
        "react-hooks-extra": pluginReactHooksExtra,
        "react-naming-convention": pluginReactNamingConvention,
        "react-web-api": pluginReactWebApi,
        "react-hooks": pluginReactHooks,
        "react-refresh": pluginReactRefresh,
        ...(enableCompiler
          ? {
              "react-compiler": await interopDefault(
                // @ts-expect-error missing types
                import("eslint-plugin-react-compiler"),
              ),
            }
          : {}),
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
        ...pluginReactX.configs.recommended.rules,
        ...pluginReactDom.configs.recommended.rules,
        ...pluginReactHooksExtra.configs.recommended.rules,
        ...pluginReactNamingConvention.configs.recommended.rules,
        ...pluginReactWebApi.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,

        // React Refresh
        "react-refresh/only-export-components": "warn",

        // React Compiler
        ...(enableCompiler
          ? {
              "react-compiler/react-compiler": "error",
            }
          : {}),

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

  return combine(_react, enableNext ? next() : []);
};
