import type { OptionsConfigBasic } from "@debbl/eslint-config-basic";
import type { OptionsConfigTs } from "@debbl/eslint-config-ts";
import type { FlatESLintConfigItem } from "eslint-define-config";

export type OptionsConfigVue = OptionsConfigBasic &
  OptionsConfigTs & {
    overrides?: {
      vue?: FlatESLintConfigItem["rules"];
    };
  };

export interface OptionsHasTypeScript {
  ts?: boolean;
}
