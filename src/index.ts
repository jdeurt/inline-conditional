import { InlineConditional } from "./lib/inline-conditional";
import { InlineSwitch } from "./lib/inline-switch";

export {
    InlineConditional,
    InlineConditionalActionFunction,
} from "./lib/inline-conditional";
export { InlineSwitch, InlineSwitchActionFunction } from "./lib/inline-switch";

export const Inline = {
    /**
     * An alias for `InlineConditional.if`
     */
    if: InlineConditional.if,

    /**
     * An alias for `InlineSwitch.switch`
     */
    switch: InlineSwitch.switch,
};
