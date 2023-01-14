import { Resolvable } from "../structs/resolvable";

export class InlineConditional<T> extends Resolvable<T> {
    /**
     * Starts a new inline conditional chain.
     * @param expression An expression to test the truthiness of.
     *
     * @returns A function that allows you to specify the value that should be returned if `expression` is truthy.
     */
    static if(expression: unknown): <U>(result: U) => InlineConditional<U>;
    /**
     * Starts a new inline conditional chain.
     * @param expression An expression to test the truthiness of.
     * @param result The value that should be returned if `expression` is truthy.
     */
    static if<T>(expression: unknown, result: T): InlineConditional<T>;
    static if<T>(expression: unknown, result?: T) {
        return arguments.length === 1
            ? new InlineConditional<T>().elseIf(expression)
            : new InlineConditional<T>().elseIf(expression, result!);
    }

    /**
     * Continues an inline conditional chain.
     * @param expression An expression to test the truthiness of.
     *
     * @returns A function that allows you to specify the value that should be returned if `expression` is truthy.
     */
    elseIf(expression: unknown): <U>(result: U) => InlineConditional<T | U>;
    /**
     * Continues an inline conditional chain.
     * @param expression An expression to test the truthiness of.
     * @param result The value that should be returned if `expression` is truthy.
     */
    elseIf<U>(expression: unknown, result: U): InlineConditional<T | U>;
    elseIf<U>(expression: unknown, result?: U) {
        const action = <V>(actionResult: V) =>
            this.constructNext(expression, actionResult);

        return arguments.length === 1 ? action : action(result!);
    }

    /**
     * An alias for `<InlineConditional>.elseIf`.
     */
    elif(expression: unknown): <U>(result: U) => InlineConditional<T | U>;
    /**
     * An alias for `<InlineConditional>.elseIf`.
     */
    elif<U>(expression: unknown, result: U): InlineConditional<T | U>;
    elif<U>(expression: unknown, result?: U) {
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
    else<U>(fallbackValue: U): T | U {
        this.fallbackValue = fallbackValue as unknown as T;

        return this.getResult();
    }

    private constructNext<U>(
        expression: unknown,
        result: U
    ): InlineConditional<T | U> {
        const nextInChain = new InlineConditional<T | U>();

        if (Boolean(expression) && !this.isResultAssigned) {
            nextInChain.result = result;
        }

        return nextInChain;
    }
}
