export interface OptionsTypeScriptWithLanguageServer {
  tsconfigPath: string;
  tsconfigRootDir?: string;
}

export interface OptionsComponentExts {
  /**
   * Additional extensions for components.
   *
   * @example ['vue']
   * @default []
   */
  componentExts?: string[];
}

export interface OptionsIsInEditor {
  isInEditor?: boolean;
}

export type OptionsHasTypeScript = Pick<OptionsConfigExtends, "ts">;

export interface OptionsConfigBasic extends OptionsComponentExts {
  /**
   * Control to disable some rules in editors.
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean;
  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   * @default true
   */
  ts?: boolean | OptionsTypeScriptWithLanguageServer;

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean;

  /**
   * Enable JSONC support.
   *
   * @default true
   */
  jsonc?: boolean;

  /**
   * Enable YAML support.
   *
   * @default true
   */
  yaml?: boolean;

  /**
   * Enable Markdown support.
   *
   * @default true
   */
  markdown?: boolean;
}

export interface OptionsConfigExtends extends OptionsConfigBasic {
  /**
   * Enable Vue support.
   *
   * @default false
   */
  vue?: boolean;

  /**
   * Enable React support.
   *
   * @default false
   */
  react?: boolean;

  /**
   * Enable Solid support.
   *
   * @default false
   */
  solid?: boolean;

  /**
   * Enable TailwindCSS support.
   *
   * @default false
   */
  tailwindcss?: boolean;

  /**
   * Enable Prettier support.
   *
   * @default true
   */
  prettier?: boolean;
}
