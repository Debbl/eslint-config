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

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all(
    [
      interopDefault(import("@eslint-react/eslint-plugin")),
      // @ts-expect-error missing types
      interopDefault(import("eslint-plugin-react-hooks")),
      interopDefault(import("eslint-plugin-react-refresh")),
    ] as const,
  );

  const plugins = pluginReact.configs.all.plugins;

  const _react: ConfigItem[] = [
    {
      name: "eslint/react/setup",
      plugins: {
        "react": plugins["@eslint-react"],
        "react-dom": plugins["@eslint-react/dom"],
        "react-hooks-extra": plugins["@eslint-react/hooks-extra"],
        "react-naming-convention": plugins["@eslint-react/naming-convention"],
        "react-web-api": plugins["@eslint-react/web-api"],
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
        ...pluginReactHooks.configs.recommended.rules,

        // recommended rules from @eslint-react/dom
        "react-dom/no-children-in-void-dom-elements": "warn",
        "react-dom/no-dangerously-set-innerhtml": "warn",
        "react-dom/no-dangerously-set-innerhtml-with-children": "error",
        "react-dom/no-find-dom-node": "error",
        "react-dom/no-missing-button-type": "warn",
        "react-dom/no-missing-iframe-sandbox": "warn",
        "react-dom/no-namespace": "error",
        "react-dom/no-render-return-value": "error",
        "react-dom/no-script-url": "warn",
        "react-dom/no-unsafe-iframe-sandbox": "warn",
        "react-dom/no-unsafe-target-blank": "warn",

        // recommended rules react-hooks
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",

        // React Refresh
        "react-refresh/only-export-components": "warn",

        // React Compiler
        ...(enableCompiler
          ? {
              "react-compiler/react-compiler": "error",
            }
          : {}),

        // recommended rules from @eslint-react/web-api
        "react-web-api/no-leaked-event-listener": "warn",
        "react-web-api/no-leaked-interval": "warn",
        "react-web-api/no-leaked-resize-observer": "warn",
        "react-web-api/no-leaked-timeout": "warn",

        // recommended rules from @eslint-react
        "react/ensure-forward-ref-using-ref": "warn",
        "react/jsx-no-duplicate-props": "warn",
        "react/jsx-uses-vars": "warn",
        "react/no-access-state-in-setstate": "error",
        "react/no-array-index-key": "warn",
        "react/no-children-count": "warn",
        "react/no-children-for-each": "warn",
        "react/no-children-map": "warn",
        "react/no-children-only": "warn",
        "react/no-children-to-array": "warn",
        "react/no-clone-element": "warn",
        "react/no-comment-textnodes": "warn",
        "react/no-component-will-mount": "error",
        "react/no-component-will-receive-props": "error",
        "react/no-component-will-update": "error",
        "react/no-context-provider": "warn",
        "react/no-create-ref": "error",
        "react/no-default-props": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-duplicate-key": "error",
        "react/no-forward-ref": "warn",
        "react/no-implicit-key": "warn",
        "react/no-missing-key": "error",
        "react/no-nested-components": "error",
        "react/no-prop-types": "error",
        "react/no-redundant-should-component-update": "error",
        "react/no-set-state-in-component-did-mount": "warn",
        "react/no-set-state-in-component-did-update": "warn",
        "react/no-set-state-in-component-will-update": "warn",
        "react/no-string-refs": "error",
        "react/no-unsafe-component-will-mount": "warn",
        "react/no-unsafe-component-will-receive-props": "warn",
        "react/no-unsafe-component-will-update": "warn",
        "react/no-unstable-context-value": "warn",
        "react/no-unstable-default-props": "warn",
        "react/no-unused-class-component-members": "warn",
        "react/no-unused-state": "warn",
        "react/prefer-destructuring-assignment": "warn",
        "react/prefer-shorthand-boolean": "warn",
        "react/prefer-shorthand-fragment": "warn",

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
