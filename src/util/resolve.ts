import { Resolvable } from "../structs/resolvable";

export function resolve<R>(value: R | Resolvable<R>): R | undefined {
    // Hacky non-public property restriction bypass :P
    return value instanceof Resolvable ? value["getResult"]() : value;
}
