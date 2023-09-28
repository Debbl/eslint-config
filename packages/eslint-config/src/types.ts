import type { OptionsConfigBasic } from "@debbl/eslint-config-basic";
import type { OptionsConfigReact } from "@debbl/eslint-config-react";
import type { OptionsConfigSolid } from "@debbl/eslint-config-solid";
import type { OptionsConfigTs } from "@debbl/eslint-config-ts";
import type { OptionsConfigVue } from "@debbl/eslint-config-vue";

export type OptionsConfig = OptionsConfigBasic &
  OptionsConfigTs &
  OptionsConfigReact &
  OptionsConfigVue &
  OptionsConfigSolid & {
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
     * Enable Prettier support.
     *
     * @default true
     */
    prettier?: boolean;
    /**
     * Enable TailwindCSS support.
     *
     * @default false
     */
    tailwindcss?: boolean;
  };
