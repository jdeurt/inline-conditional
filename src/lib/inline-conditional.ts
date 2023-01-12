import { Resolvable } from "../structs/resolvable";
import { resolve } from "../util/resolve";

export class InlineConditional<T> extends Resolvable<T> {
    /**
     * Starts a new inline conditional chain.
     * @param expression An expression to test the truthiness of.
     *
     * @returns A function that allows you to specify the value that should be returned if `expression` is truthy.
     */
    static if<T>(
        expression: unknown
    ): (result: T | Resolvable<T>) => InlineConditional<T>;
    /**
     * Starts a new inline conditional chain.
     * @param expression An expression to test the truthiness of.
     * @param result The value that should be returned if `expression` is truthy.
     */
    static if<T>(
        expression: unknown,
        result: T | Resolvable<T>
    ): InlineConditional<T>;
    static if<T>(expression: unknown, result?: T | Resolvable<T>) {
        return arguments.length === 1
            ? new InlineConditional<T>().elseIf(expression)
            : new InlineConditional<T>().elseIf(expression, result!);
    }

    private constructor(result?: T, fallbackValue?: T) {
        super();

        this.result = result;
        this.fallbackValue = fallbackValue;
    }

    /**
     * Continues an inline conditional chain.
     * @param expression An expression to test the truthiness of.
     *
     * @returns A function that allows you to specify the value that should be returned if `expression` is truthy.
     */
    elseIf(
        expression: unknown
    ): <U>(result: U | Resolvable<U>) => InlineConditional<T | U>;
    /**
     * Continues an inline conditional chain.
     * @param expression An expression to test the truthiness of.
     * @param result The value that should be returned if `expression` is truthy.
     */
    elseIf<U>(
        expression: unknown,
        result: U | Resolvable<U>
    ): InlineConditional<T | U>;
    elseIf<U>(expression: unknown, result?: U | Resolvable<U>) {
        const action = <U>(result: U | Resolvable<U>) => {
            return new InlineConditional<T | U>(
                !!expression && this.result === undefined
                    ? resolve(result)
                    : this.result
            );
        };

        return arguments.length === 1 ? action : action(result!);
    }

    /**
     * An alias for `<InlineConditional>.elseIf`.
     */
    elif(
        expression: unknown
    ): <U>(result: U | Resolvable<U>) => InlineConditional<T | U>;
    /**
     * An alias for `<InlineConditional>.elseIf`.
     */
    elif<U>(
        expression: unknown,
        result: U | Resolvable<U>
    ): InlineConditional<T | U>;
    elif<U>(expression: unknown, result?: U | Resolvable<U>) {
        return arguments.length === 1
            ? this.elseIf(expression)
            : this.elseIf(expression, result!);
    }

    /**
     * Provides a fallback value for the inline conditional chain and completes the chain.
     * @param result The value that should be returned if the previous `if` and `elseIf` expressions are all falsy.
     *
     * @returns The result of the chain.
     */
    else<U>(result: U | Resolvable<U>): T | U {
        return new InlineConditional<T | U>(
            this.result,
            resolve(result)
        ).getResult() as T | U;
    }
}
