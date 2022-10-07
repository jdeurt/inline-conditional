export function isFunction(
    value: unknown
): value is (...arguments_: unknown[]) => unknown {
    return typeof value === "function";
}
