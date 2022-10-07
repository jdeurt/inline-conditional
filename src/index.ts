import { InlineConditional } from "./lib/inline-conditional";
import { InlineSwitch } from "./lib/inline-switch";

export { InlineConditional } from "./lib/inline-conditional";
export { InlineSwitch } from "./lib/inline-switch";

export const Inline = {
    if: function <R>(expression: unknown) {
        return InlineConditional.if<R>(expression);
    },
    switch: function <T, R>(value: T) {
        return InlineSwitch.switch<T, R>(value);
    },
};
