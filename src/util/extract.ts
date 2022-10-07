import { MaybeFunction } from "../types/maybe-function";
import { isFunction } from "./is-function";

export function extract<T>(expression: MaybeFunction<T>): T | undefined {
    if (isFunction(expression)) {
        return expression();
    }

    return expression;
}
