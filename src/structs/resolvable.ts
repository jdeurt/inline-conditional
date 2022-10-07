export class Resolvable<R> {
    protected static resolve<R>(value: R | Resolvable<R>): R {
        return value instanceof Resolvable ? (value.result as R) : value;
    }

    get result(): R | undefined {
        return undefined;
    }
}
