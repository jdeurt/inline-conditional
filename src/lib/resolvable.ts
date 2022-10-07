import { MaybeFunction } from "../types/maybe-function";

export class Resolvable<R> {
    protected static resolve<R>(
        value: MaybeFunction<R> | Resolvable<R>
    ): MaybeFunction<R> {
        return value instanceof Resolvable ? value.result : value;
    }

    get result(): R | undefined {
        return undefined;
    }
}
